import React from 'react';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto relative z-10">
        {location.pathname.includes('/') ? (
          <LoginForm />
        ) : location.pathname === "/register" ? (
          <RegisterForm />
        ) : location.pathname === "/login" ? (
          <LoginForm />
        ) : null}
      </div>
    </div>
  );
};

export default AuthModal;
