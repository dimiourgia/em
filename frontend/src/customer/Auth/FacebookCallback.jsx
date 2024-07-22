import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginWithFacebook } from '../../State/Auth/Action';

const FacebookCallback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            dispatch(loginWithFacebook(token))
                .then(() => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Facebook login error', error);
                    navigate('/');
                });
        } else {
            navigate('/');
        }
    }, [dispatch, navigate]);

    return <div>Loading...</div>;
};

export default FacebookCallback;
