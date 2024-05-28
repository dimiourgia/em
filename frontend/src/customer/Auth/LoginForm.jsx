import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser, login } from '../../State/Auth/Action'

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // useEffect(() => {
    //     if (jwt) {
    //         dispatch(getUser(jwt))
    //     }

    // }, [jwt, auth.jwt])

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget);

        const userData = {
            // firstName: data.get("firstName"),
            // lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),

        }
        dispatch(login(userData))
        console.log("user data", userData);
        // dispatch(register(userData))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>


                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            fullWidth
                            autoComplete="given-name"
                            type="password"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            className="bg-[#9155FD] w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: ".8rem 0" }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div className="flex justify-center flex-col items-center">
                <div className="py-3 flex items-center ">
                    <p className="m-0 p-0">if you don't have account ?</p>
                    <Button onClick={() => navigate("/register")} className="ml-5" size="small">
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm