import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../State/Auth/Action";

const Forgot = ({setType}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, forgotPasswordSuccess, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
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
                        <Typography sx={{ ml:"8px" , color: "#616161"}}>Email</Typography>
                        <TextField
                            required
                            name="email"
                            fullWidth
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </Grid>

                    {error && (
                        <Grid item xs={12}>
                            <Typography sx={{ color: "red", fontSize: "15px" }}>
                                {error}
                            </Typography>
                        </Grid>
                    )}

                    {forgotPasswordSuccess && (
                        <Grid item xs={12}>
                            <Typography sx={{ color: "green", fontSize: "15px" }}>
                                {forgotPasswordSuccess}
                            </Typography>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button
                            className="w-full"
                            type="submit"
                            variant="contained"
                            sx={{padding:"8px", bgcolor: "#9e9e9e" }}
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <div>Remember your password?<Button onClick={() => setType('login')} size="small">
                            Login
                        </Button></div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Forgot;
