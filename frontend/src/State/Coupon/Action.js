import {
    GET_USER_COUPONS_REQUEST,
    GET_USER_COUPONS_SUCCESS,
    GET_USER_COUPONS_FAILURE
} from './ActionType';
import { api } from "../../config/apiConfig"


const jwt = localStorage.getItem('jwt');


export const getCoupons = ()=> async (dispatch)=>{
    try{
        dispatch({type: GET_USER_COUPONS_REQUEST});

        const {data} = api.get('/api/coupons/', {
            headers: {
                Authorization : `Bearer ${jwt}`,
            }
        })

        dispatch({type: GET_USER_COUPONS_SUCCESS, payload:data})
    }catch(e){
        console.lot(e);
        dispatch({type: GET_USER_COUPONS_FAILURE, payload:e.message})
    }
}

