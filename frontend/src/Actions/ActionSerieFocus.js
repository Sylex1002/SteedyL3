import instanceAxios from "../Helpers/InstanceAxios";
import { GET_ALL_SERIE_FOCUS_PROF_REDUCER, GET_ALL_SERIE_FOCUS_REDUCER, GET_ONE_SERIE_REDUCER, POST_NEW_SERIE_FOCUS_REDUCER } from "../Reducers/ReduceSerieFocus";

// Create serie focus
export const createFocusAction = (formdata) => {
    return async (dispatch) => {
        const res = await instanceAxios.post("serie/create/", formdata);
        if (res.status === 200) {
            dispatch(POST_NEW_SERIE_FOCUS_REDUCER(res.data));
        }
        return res;
    };
};

// Get all serie focus
export const getAllFocusSerieAction = () => {
    return async (dispatch) => {
        const res = await instanceAxios.get("serie/all/");
        if (res) {
            dispatch(GET_ALL_SERIE_FOCUS_REDUCER(res.data));
        }
        return res.data;
    };
};

// Get all serie focus professionnel
export const getAllFocusSerieProfAction = (id) => {
    return async (dispatch) => {
        const res = await instanceAxios.get(`serie/allbyprof/${id}/`);
        if (res) {
            dispatch(GET_ALL_SERIE_FOCUS_PROF_REDUCER(res.data));
        }
        return res.data;
    };
};

// Get one serie
export const  getOneSerieAction = (id) => {
    return async (dispatch) => {
        const res = await instanceAxios.get(`serie/one/${id}/`);
        if (res) {
            dispatch(GET_ONE_SERIE_REDUCER(res.data));
        }
    };
};

// Add focus in serie
export const addFocusOnSerieAction = (formdata) => {
    return async (dispatch) => {
        const res = await instanceAxios.post(`serie/addFocus/`, formdata);
        if (res) {
            dispatch(POST_NEW_SERIE_FOCUS_REDUCER(res.data));
        }
        return res.data;
    };
}; 

// Modifier une serie
export const updateSerieAction = (formdata, id) => {
    return async (dispatch) => {
        const res = await instanceAxios.put(`serie/update/${id}/`, formdata);
        if (res) {
            dispatch(POST_NEW_SERIE_FOCUS_REDUCER(res.data));
        }
        return res.data;
    };
};

// Supprimer une serie
export const deleteSerieAction = (id) => {
    return async (dispatch) => {
        const res = await instanceAxios.delete(`serie/delete/${id}/`);
        if (res) {
            dispatch(POST_NEW_SERIE_FOCUS_REDUCER(res.data));
        }
        return res.data;
    };
};