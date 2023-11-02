import React from 'react';

const StreamerCards = ({streamer, stream, link, profileImage}) => {

    return (
        <div>
            <div className="mt-4 d-flex justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-4">
                    {streamer.broadcaster_name ? (
                        <div className="card">
                            <img className="card-img-top mx-auto" style={{ maxWidth: "50%" }} src={profileImage} alt="profile-picture" />
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">{streamer.broadcaster_name}</h5>
                                <p className="card-text"></p>
                                {stream ? (
                                    <div>
                                        <p className="card-text lh-lg">
                                            {streamer.broadcaster_name} est actuellement en live devant {stream.viewer_count} viewers<br />
                                            <b>{streamer.title}</b><br />
                                            Categorie : <b>{streamer.game_name}</b>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="card-text">Il n'est pas en live actuellement</p>
                                )}
                                <a href={link} className="btn btn-search mt-3" target="_blank">Aller la chaine</a>
                            </div>
                        </div>

                    ) : (
                        <ul>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StreamerCards;