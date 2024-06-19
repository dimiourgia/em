import React, { useState } from 'react'

const NewPassPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="new-password" className="block text-gray-700 font-semibold mb-2">New Password</label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="new-password"
                            name="new-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {passwordVisible ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirm-password"
                            name="confirm-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {confirmPasswordVisible ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full new-passw-full text-white  bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default NewPassPage
