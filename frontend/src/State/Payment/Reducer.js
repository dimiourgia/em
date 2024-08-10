import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST, UPDATE_PAYMENT_SUCCESS } from "./ActionType";

 const initialState = {
  loading:false,
  success:false,
  error:null,
  paymentResult:null
 };
  
 // Payment reducer to handle creating a payment
 export const paymentReducer = (state = initialState, action) => {
   switch (action.type) {
     case CREATE_PAYMENT_REQUEST:
       return {
         ...state,
         loading: true,
         error:null,
       };
     case CREATE_PAYMENT_SUCCESS:
       return {
         ...state,
         loading: false,
         success: true,
         error:null,
         paymentResult: action.payload,
       };
     case CREATE_PAYMENT_FAILURE:
       return {
         ...state,
         loading: false,
         error: action.payload,
         success: false,
       };
       case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
        error: null,
      };
    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        payment:null,
        error: action.payload,
      };
     default:
       return state;
   }
 };