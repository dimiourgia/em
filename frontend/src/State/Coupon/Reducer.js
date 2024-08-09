import {
    GET_USER_COUPONS_REQUEST,
    GET_USER_COUPONS_SUCCESS,
    GET_USER_COUPONS_FAILURE,
} from './ActionType';

const initialState = {
    coupons: [],
}


export function couponReducer(state=initialState, action){
    try{
        switch(action.type){
            case GET_USER_COUPONS_REQUEST:{
                return { ...state, loading:true, error:null }
            }
            case GET_USER_COUPONS_SUCCESS:{
                return { ...state, coupons: action.payload, loading:false, error:null }
            }
            case GET_USER_COUPONS_FAILURE:{
                return { ...state, loading: false, error: action.payload }
            }
            default: 
                return state;
        }
    }catch(e){
        console.log(e);
        return initialState;
    }
}