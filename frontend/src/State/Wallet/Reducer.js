import {
    GET_USER_WALLET_REQUEST,
    GET_USER_WALLET_SUCCESS,
    GET_USER_WALLET_FAILURE
} from './ActionType';

const initialState = {
    balance: null,
    loading: false,
    error: null,
}

export function walletReducer(state=initialState, action){
    try{
        switch(action.type){
            case GET_USER_WALLET_REQUEST:{
                return {...state, loading:true, error:null}
            }
            case GET_USER_WALLET_SUCCESS:{
                return {balance:action.payload, loading:false, error:null}
            }
            case GET_USER_WALLET_FAILURE:{
                return {...state, loading:false, error:action.payload}
            }
            default: 
                return state;
        }
    }catch(e){
        console.log(e);
        return initialState;
    }
}

