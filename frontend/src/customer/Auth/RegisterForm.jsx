import React, { useState,  useEffect } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../State/Auth/Action';

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const auth = useSelector(state => state.auth)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }

    }, [jwt, auth.jwt])


    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget);

        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
        }

        dispatch(register(userData))
        console.log("user data", userData);
    }

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full bg-white rounded-md">
                <div className="grid grid-cols-1 mb-6 sm:grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="sm:col-span-2 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                            className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                        >
                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
                    >
                        Register
                    </button>
                </div>
            </form>

            <div className="mt-6 flex flex-col items-center">
                <div className="py-3 flex items-center">
                    <p className="m-0 p-0">If you have an account?</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="ml-2 text-indigo-600 hover:underline text-sm"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
