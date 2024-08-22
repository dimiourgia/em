import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
    FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST,
    LOGIN_WITH_GOOGLE_REQUEST, LOGIN_WITH_GOOGLE_SUCCESS, LOGIN_WITH_GOOGLE_FAILURE,
    LOGIN_WITH_FACEBOOK_REQUEST, LOGIN_WITH_FACEBOOK_SUCCESS, LOGIN_WITH_FACEBOOK_FAILURE,
} from "./ActionType";

const token = localStorage.getItem("jwt");

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch(registerSuccess(user.jwt));
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
        dispatch(loginFailure(error.response?.data?.error || error.message));
    }
}

// Get user from token
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users//profile`, {
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

const loginWithGoogleRequest = () => ({ type: LOGIN_WITH_GOOGLE_REQUEST });
const loginWithGoogleSuccess = (user) => ({ type: LOGIN_WITH_GOOGLE_SUCCESS, payload: user });
const loginWithGoogleFailure = (error) => ({ type: LOGIN_WITH_GOOGLE_FAILURE, payload: error });

export const loginWithGoogle = (token) => async (dispatch) => {
    dispatch(loginWithGoogleRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/google/callback`, {
            token: token, // or simply 'token' if the variable name matches the key
          }, {
            withCredentials: true, // Include cookies in the request
          });
          
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
        }
        dispatch(loginWithGoogleSuccess(user.jwt));
        return Promise.resolve(user);
    } catch (error) {
        dispatch(loginWithGoogleFailure(error.response?.data?.error || error.message));
        return Promise.reject(error.response?.data?.error || error.message);
    }
};

const loginWithFacebookRequest = () => ({ type: LOGIN_WITH_FACEBOOK_REQUEST });
const loginWithFacebookSuccess = (user) => ({ type: LOGIN_WITH_FACEBOOK_SUCCESS, payload: user });
const loginWithFacebookFailure = (error) => ({ type: LOGIN_WITH_FACEBOOK_FAILURE, payload: error });

export const loginWithFacebook = (token) => async (dispatch) => {
    dispatch(loginWithFacebookRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/facebook/callback`, { token });
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
        }
        dispatch(loginWithFacebookSuccess(user.jwt));
        return Promise.resolve(user);
    } catch (error) {
        dispatch(loginWithFacebookFailure(error.response?.data?.error || error.message));
        return Promise.reject(error.response?.data?.error || error.message);
    }
}
