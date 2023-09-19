import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  highlights: [],
  highlight: {},
};

const highlightAdminSlice = createSlice({
  name: "highlightAdmin",
  initialState,
  reducers: {
    ADD_HIGHLIGHT_STORE_ADMIN: (state, action) => {
      state = {
        ...state,
        highlights: [...action.payload],
      };
      return state;
    },
    // ADD_ONE_HIGHLIGHT_STORE_ADMIN: (state, action) => {},
  },
});

export const GET_ALL_HIGHLIGHT_ADMIN = (state) =>
  state.highlightAdmin.highlights;

export const { ADD_HIGHLIGHT_STORE_ADMIN } = highlightAdminSlice.actions;
export default highlightAdminSlice.reducer;
