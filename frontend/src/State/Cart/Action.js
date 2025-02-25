import { api } from "../../config/apiConfig";
import { 
  ADD_ITEM_TO_CART_FAILURE, 
  ADD_ITEM_TO_CART_REQUEST, 
  ADD_ITEM_TO_CART_SUCCESS, 
  GET_CART_FAILURE, 
  GET_CART_REQUEST, 
  GET_CART_SUCCESS, 
  REMOVE_CART_ITEM_FAILURE, 
  REMOVE_CART_ITEM_REQUEST, 
  REMOVE_CART_ITEM_SUCCESS, 
  UPDATE_CART_ITEM_FAILURE, 
  UPDATE_CART_ITEM_REQUEST, 
  UPDATE_CART_ITEM_SUCCESS,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAILURE,
  REMOVE_COUPON_REQUEST,
  REMOVE_COUPON_SUCCESS,
  RESET_CART_STATE,
  REMOVE_COUPON_FAILURE } from "./ActionType"



export const getCart = (jwt) => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });
  
    try {
      const { data } = await api.get(`/api/cart/`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_CART_SUCCESS, payload: data });
      console.log("cart", data);
    } catch (error) {
      dispatch({ type: GET_CART_FAILURE, payload: error.message });
    }
  };

  export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  
    try {
      const { data } = await api.put("/api/cart/add", reqData, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
      dispatch(getCart(reqData.jwt)); // Refetch the cart data
      console.log("add item to cart", data);
    } catch (error) {
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
    }
  };

  export const removeCartItem = ({ cartItemId, jwt }) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  
    try {
      const { data } = await api.delete(`/api/cart_items/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
      dispatch(getCart(jwt)); // Refetch the cart data
    } catch (error) {
      dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    }
  };

  export const updateCartItem = (cartItemId, reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  
    try {
      const { data } = await api.put(`/api/cart_items/${cartItemId}`, reqData, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
      dispatch(getCart(reqData.jwt));
    } catch (error) {
      dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
  };

  export const applyCouponToCart = (jwt, couponId) => async (dispatch)=>{
    try{
      dispatch({type: APPLY_COUPON_REQUEST});
      await api.put(`/api/cart/coupon`, {couponId}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
      dispatch({type: APPLY_COUPON_SUCCESS});
      dispatch(getCart(jwt));
    }catch(e){
      dispatch({type: APPLY_COUPON_FAILURE, payload: error.message })
    }

  }

  export const removeCouponFromCart = (jwt) => async (dispatch)=>{
    try{
      dispatch({type: REMOVE_COUPON_REQUEST});
      await api.delete(`/api/cart/coupon`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
      dispatch({type: REMOVE_COUPON_SUCCESS});
      dispatch(getCart(jwt));
    }catch(e){
      dispatch({type: REMOVE_COUPON_FAILURE, payload: error.message })
    }

  }


  export const resetCart = ()=>({type: RESET_CART_STATE})