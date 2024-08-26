import {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Input from '../components/Input/Index';
import FormMessage from '../components/FormMessage/Index';
import Loading from '../components/Loader/Index';
import {motion} from 'framer-motion'
import { login, resetInitialState } from '../../State/Auth/Action'
import Button from '../components/Button/Index';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const env =  'production'

export default function LoginForm({setType}){

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleCallbackUrl = import.meta.env.VITE_GOOGLE_CALLBACK_URL;

const [scriptLoaded, setScriptLoaded] = useState(false);

console.log(googleClientId, googleCallbackUrl, 'google id')

const emailRef = useRef()
const passwordRef = useRef()
const [error, setError] = useState(false)
const [emailError, setEmailError] = useState(false)
const [passwordError, setPasswordError] = useState(false)
const [fetchingFromServer, setFetchingFromServer] = useState(false)
const [success, setSuccess] = useState(false)
const [userName, setUsername] = useState('')
const [dispatched, setDispatched] = useState(false);
const auth = useSelector(state=>state.auth);
const navigate = useNavigate();
const dispatch = useDispatch();

const productToAdd = localStorage.getItem('productToAdd')

//animatin transition type
const spring = {
    type: 'spring',
    damping: 10,
    stiffness: 100
}

useEffect(()=>{
    emailRef.current.focus()
},[])

useEffect(()=>{
    console.log(auth, 'auth from login')
},[auth])

useEffect(()=>{
    if(dispatched && auth.isLoading){
        setFetchingFromServer(true);
    }else{setFetchingFromServer(false);}

    if(dispatched && auth.error){
        setError(auth.error);
    }else setError(false);

    if(dispatched && auth.user){
        setSuccess('Login Successful');
        localStorage.removeItem('productToAdd')
        
        setTimeout(()=>{
            if (productToAdd) {
                // navigate('/cart')
            } else {
                navigate('/')
            }
        }, 2000);

    }else setSuccess(false);

},[auth]);

useEffect(() => {
    // Wait for the Google API script to load
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,  
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { theme: 'outline', size: 'large' } // Customize button style here
        );

        window.google.accounts.id.prompt(); // Show the Google Sign-In prompt
      }
    };

    initializeGoogleSignIn();
    setScriptLoaded(true);
  }, []);

  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    // Send the ID token to your backend server
    // Replace '/your-backend-api/google-signin' with your actual backend endpoint
    //axios.post('/backend')
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/google-signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: response.credential }),
    })
    .then((response) => response.json())
    .then((data) => {
      const jwtToken = data.token;
      // Save the JWT token (e.g., in local storage or a cookie)
    })
    .catch((error) => console.error('Error:', error));
  };

const handleLoggin = (e)=>{
    e.preventDefault()
    setSuccess(true)
}

const handleLogin = (e)=>{
    if(fetchingFromServer) return

    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    setError(false)
    setEmailError(false)
    setPasswordError(false)

    if(email===''){
        setError('Email can not be blank')
        setEmailError(true)
        return
    }

    if(password===''){
        setError('Password can not be blank')
        setPasswordError(true)
        return
    }

    if(email!==''){
        if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            setError('Invalid Email')
            setEmailError(true)
            return
        }
    }

    //Everything looks good sent form to the server
    const userData = {
        email,
        password,
    }

    dispatch(login(userData))
    setDispatched(true);
}

    return(
    <div className='flex items-center justify-center'>
        
       <div className="">
            <motion.div className="form_container" initial={{transform:'scale(.8)', opacity:.5}} animate={{transform:'scale(1)', opacity:1}} transition={{duration:.2, spring}}>
                <form onSubmit={handleLogin}>
                        <Input placeholder={'Email'} ref={emailRef} type={'text'} error={emailError} />     
                        <Input placeholder={'Password'} ref={passwordRef} type={'password'} error={passwordError} />
                        {error && <FormMessage type='error' message={error}/>}
                        {fetchingFromServer && <Loading/> }
                        
                        <Button text='Login' disabled={fetchingFromServer} type='submit' />
                        <div style={{textAlign:'center', marginTop:'10px'}}>
                            <Link onClick={()=>{setType('forgot-password')}} className='registerLink'>Forgot Password? </Link>
                        </div> 

                        {<div className='my-6 w-full flex items-center justify-center' id="googleSignInButton"></div>}
                        {!scriptLoaded && <Loading/>}

                        <br/>
                        <div style={{textAlign:'center'}}>
                            Don't have an account? <Link onClick={()=>{setType('register') }} className='registerLink'>Sign Up</Link>
                        </div> 
                   </form>
            </motion.div>
       </div>
        <div className='spacer layer1'></div>
    </div>
)}