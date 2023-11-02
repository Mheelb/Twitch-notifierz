import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import StreamerCard from '../components/StreamerCard';

const StreamerProfile = () => {

    const [streamer, setStreamer] = useState([]);
    const [profileImage, setProfileImage] = useState("");
    const [link, setLink] = useState("");
    const [stream, setStream] = useState(false);
    const { login } = useParams();

    const getId = async (streamerLogin) => {
        return (await api.get("https://api.twitch.tv/helix/users?login=" + streamerLogin)).data.data[0].id;
    };

    const fetchData = useCallback(async () => {
        const id = await getId(login);
        const requests = [
            api.get("https://api.twitch.tv/helix/channels?broadcaster_id=" + id),
            api.get("https://api.twitch.tv/helix/users?id=" + id),
            api.get('https://api.twitch.tv/helix/streams?user_login=' + login)
        ];
        Promise.all(requests).then(([channelsRes, usersRes, streamRes]) => {
            setStreamer(channelsRes.data.data[0]);
            setProfileImage(usersRes.data.data[0].profile_image_url);
            setStream(streamRes.data.data[0]);
        });
        setLink("https://www.twitch.tv/" + login);
    }, [login]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className='mt-5'>
            <StreamerCard streamer={streamer} profileImage={profileImage} link={link} stream={stream} />
        </div>
    );
};

export default StreamerProfile;