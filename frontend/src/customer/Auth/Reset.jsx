import React, { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../State/Auth/Action';

const Reset = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, resetPasswordSuccess, error } = useSelector((state) => state.auth);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const otp = searchParams.get('otp');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        dispatch(resetPassword({ email, otp, newPassword: password, confirmPassword }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="new-password" className="block text-gray-700 font-semibold mb-2">New Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="new-password"
                            name="new-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {passwordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </button>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            id="confirm-password"
                            name="confirm-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {confirmPasswordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </button>
                    </div>
                    {error && (
                        <div className="mb-4 text-red-500 text-center">{error}</div>
                    )}
                    {resetPasswordSuccess && (
                        <div className="mb-4 text-green-500 text-center">{resetPasswordSuccess}</div>
                    )}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-[#44496c] text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <span>Remember your password?</span>
                        <button
                            type="button"
                            className="text-indigo-500 hover:underline ml-2"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reset;
