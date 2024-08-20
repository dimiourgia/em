import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../State/Auth/Action";
import Button from "../components/Button/Index";
import {Link} from 'react-router-dom'
import Input from '../components/Input/Index';
import FormMessage from "../components/FormMessage/Index";

const Forgot = ({setType}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, forgotPasswordSuccess, forgotPasswordError } = useSelector((state) => state.auth);
  
    const [email, setEmail] = useState("");
    const emailRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (forgotPasswordSuccess) {
            setEmail("");
            navigate("/");
        }
    }, [forgotPasswordSuccess, navigate]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Input placeholder={'Email'} ref={emailRef} type={'text'} error={forgotPasswordError} />   
                    </Grid>

                    <Grid xs={12}>
                        {forgotPasswordError && <FormMessage type='error' message={forgotPasswordError}/>}
                        {forgotPasswordSuccess && <FormMessage type='success' message={forgotPasswordSuccess}/>}
                    </Grid>

                    <Grid item xs={12}>
                        <Button text='Submit' disabled={isLoading} type='submit' />
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <div style={{textAlign:'center'}}>
                            Remember your password? <Link onClick={()=>setType('login')} className='registerLink'>Login</Link>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Forgot;
