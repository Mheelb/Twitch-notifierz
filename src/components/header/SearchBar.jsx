import React, { useState } from 'react';
import api from '../../api';

const SearchBar = () => {

    const [streamers, setStreamers] = useState([]);

    const getId = async (streamerLogin) => {
        return (await api.get("https://api.twitch.tv/helix/users?login=" + streamerLogin)).data.data[0].id;
    };

    const getFollower = async (streamerId) => {
        return (await api.get("https://api.twitch.tv/helix/channels/followers?broadcaster_id=" + streamerId)).data.total;
    }

    const handleSearchChange = async (event) => {
        const searchValue = event.target.value;
        if (searchValue !== "") {
            await api.get("https://api.twitch.tv/helix/search/channels?query=" + searchValue)
                .then(async (result) => {
                    const streamersResult = result.data.data;

                    const streamersWithFollowers = await Promise.all(
                        streamersResult.map(async (streamer) => {
                            const id = await getId(streamer.broadcaster_login);
                            const followers = await getFollower(id);
                            return { ...streamer, followers };
                        })
                    );

                    streamersWithFollowers.sort((a, b) => b.followers - a.followers);
                    setStreamers(streamersResult.slice(0, 3))
                });
        } else {
            setStreamers([]);
        }
    };

    return (

        <div>
            <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    id="search"
                    autoComplete='off'
                    onChange={handleSearchChange}
                />
                <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            {streamers[0] !== undefined ? (
                <div className='suggestions position-absolute mt-1'>
                    {streamers.map((streamer, key) => (
                        <a href={"/streamer/" + streamer.broadcaster_login} key={key} target="blank" className='no-underline d-flex suggestion p-3'>
                            {streamer.display_name}
                            {streamer.is_live ? (
                                <div className="me-4 no-underline">
                                    <i className="bi bi-circle-fill text-danger ms-2">En live</i>
                                </div>
                            ) : (
                                <div className="me-4 no-underline">
                                    <i className="bi bi-circle-fill text-secondary ms-2 ">Off</i>
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default SearchBar;