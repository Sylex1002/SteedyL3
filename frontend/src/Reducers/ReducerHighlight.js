import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  highlightList: [],
  high24h: [],
  highFollow: [],
  highUnviewed: [],
  myHighlight: [],
  highlight: {},
  highlightLength: 0,
  highUnviewedActive: false,
  highFollowActive: false,
  myHighlightActive: false,
};

// Create a slice for the items
const ReducerHighlight = createSlice({
  name: "highlight",
  initialState,
  reducers: {
    GET_ALL_HIGHLIGHT_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        highlightList: [...payload],
        highlightLength: payload.length,
      };
      return state;
    },
    GET_ONE_HIGHLIGHT_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        highlight: { payload },
      };
    },
    GET_HIGHLIGHT24H_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        high24h: [...payload],
      };
      return state;
    },
    GET_HIGHLIGHT_FOLLOW_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        highFollow: [...payload],
        highFollowActive: true,
      };
      return state;
    },
    GET_HIGHLIGHT_UNVIEW_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        highUnviewed: [...payload],
        highUnviewedActive: true,
      };
      return state;
    },
    GET_MY_HIGHLIGHT_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        myHighlight: [...payload],
        myHighlightActive: true,
      };
      return state;
    },
  },
});

export const GET_ONE_HIGHLIGHT = (state) => state.highlight.highlight;
export const GET_MY_HIGHLIGHT = (state) => state.highlight.myHighlight;
export const GET_HIGHLIGHT24H_LIST = (state) => state.highlight.high24h;
export const GET_HIGHLIGHT_UNVIEWED = (state) => state.highlight.highUnviewed;
export const GET_HIGHLIGHTFOLLOW_LIST = (state) => state.highlight.highFollow;
export const GET_ALL_HIGHLIGHT_LIST = (state) => state.highlight.highlightList;
export const GET_HIGHLIGHT_PRO_LENGTH = (state) =>(
  state.highlight.highlightLength);

// active
export const GET_MY_HIGHLIGHT_ACTIVE = (state) =>(
  state.highlight.myHighlightActive);
export const GET_HIGHLIGHT_UNVIEWED_ACTIVE = (state) =>(
  state.highlight.highUnviewedActive);
export const GET_HIGHLIGHTFOLLOW_LIST_ACTIVE = (state) =>(
  state.highlight.highFollowActive);

export const {
  GET_HIGHLIGHT24H_REDUCER,
  GET_ALL_HIGHLIGHT_REDUCER,
  GET_ONE_HIGHLIGHT_REDUCER,
  GET_MY_HIGHLIGHT_REDUCER,
  GET_HIGHLIGHT_FOLLOW_REDUCER,
  GET_HIGHLIGHT_UNVIEW_REDUCER,
} = ReducerHighlight.actions;

// Export the reducer
export default ReducerHighlight.reducer;
