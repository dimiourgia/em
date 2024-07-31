import {
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILURE
} from "./ActionType";

const initialState = {
    addresses: [],
    loading: false,
    error: null
};

export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDRESS_REQUEST:

        case GET_ADDRESS_SUCCESS:
            return { ...state, loading: false, error:null, addresses: action.payload };
        
        case GET_ADDRESS_FAILURE:
  
        default:
            return state;
    }
};