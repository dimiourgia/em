import {
    FETCH_JOURNALS_REQUEST,
    FETCH_JOURNALS_SUCCESS,
    FETCH_JOURNALS_FAILURE,
    FETCH_JOURNAL_REQUEST,
    FETCH_JOURNAL_SUCCESS,
    FETCH_JOURNAL_FAILURE,
    CREATE_JOURNAL_REQUEST,
    CREATE_JOURNAL_SUCCESS,
    CREATE_JOURNAL_FAILURE,
    EDIT_JOURNAL_REQUEST,
    EDIT_JOURNAL_SUCCESS,
    EDIT_JOURNAL_FAILURE,
    DELETE_JOURNAL_REQUEST,
    DELETE_JOURNAL_SUCCESS,
    DELETE_JOURNAL_FAILURE,
    UPDATE_JOURNAL_REQUEST,
    UPDATE_JOURNAL_SUCCESS,
    UPDATE_JOURNAL_FAILURE,
} from './actionTypes';
const initialState = {
    journals: [], // Initialize as an empty array
    loading: false,
    error: null,
};

const journalReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOURNALS_REQUEST:
        case CREATE_JOURNAL_REQUEST:
        case EDIT_JOURNAL_REQUEST:
        case DELETE_JOURNAL_REQUEST:
        case FETCH_JOURNAL_REQUEST:
        case UPDATE_JOURNAL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_JOURNALS_SUCCESS:
            return {
                ...state,
                loading: false,
                journals: action.payload, // Set journals to the fetched data directly
            };

        case UPDATE_JOURNAL_SUCCESS:
        case FETCH_JOURNAL_SUCCESS:
        case CREATE_JOURNAL_SUCCESS:
        case EDIT_JOURNAL_SUCCESS:
            return {
                ...state,
                loading: false,
                journals: Array.isArray(action.payload) ? action.payload : [action.payload], // Ensure payload is always treated as an array
            };

        case DELETE_JOURNAL_SUCCESS:
            return {
                ...state,
                loading: false,
                journals: state.journals.filter((journal) => journal._id !== action.payload),
            };
        case FETCH_JOURNALS_FAILURE:
        case FETCH_JOURNAL_FAILURE:
        case CREATE_JOURNAL_FAILURE:
        case EDIT_JOURNAL_FAILURE:
        case UPDATE_JOURNAL_FAILURE:
        case DELETE_JOURNAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default journalReducer;
