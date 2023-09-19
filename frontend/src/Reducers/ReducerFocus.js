import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  focusList: [],
  smilaire: [],
  recomande: [],
  populaire: [],
  populaireByCategory: [],
  focusFollow: [],
  focusRecomand: [],
  myFocus: [],
  focus: {},
  // boolean`
  focusListActive: false,
  smilaireActive: false,
  recomandeActive: false,
  populaireActive: false,
  focusRecomandActive: false,
  populaireByCategoryActive: false,
  focusFollowActive: false,
  myFocusActive: false,
};

// Create a slice for the items
const ReducerFocus = createSlice({
  name: "focus",
  initialState,
  reducers: {
    GET_ALL_FOCUS_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        focusList: [...payload],
        focusListActive: true,
      };
      return state;
    },
    GET_ONE_FOCUS_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        focus: { ...payload },
      };
      return state;
    },
    GET_ONE_FOCUS_BY_CATEGORY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        smilaire: [...payload],
        smilaireActive: true,
      };
      return state;
    },
    GET_FOCUS_POPULAIRE_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        populaire: [...payload],
        populaireActive: true,
      };
      return state;
    },
    GET_FOCUS_POPULAIRE_BY_CATEGORY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        populaireByCategory: [...payload],
        populaireByCategoryActive: true,
      };
      return state;
    },
    GET_FOCUS_FOLLOW_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        focusFollow: [...payload],
        focusFollowActive: true,
      };
      return state;
    },
    GET_FOCUS_RECOMMANDE_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        focusRecomand: [...payload],
        focusRecomandActive: true,
      };
      return state;
    },
    GET_MY_FOCUS_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        myFocus: [...payload],
        myFocusActive: true,
      };
      return state;
    },
    PUSH_MY_FOCUS_REDUCER: (state, { payload }) => {
      state.myFocus.push(payload);
      state.myFocusActive = true;

      return state;
    },
    VIDE_MY_FOCUS_REDUCER: (state) => {
      state = {
        ...state,
        myFocus: [],
        myFocusActive: false,
      };
      return state;
    },
  },
});

export const GET_MY_FOCUS = (state) => state.focus.myFocus;
export const GET_ALL_FOCUS_ONE = (state) => state.focus.focus;
export const GET_ALL_FOCUS_LIST = (state) => state.focus.focusList;
export const GET_FOCUS_POPULAIRE = (state) => state.focus.populaire;
export const GET_FOCUS_ONE_CATEGORY = (state) => state.focus.smilaire;
export const GET_FOCUS_FOLLOW_PROF = (state) => state.focus.focusFollow;
export const GET_FOCUS_RECOMMANDER = (state) => state.focus.focusRecomand;
export const GET_FOCUS_SMILAIRE_CATEGORY = (state) =>
  state.focus.populaireByCategory;

// ACTIVE
export const GET_MY_FOCUS_ACTIVE = (state) => state.focus.myFocusActive;
export const GET_ALL_FOCUS_LIST_ACTIVE = (state) => state.focus.focusListActive;
export const GET_FOCUS_POPULAIRE_ACTIVE = (state) =>
  state.focus.populaireActive;
export const GET_FOCUS_ONE_CATEGORY_ACTIVE = (state) =>
  state.focus.smilaireActive;
export const GET_FOCUS_FOLLOW_PROF_ACTIVE = (state) =>
  state.focus.focusFollowActive;
export const GET_FOCUS_RECOMMANDER_ACTIVE = (state) =>
  state.focus.focusRecomandActive;
export const GET_FOCUS_SMILAIRE_CATEGORY_ACTIVE = (state) =>
  state.focus.populaireByCategoryActive;

export const {
  PUSH_MY_FOCUS_REDUCER,
  GET_ALL_FOCUS_REDUCER,
  GET_MY_FOCUS_REDUCER,
  GET_ONE_FOCUS_REDUCER,
  VIDE_MY_FOCUS_REDUCER,
  GET_FOCUS_FOLLOW_REDUCER,
  GET_FOCUS_POPULAIRE_REDUCER,
  GET_FOCUS_RECOMMANDE_REDUCER,
  GET_ONE_FOCUS_BY_CATEGORY_REDUCER,
  GET_FOCUS_POPULAIRE_BY_CATEGORY_REDUCER,
} = ReducerFocus.actions;

// Export the reducer
export default ReducerFocus.reducer;
