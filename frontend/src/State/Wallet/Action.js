import {
    GET_USER_WALLET_REQUEST,
    GET_USER_WALLET_SUCCESS,
    GET_USER_WALLET_FAILURE
} from './ActionType';
import { api } from '../../config/apiConfig';

const jwt = localStorage.getItem('jwt');

export const getWallet = () => async (dispatch) => {
    dispatch({ type: GET_USER_WALLET_REQUEST });
  
    try {
      const { data } = await api.get(`/api/wallet/`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_USER_WALLET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_WALLET_FAILURE, payload: error.message });
    }
  };