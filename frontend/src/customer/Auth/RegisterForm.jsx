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
            referralCode: data.get("referralCode"),
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
                            First Name <span className='text-red-400'>*</span>
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
                            Last Name <span className='text-red-400'>*</span>
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
                            Email <span className='text-red-400'>*</span>
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
                            Password <span className='text-red-400'>*</span>
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
                        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
                            Referral Code <span className='text-gray-500'>(Optional)</span>
                        </label>
                        <input
                            type="text"
                            id="referralCode"
                            name="referralCode"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
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

                <p className='text-red-400 mt-4'>{auth?.error}</p>
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



// import {useState, useRef, useEffect} from 'react'
// import axios from 'axios'
// import {Link, useNavigate} from 'react-router-dom'
// import countries from '../utils/countryList.json'
// import Input from '../components/Input'
// import InputFieldSelect from '../components/InputFieldSelect'
// import FormMessage from '../components/FromMessage'
// import Loading from '../components/Loading'
// import {motion} from 'framer-motion'

// const env = 'production'

// export default function Register(){
//     const firstNameRef = useRef(null)
//     const lastNameRef = useRef(null)
//     const countryRef = useRef(null)
//     const emailRef = useRef(null)
//     const passwordRef = useRef()

//     const [firstNameError, setFirstNameError] = useState(false)
//     const [lastNameError, setLastNameError] = useState(false)
//     const [emailError, setEmailError] = useState(false)
//     const [countryError, setCountryError] = useState(false)
//     const [passwordError, setPasswordError] = useState(false)
//     const [error, setError] = useState(false)
//     const [success, setSuccess] = useState(false)
//     const [fetchingFromServer, setFetchingFromServer] = useState(false)
//     const host = env=='dev' ? 'http://localhost:8084' : 'https://acl-zeta.vercel.app' 

//     //animatin transition type
//     const spring = {
//         type: 'spring',
//         damping: 10,
//         stiffness: 100
//     }

    
//     useEffect(()=>{
//         firstNameRef.current.focus()
//     },[])
    
//     //if user registered sucessfull.. redirect them to login page
//     const navigate = useNavigate()

//     useEffect(()=>{
//         if(success){
//             setTimeout(()=>{navigate('/login')},3000)
//         }
//     },[success])

//     //for submit handler
//     const handleSubmit = async (event) =>{
//         event.preventDefault()

//     //validate all input befor sending to server
//         const firstName = firstNameRef.current.value
//         const lastName = lastNameRef.current.value
//         const email = emailRef.current.value.toLowerCase()
//         const password = passwordRef.current.value
//         const country = countryRef.current.value

//         setFirstNameError(false)
//         setLastNameError(false)
//         setCountryError(false)
//         setEmailError(false)
//         setPasswordError(false)
//         setError(false)

//         let goodToGo = true

//         if(firstName === ''){
//             setError('Please provide your first name')
//             setFirstNameError(true)
//             return
//         }
//         if(lastName === ''){
//             setError('Plase provide your last Name')
//             setLastNameError(true)
//             return
//         }

//         if(country === '' || country === 'select country'){
//             setError('Please select your country')
//             setCountryError(true)
//             return
//         }
//         if(email === '') {
//             setError('Please provide your email address')
//             setEmailError(true)
//             return
//         }
//         if(password === '') {
//             setError('Please enter a password')
//             setPasswordError(true)
//             return
//         }


//         if(email!==''){
//             if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
//                 setError('Invalid Email')
//                 setEmailError(true)
//                 return
//             }
//         }
    
//     //Everything looks good send the form to server
        
//     setFetchingFromServer(true)

//         try{
//             axios.post(`${host}/api/register`, {firstName, lastName, country, email, password})
//             .then(res=>{
//                 setFetchingFromServer(false)
//                 console.log(res.data)
//                 if(res.data.type!==undefined && res.data.type==='error'){
//                     setError(res.data.message)
//                     setEmailError(true)
//                 }
                    
                
//                 if(res.data.type!==undefined && res.data.type==='success')
//                     setSuccess(`${res.data.message}. Redirecting you to the login page..`)
                
//             })
            
//         }
//         catch(err){
//             console.log(err)
//             setError(err.message)
//             setFetchingFromServer(false)
//         }
        
//     }

//     return(
//     <div className='login_container'>
//         <div className='topbar'>
//             <div className='logoText'>
//                 <Link to='/'>Puzzler</Link>
//             </div>
//         </div>
//         <div className="form_container_wrapper">
//             <motion.div className="form_container" initial={{transform:'scale(.2)', opacity:0}} animate={{transform:'scale(1)', opacity:1}} transition={{duration:.2, spring}}>
//             <form onSubmit={handleSubmit}>
//             <div style={{display:'flex', columnGap:'8px', marginBottom:'14px'}}>
//                 <Input placeholder={'First Name'} ref={firstNameRef} type={'text'} error={firstNameError} />
//                 <Input placeholder={'Last Name'} ref={lastNameRef} type={'text'} error={lastNameError} />
//             </div>
            
//             <InputFieldSelect placeholder={'Country'} ref={countryRef} optionsList={countries} error={countryError} />
//             <Input placeholder={'Email'} ref={emailRef} type={'text'} error={emailError} />
//             <Input placeholder={'Password'} ref={passwordRef} type={'password'} error={passwordError} />
//             {error && <FormMessage type='error' message={error}/>}
//             {success && <FormMessage type='success' message={success}/>}
//             {fetchingFromServer && <Loading/>}

//             <div className='form_button_wrapper'>
//                 <button className={fetchingFromServer? 'button form_button disabled' : 'button form_button'} type='submit' >Register</button>
//             </div>
//             <br/>
//         <div style={{textAlign:'center'}}>
//          Already have an account? <Link to='/login' className='registerLink'>Login</Link>
//         </div>
//         </form>      
//             </motion.div>
//         </div>
//         <div className='spacer layer1'></div>
//     </div>

    
// )}
