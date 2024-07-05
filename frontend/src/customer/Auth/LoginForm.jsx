import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../State/Auth/Action'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const productToAdd = localStorage.getItem('productToAdd')

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        }

        dispatch(login(userData))
            .then(response => {
                if (response.error) {
                    setError('Username or Password is incorrect')
                } else {
                    setError('')
                    localStorage.removeItem('productToAdd')
                    if (productToAdd) {
                        navigate('/cart')
                    } else {
                        navigate('/')
                    }
                }
            })
            .catch(error => {
                console.error("Login error", error)
                setError('Username or Password is incorrect')
            })

        console.log("user data", userData)
    }

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
                            <p className="text-red-500 text-sm">{error}</p>
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
    )
}

export default LoginForm
