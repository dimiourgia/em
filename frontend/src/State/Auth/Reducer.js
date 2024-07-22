import { 
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, 
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, 
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, 
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, 
    LOGIN_WITH_GOOGLE_REQUEST, LOGIN_WITH_GOOGLE_SUCCESS, LOGIN_WITH_GOOGLE_FAILURE,
    LOGIN_WITH_FACEBOOK_REQUEST, LOGIN_WITH_FACEBOOK_SUCCESS, LOGIN_WITH_FACEBOOK_FAILURE 
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    forgotPasswordSuccess: null,
    resetPasswordSuccess: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOGIN_WITH_GOOGLE_REQUEST:
        case LOGIN_WITH_FACEBOOK_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case LOGIN_WITH_GOOGLE_SUCCESS:
        case LOGIN_WITH_FACEBOOK_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGIN_WITH_GOOGLE_FAILURE:
        case LOGIN_WITH_FACEBOOK_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload }

        case FORGOT_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null, forgotPasswordSuccess: null };

        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, error: null, forgotPasswordSuccess: action.payload };

        case FORGOT_PASSWORD_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null, resetPasswordSuccess: null };

        case RESET_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, error: null, resetPasswordSuccess: action.payload };

        case RESET_PASSWORD_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return { ...initialState }
        default:
            return state;
    }
}
