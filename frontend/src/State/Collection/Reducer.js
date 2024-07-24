import {
    FIND_COLLECTIONS_FAILURE,
    FIND_COLLECTIONS_REQUEST,
    FIND_COLLECTIONS_SUCCESS,

    FIND_COLLECTION_BY_ID_FAILURE,
    FIND_COLLECTION_BY_ID_REQUEST,
    FIND_COLLECTION_BY_ID_SUCCESS,
} from "./ActionType";

const initialState = {
    collections: [],
    currentCollection: null,
    loading: false,
    error: null
};

export const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_COLLECTIONS_REQUEST:
        case FIND_COLLECTION_BY_ID_REQUEST:

        case FIND_COLLECTIONS_SUCCESS:
            return { ...state, loading: false, error:null, collections: action.payload };
        case FIND_COLLECTION_BY_ID_SUCCESS:
            return { ...state, loading: false, error:null, currentCollection: action.payload };

        case FIND_COLLECTIONS_FAILURE:
        case FIND_COLLECTION_BY_ID_FAILURE:
        default:
            return state;
    }
};