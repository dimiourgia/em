import axios from 'axios';
import Error from '../components/Error/Index';
import Loading from '../components/Loader/Index';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function VerifyUserPage({ setOpenAuthModal }) {
  const [verified, setVerified] = useState(false);
  const [requestProcessed, setRequestProcessed] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { email, otp } = useParams();
  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    console.log(email, otp);
    (async function () {
      try {
        const res = await axios.get(`${backendUrl}/auth/verify/?email=${email}&otp=${otp}`);
        setRequestProcessed(true);
        if (res.status === 200) {
          setVerified(true);
        }else setVerified(false);
      } catch (err) {
        console.log(err);
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
        setVerified(false);
      }
    })();
  }, [email, otp, backendUrl]);

  return (
    <div className='min-h-[calc(100vh-80px)] mt-10'>
      {requestProcessed && (
        <div className="p-8 text-center text-gray-800">
          {verified ? (
            <div>
              <h1 className="text-2xl mb-5">Email Verification Done !!</h1>
              <p className="text-base leading-6 mb-5">
                Please login with your credentials to continue
              </p>
              <a
                onClick={() => {
                  navigate('/');
                  setOpenAuthModal(true);
                }}
                className="inline-block bg-green-500 text-white py-3 px-5 text-base rounded"
              >
                Login
              </a>
            </div>
          ) : (
            <Error message={error} />
          )}
        </div>
      )}

      {!requestProcessed && !error && (
        <div className="flex mt-10 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
