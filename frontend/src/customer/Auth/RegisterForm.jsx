import React, { useState, useEffect } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register, loginWithGoogle } from '../../State/Auth/Action';
import TermPage from "../pages/TermPage";
import { FormGroup, FormControlLabel, Checkbox, Typography, Tooltip } from '@mui/material';

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const auth = useSelector(state => state.auth)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
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
            mobile: data.get("mobile"),
        }

        dispatch(register(userData))
        console.log("user data", userData);
    }
    const loginWithFacebook = () => {
        window.open("http://localhost:5454/auth/facebook", "_self");
    };

    const registerWithGoogle = () => {
        window.open("http://localhost:5454/auth/google", "_self");
    };

    return (
        <div className="flex flex-col items-center mt-2">
            <form onSubmit={handleSubmit} className="w-full bg-white rounded-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                    <div className="sm:col-span-2">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="mobile"
                            id="mobile"
                            name="mobile"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />}
                        label={<span>I agree to the <a href="/TermPage" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Terms & Conditions</a></span>}
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: 10 } }}
                    />
                </FormGroup>

                <div className="sm:col-span-2">
                    <Tooltip title={!termsChecked ? "Read the terms and conditions first" : ""}>
                        <span>
                            <button
                                type="submit"
                                className={`w-full py-2 px-4 ${termsChecked ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-400 cursor-not-allowed'} text-white font-semibold rounded-md`}
                                disabled={!termsChecked}
                            >
                                Register
                            </button>
                        </span>
                    </Tooltip>
                </div>
            </form>
            <div className="mt-2 flex flex-col items-center">
                <button
                    className="transition duration-300 ease-in-out bg-white hover:bg-gray-200 text-gray-600 font-medium text-sm py-3 px-10 rounded-sm shadow-sm hover:shadow-lg focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-blue-300 cursor-pointer mt-5"
                    onClick={registerWithGoogle}
                    style={{
                        backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOTAzYzExLjMgMCAyLjUuNCAzLjQxMUwxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '12px 11px'
                    }}
                >
                    Register With Google
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
