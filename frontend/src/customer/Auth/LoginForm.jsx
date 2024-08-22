import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../State/Auth/Action';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const api_base_url = import.meta.env.VITE_API_BASE_URL;

console.log(api_base_url, 'base url')

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // const loginWithGoogle = () => {
    //     window.open("http://localhost:5454/auth/google", "_self");
    // };

    const loginWithGoogle = () => {
        window.open(`${api_base_url}/auth/google`) // Redirect to backend OAuth route
    };
      

    const loginWithFacebook = () => {
        window.open(`${api_base_url}/auth/facebook`, "_self");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        dispatch(login(userData))
            .then(response => {
                if (response.error) {
                    setError('Username or Password is incorrect');
                } else {
                    setError('');
                    navigate('/');
                }
            })
            .catch(error => {
                console.error("Login error", error);
                setError('Username or Password is incorrect');
            });
    };

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full bg-white rounded-md">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm ml-2 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className="block text-sm ml-2 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-8 outline:none text-gray-500 hover:text-gray-700"
                        >
                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </div>
                    </div>

                    {error && (
                        <div>
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/forgot-password")}
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </form>

            <button
                className="transition duration-300 ease-in-out bg-white hover:bg-gray-200 text-gray-600 font-medium text-sm py-3 px-10 rounded-sm shadow-sm hover:shadow-lg focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-blue-300 cursor-pointer mt-5"
                onClick={loginWithGoogle}
                style={{
                    // backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOTAzYzExLjMgMCAyLjUuNCAzLjQxMUwxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '12px 11px'
                }}
            >
                Sign In With Google
            </button>

            <button
                className="transition duration-300 ease-in-out bg-blue-100 hover:bg-gray-200 text-gray-600 font-medium text-sm py-3 px-10 rounded-sm shadow-sm hover:shadow-lg focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-blue-300 cursor-pointer mt-5"
                onClick={loginWithFacebook}
                style={{
                    // backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOTAzYzExLjMgMCAyLjUuNCAzLjQxMUwxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '12px 11px'
                }}
            >
                Sign In With Facebook
            </button>

            <div className="mt-2 flex flex-col items-center">
                <div className="py-3 flex items-center">
                    <p className="m-0 p-0">If you don't have an account?</p>
                    <button
                        onClick={() => navigate("/register")}
                        className="ml-2 text-indigo-600 hover:underline text-sm"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
