import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../State/Auth/Action";

const Forgot = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, forgotPasswordSuccess, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(forgotPassword(email));
    };

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
                            className="bg-[#9155FD] w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: ".8rem 0" }}
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: "center", marginTop: "1rem" }}>
                        <div>Remember your password?<Button onClick={() => navigate("/login")} size="small">
                            Login
                        </Button></div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Forgot;
