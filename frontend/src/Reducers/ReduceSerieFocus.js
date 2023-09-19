import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    serieList: [],
    mySerie: [],
    serie: {},
    // boolean`
    serieListActive: false,
    mySerieActive: false,
    infoOneSerieActive: false,
};

const ReducerSerieFocus = createSlice({
    name: "serieFocus",
    initialState,
    reducers: {
        GET_ALL_SERIE_FOCUS_REDUCER: (state, { payload }) => {
            state = {
                ...state,
                serieList: [...payload],
                serieListActive: true,
            };
            return state;
        },
        GET_ALL_SERIE_FOCUS_PROF_REDUCER: (state, { payload }) => {
            state = {
                ...state,
                mySerie: [...payload],
                mySerieActive: true,
            };
            return state;
        },
        GET_ONE_SERIE_REDUCER: (state, { payload }) => {
            state = {
                ...state,
                serie: payload,
            };
            return state;
        },
        POST_NEW_SERIE_FOCUS_REDUCER: (state, { payload }) => {
            state.serieList=state.serieList.filter(item=>item.id!==payload.id);
            state.serieList.push(payload);
            state.serieListActive=true;
            // filter my focus
            state.mySerie=state.mySerie.filter(item=>item.id!==payload.id);
            state.mySerie.push(payload);
            state.mySerieActive=true;
            return state;
        },
    },
});

// All Serie
export const GET_ALL_SERIE_FOCUS_LIST = (state) => state.serieFocus.serieList;
export const GET_ACTIVE_ALL_SERIE_FOCUS = (state) => state.serieFocus.serieListActive;

// All Serie Professionnel
export const GET_ALL_SERIE_FOCUS_PROF_LIST = (state) => state.serieFocus.mySerie;
export const GET_ACTIVE_ALL_SERIE_FOCUS_PROF = (state) => state.serieFocus.mySerieActive;

// Get one serie info
export const GET_ONE_INFO_SERIE = (state) => state.serieFocus.serie;
export const GET_ONE_INFO_SERIE_ACTIVE = (state) => state.serieFocus.infoOneSerieActive;

export const {
    GET_ALL_SERIE_FOCUS_REDUCER,
    POST_NEW_SERIE_FOCUS_REDUCER,
    GET_ALL_SERIE_FOCUS_PROF_REDUCER,
    GET_ONE_SERIE_REDUCER,
} = ReducerSerieFocus.actions;

// Export the reducer
export default ReducerSerieFocus.reducer;