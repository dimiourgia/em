import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../State/Auth/Action'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const productToAdd = localStorage.getItem('productToAdd')

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        }

        dispatch(login(userData))
            .then(response => {
                // Check the response to determine if login was successful
                if (response.error) {
                    setError('Username or Password is incorrect')
                } else {
                    setError('')
                    // Clear local storage
                    localStorage.removeItem('productToAdd')
                    // Redirect to cart if there's a product to add
                    if (productToAdd) {
                        navigate('/cart')
                    } else {
                        navigate('/')
                    }
                }
            })
            .catch(error => {
                console.error("Login error", error)
                setError('Username or Password is incorrect')
            })

        console.log("user data", userData)
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
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            fullWidth
                            autoComplete="current-password"
                            type="password"
                        />
                    </Grid>

                    {error && (
                        <Grid item xs={12}>
                            <Typography sx={{ color: "red", fontSize: "15px" }}>{error}</Typography>
                        </Grid>
                    )}

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

                    <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Button onClick={() => navigate("/forgot-password")} size="small">
                            Forgot Password?
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div className="flex justify-center flex-col items-center">
                <div className="py-3 flex items-center">
                    <p className="m-0 p-0">If you don't have an account?</p>
                    <Button onClick={() => navigate("/register")} className="ml-5" size="small">
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
