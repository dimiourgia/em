import { api, API_BASE_URL } from "../../config/apiConfig"
import axios from 'axios';
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
    UPDATE_JOURNAL_REQUEST,
    UPDATE_JOURNAL_SUCCESS,
    UPDATE_JOURNAL_FAILURE,
    EDIT_JOURNAL_REQUEST,
    EDIT_JOURNAL_SUCCESS,
    EDIT_JOURNAL_FAILURE,
    DELETE_JOURNAL_REQUEST,
    DELETE_JOURNAL_SUCCESS,
    DELETE_JOURNAL_FAILURE,
} from './actionTypes';

export const updateJournal = (id, journal) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_JOURNAL_REQUEST });
        const { data } = await api.put(`/api/journals/${id}`, journal);
        dispatch({ type: UPDATE_JOURNAL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_JOURNAL_FAILURE, payload: error.message });
    }
};

export const fetchJournal = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_JOURNAL_REQUEST });
        const {data} = await api.get(`/api/journals/${id}`);
        dispatch({ type: FETCH_JOURNAL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_JOURNAL_FAILURE, payload: error.message });
    }
};


export const fetchJournals = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_JOURNALS_REQUEST });
        const {data} = await api.get('/api/journals');
        dispatch({ type: FETCH_JOURNALS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_JOURNALS_FAILURE, payload: error.message });
    }
};

export const createJournal = (journal) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_JOURNAL_REQUEST });
        const { data } = await api.post(
            `${API_BASE_URL}/api/journals`, journal);
        dispatch({ type: CREATE_JOURNAL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_JOURNAL_FAILURE, payload: error.message });
    }
};

export const editJournal = (id, journal) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_JOURNAL_REQUEST });
        const {data} = await api.put(`/api/journals/${id}`, journal);
        dispatch({ type: EDIT_JOURNAL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: EDIT_JOURNAL_FAILURE, payload: error.message });
    }
};

export const deleteJournal = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_JOURNAL_REQUEST });
        await api.delete(`/api/journals/${id}`);
        dispatch({ type: DELETE_JOURNAL_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_JOURNAL_FAILURE, payload: error.message });
    }
};
