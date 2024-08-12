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
            return {...state, loading:true, error:null}

        case GET_ADDRESS_SUCCESS:
            return { ...state, loading: false, error:null, addresses: action.payload };
        
        case GET_ADDRESS_FAILURE:
            return {...state, loading:false, error:action.payload}
  
        default:
            return state;
    }
};