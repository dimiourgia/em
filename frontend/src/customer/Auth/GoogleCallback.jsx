import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../../State/Auth/Action';

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("google callback fr",urlParams);
    const token = urlParams.get('code');
    console.log("token", token);
    if (token) {
      dispatch(loginWithGoogle(token))
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Google login error', error);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
