import { api } from "../../config/apiConfig";
import {
  FIND_COLLECTIONS_FAILURE,
  FIND_COLLECTIONS_REQUEST,
  FIND_COLLECTIONS_SUCCESS,
  FIND_COLLECTION_BY_ID_FAILURE,
  FIND_COLLECTION_BY_ID_REQUEST,
  FIND_COLLECTION_BY_ID_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "../../config/apiConfig";

export const findCollections = () => async (dispatch) => {
  dispatch({ type: FIND_COLLECTIONS_REQUEST });
  try {
    const { data }  = await api.get(`${API_BASE_URL}/api/collections`);
    dispatch({ type: FIND_COLLECTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_COLLECTIONS_FAILURE, payload: error.message });
  }
};

export const findCollectionById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_COLLECTION_BY_ID_REQUEST });
  const { collectionId } = reqData;
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/collections/${collectionId}`);
    console.log("data", data);

    dispatch({ type: FIND_COLLECTION_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_COLLECTION_BY_ID_FAILURE, payload: error.message });
  }
};


