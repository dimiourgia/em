import { api } from "../../config/apiConfig";
import {
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILURE
} from "./ActionType";
import { API_BASE_URL } from "../../config/apiConfig";

export const findAddress = (id) => async (dispatch) => {
  dispatch({ type: GET_ADDRESS_REQUEST });
  try {
    const { data }  = await api.get(`${API_BASE_URL}/api/addresses/${id}`);
    dispatch({ type: GET_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ADDRESS_FAILURE, payload: error.message });
  }
};
