import React, { useState } from 'react';
import api from '../api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StreamerCard from '../components/StreamerCard';

const Home = () => {

    const [streamer, setStreamer] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [link, setLink] = useState([]);
    const[stream, setstream] = useState([]);
    
    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-4">
                    <h1 className='text-center mt-5'>Rechercher un streamer</h1>
                    <Formik
                        initialValues={{ channelLink: '' }}
                        onSubmit={async (values) => {
                            const username = values.channelLink.split('/')[3];
                            await api.get('https://api.twitch.tv/helix/users?login=' + username).then(result => {
                                setLink(values.channelLink);
                                const id = result.data.data[0].id
                                api.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`).then(result => { setStreamer(result.data.data[0]); });
                                api.get(`https://api.twitch.tv/helix/users?id=${id}`).then(result => { setProfileImage(result.data.data[0].profile_image_url); });
                                api.get('https://api.twitch.tv/helix/streams?user_login=' + username).then(result => { setstream(result.data.data[0]); });
                            });
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="channelLink" className="form-label">Rentrez le lien vers la chaine du streamer</label>
                                    <Field type="text" name="channelLink" className="form-control" id="channelLink"></Field>
                                    <ErrorMessage name="channelLink" component="div" className="alert alert-warning" />
                                </div>
                                <div className="d-grid gap">
                                    <button type="submit" className="btn btn-search" disabled={isSubmitting}>Valider</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div >
            <StreamerCard streamer={streamer} profileImage={profileImage} link={link} stream={stream} />
        </div>
    );
};

export default Home;