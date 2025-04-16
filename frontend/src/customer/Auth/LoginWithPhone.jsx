import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loginWithOtp } from '../../State/Auth/Action';

function LoginWithPhone() {
  const [phone, setPhone] = useState('');
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => console.log('Captcha Verified'),
        'expired-callback': () => console.log('Captcha Expired'),
      });
    }
  }, [phone]);

  useEffect(() => {
    if (otpArray.every((digit) => digit !== '')) {
      verifyOtp(); // auto-submit when all digits are filled
    }
  }, [otpArray]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const sendOtp = () => {
    setPhoneError('');
    if (!phone || phone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }

    const fullPhone = '+91' + phone;
    const appVerifier = window.recaptchaVerifier;

    setLoadingSend(true);
    signInWithPhoneNumber(auth, fullPhone, appVerifier)
      .then((result) => {
        setConfirmationResult(result);
        setResendTimer(30);
        setOtpArray(['', '', '', '', '', '']);
        // alert('OTP sent successfully!');
      })
      .catch((error) => {
        console.error('SMS not sent', error);
        alert('Failed to send OTP. Try again.');
      })
      .finally(() => setLoadingSend(false));
  };

  const verifyOtp = () => {
    setOtpError('');
    const otp = otpArray.join('');
    if (otp.length !== 6) {
      setOtpError('Please enter a 6-digit OTP.');
      return;
    }

    setLoadingVerify(true);
    confirmationResult.confirm(otp)
      .then((result) => {
        const user = result.user;
        // alert('Phone verified successfully!');
        dispatch(loginWithOtp({ phoneNumber: user.phoneNumber, guid: user.uid }));
      })
      .catch((error) => {
        console.error('OTP verification failed', error);
        setOtpError('Invalid OTP. Please try again.');
      })
      .finally(() => setLoadingVerify(false));
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpArray];
      newOtp[index] = value;
      setOtpArray(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const resetPhoneEntry = () => {
    setConfirmationResult(null);
    setOtpArray(['', '', '', '', '', '']);
    setOtpError('');
    setResendTimer(0);
  };

  return (
    <div className="flex flex-col items-center justify-center  sm:px-4 transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login or Signup</h2>

      <div className="w-full max-w-sm rounded-xl bg-white sm:p-6 space-y-6 animate-fadeIn">
        <div id="recaptcha-container" className="hidden"></div>

        {!confirmationResult ? (
          <>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-2 border rounded-md bg-gray-100 text-gray-600">+91</span>
                <input
                  type="text"
                  maxLength="10"
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
            </div>

            <button
              onClick={sendOtp}
              disabled={loadingSend}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loadingSend ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                OTP sent to <span className="font-medium">+91 {phone}</span>
              </p>
              <button
                onClick={resetPhoneEntry}
                className="text-blue-500 text-xs underline ml-2"
              >
                Edit Number
              </button>
            </div>

            <div className="flex justify-between space-x-2">
              {otpArray.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  className="w-10 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  ref={(el) => (inputRefs.current[idx] = el)}
                />
              ))}
            </div>
            {otpError && <span className="text-red-500 text-sm">{otpError}</span>}

            <button
              onClick={verifyOtp}
              disabled={loadingVerify}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
            >
              {loadingVerify ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="text-sm text-gray-500 mt-2 text-center">
              {resendTimer > 0 ? (
                <p>Resend OTP in <span className="font-semibold">{resendTimer}s</span></p>
              ) : (
                <button onClick={sendOtp} className="text-blue-600 underline">
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginWithPhone;
