import {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Input from '../components/Input/Index';
import FormMessage from '../components/FormMessage/Index';
import Loading from '../components/Loader/Index';
import {motion} from 'framer-motion'
import { login } from '../../State/Auth/Action'
import Button from '../components/Button/Index';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const env =  'production'

export default function LoginForm(){


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
                navigate('/cart')
            } else {
                navigate('/')
            }
        }, 2000);

    }else setSuccess(false);

},[auth]);

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
            <motion.div className="form_container" initial={{transform:'scale(.2)', opacity:0}} animate={{transform:'scale(1)', opacity:1}} transition={{duration:.2, spring}}>
                <form onSubmit={handleLogin}>
                        <Input placeholder={'Email'} ref={emailRef} type={'text'} error={emailError} />     
                        <Input placeholder={'Password'} ref={passwordRef} type={'password'} error={passwordError} />
                        {error && <FormMessage type='error' message={error}/>}
                        {fetchingFromServer && <Loading/> }
                        
                        <Button text='Login' disabled={fetchingFromServer} type='submit' />

                        <br/>
                        <div style={{textAlign:'center'}}>
                            Don't have an account? <Link to='/register' className='registerLink'>Sign Up</Link>
                        </div> 
                   </form>
            </motion.div>
       </div>
        <div className='spacer layer1'></div>

        {success && 
        <motion.div 
            className='login_splash' 
            initial={{opacity:0}} 
            animate={{opacity:1}}
            transition={{duration:.28, spring}}
            >
            <h1>{`${userName}, Welcome to the system !`}</h1>
            </motion.div>}
    </div>
)}