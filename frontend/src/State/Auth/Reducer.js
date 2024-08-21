import { forgotPassword } from "./Action";
import { 
    GET_USER_FAILURE, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    FORGOT_PASSWORD_REQUEST, 
    FORGOT_PASSWORD_SUCCESS, 
    FORGOT_PASSWORD_FAILURE, 
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_FAILURE, 
    RESET_AUTH_STATE,
    TOGGLE_AUTH_MODAL, } from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    forgotPasswordSuccess: null,
    forgotPasswordError: null,
    resetPasswordSuccess: null,
    showAuthModal: false,
    emailSent: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case REGISTER_SUCCESS: 
            return {...state, isLoading:false, error:null, emailSent:action.payload}
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }
        case REGISTER_FAILURE: 
        return {...state, isLoading:false, error:action.payload, emailSent:false}
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload }

        case FORGOT_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null, forgotPasswordSuccess: null };

        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, error: null, forgotPasswordSuccess: action.payload };

        case FORGOT_PASSWORD_FAILURE:
            return { ...state, isLoading: false, forgotPasswordError: action.payload };

        case RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null, resetPasswordSuccess: null };

        case RESET_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, error: null, resetPasswordSuccess: action.payload };

        case RESET_PASSWORD_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return { ...initialState }

        case TOGGLE_AUTH_MODAL:
            return { ...state, showAuthModal: action.payload};
        case RESET_AUTH_STATE:
            return {...initialState}
        default:
            return state;
    }
}