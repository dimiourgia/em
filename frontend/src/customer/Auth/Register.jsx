import Input from '../components/Input/Index';
import FormMessage from '../components/FormMessage/Index';
import Loading from '../components/Loader/Index';
import {useState, useRef, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {colors} from '../../constant'
import { useDispatch } from 'react-redux';
import { getUser, register } from '../../State/Auth/Action';
import { useSelector } from 'react-redux';
import Button from '../components/Button/Index';

export default function RegisterForm({setType, handleClose}){
    //Input refs
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const countryRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const referralCodeRef = useRef(null)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const auth = useSelector(state => state.auth)

    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [fetchingFromServer, setFetchingFromServer] = useState(false)

    const [dispatched, setDispatched] = useState(false);
    
    //animatin transition type
    const spring = {
        type: 'spring',
        damping: 10,
        stiffness: 100
    }

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }

    }, [jwt, auth.jwt])
    
    useEffect(()=>{
        firstNameRef.current.focus()
    },[])

    useEffect(()=>{
        console.log(auth, 'auth')
    },[auth])

    useEffect(()=>{
        console.log(dispatched, 'dispatched from register')
        if(dispatched && auth.isLoading){
            setFetchingFromServer(true);
        }else{setFetchingFromServer(false);}

        if(dispatched && auth.error){
            setError(auth.error);
        }else setError(false);

        if(dispatched && auth.emailSent){
            setSuccess('Successful. We have sent a verification email to your email.');
            setTimeout(()=>{
                handleClose()
            },3000)
        }else setSuccess(false);

    },[auth]);
    
    //if user registered sucessfull.. redirect them to login page


    //for submit handler
    const handleSubmit = async (event) =>{
        event.preventDefault()

    //validate all input befor sending to server
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const email = emailRef.current.value.toLowerCase()
        const password = passwordRef.current.value
        const referralCode = referralCodeRef.current.value

        setFirstNameError(false)
        setLastNameError(false)
        setEmailError(false)
        setPasswordError(false)
        setError(false)

        if(firstName === ''){
            setError('Please provide your first name')
            setFirstNameError(true)
            return
        }
        if(lastName === ''){
            setError('Plase provide your last Name')
            setLastNameError(true)
            return
        }

    
        if(email === '') {
            setError('Please provide your email address')
            setEmailError(true)
            return
        }

        if(password === '') {
            setError('Please enter a password')
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
    
    //Everything looks good send the form to server
    const userData = {
        firstName,
        lastName,
        email,
        password,
        referralCode,
    }

    dispatch(register(userData))
    setDispatched(true);
    console.log("user data", userData);

    }

    return(
    <div className='flex items-center justify-center'>
        <div className="">
            <motion.div className="form_container" initial={{transform:'scale(.8)', opacity:.5}} animate={{transform:'scale(1)', opacity:1}} transition={{duration:.2, spring}}>
                <form onSubmit={handleSubmit}>
                    <div style={{display:'flex', columnGap:'8px', marginBottom:'14px'}}>
                        <Input placeholder={'First Name'} ref={firstNameRef} type={'text'} error={firstNameError} />
                        <Input placeholder={'Last Name'} ref={lastNameRef} type={'text'} error={lastNameError} />
                    </div>
                    <Input placeholder={'Email'} ref={emailRef} type={'text'} error={emailError} />
                    <Input placeholder={'Password'} ref={passwordRef} type={'password'} error={passwordError} />
                    <Input placeholder={'Referral Code (Optional)'} ref={referralCodeRef} type='input'/>
                    {error && <FormMessage type='error' message={error}/>}
                    {success && <FormMessage type='success' message={success}/>}
                    {fetchingFromServer && <Loading/>}
                    <Button text='Register' type='submit'  />
                    <br/>

                    <div style={{textAlign:'center'}}>
                        Already have an account? <Link onClick={()=>setType('login')} className='registerLink'>Login</Link>
                    </div>
                </form>      
            </motion.div>
        </div>
    </div>
)}