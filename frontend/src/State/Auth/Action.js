import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { 
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, 
    LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
    FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST,
    TOGGLE_AUTH_MODAL,
    RESET_AUTH_STATE,
} from "./ActionType";

const token = localStorage.getItem("jwt");

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (emailSent, jwt) => ({ type: REGISTER_SUCCESS, payload: emailSent });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        //temporary arrangement in absence of email service
        const {emailSent, jwt} = response.data;
        console.log(emailSent, jwt, 'email + jwt')
        if (jwt) {
            localStorage.setItem("jwt", jwt);
        }
        dispatch(registerSuccess(emailSent));
        dispatch(loginSuccess(jwt))
    } catch (error) {
        dispatch(registerFailure(error.response?.data?.error || error.message));
    }
}

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch(loginSuccess(user.jwt));
    } catch (error) {
        console.log(error, 'error from login state')
        dispatch(loginFailure(error.response?.data?.message??error.message));
    }
}

// Get user from token
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        const user = response.data;
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.response?.data?.error || error.message));
    }
}

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
    localStorage.clear();
}

// Forgot password action creators
const forgotPasswordRequest = () => ({ type: FORGOT_PASSWORD_REQUEST });
const forgotPasswordSuccess = (message) => ({ type: FORGOT_PASSWORD_SUCCESS, payload: message });
const forgotPasswordFailure = (error) => ({ type: FORGOT_PASSWORD_FAILURE, payload: error });

export const forgotPassword = (email) => async (dispatch) => {
    dispatch(forgotPasswordRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
        dispatch(forgotPasswordSuccess(response.data.message));
    } catch (error) {
        dispatch(forgotPasswordFailure(error.response?.data?.error || error.message));
    }
};


// Reset password action creators
const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccess = (message) => ({ type: RESET_PASSWORD_SUCCESS, payload: message });
const resetPasswordFailure = (error) => ({ type: RESET_PASSWORD_FAILURE, payload: error });

export const resetPassword = (data) => async (dispatch) => {
    dispatch(resetPasswordRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, data);
        dispatch(resetPasswordSuccess(response.data.message));
    } catch (error) {
        dispatch(resetPasswordFailure(error.response?.data?.error || error.message));
    }
};

export const resetInitialState = ()=>{{type: RESET_PASSWORD_REQUEST}};

export const setAuthModal = (bool)=>(dispatch)=>{
    dispatch(()=>({type: TOGGLE_AUTH_MODAL, payload: bool}));
}