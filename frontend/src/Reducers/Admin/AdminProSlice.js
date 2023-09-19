import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pros: [],
};

const proStoreAdmin = createSlice({
  name: "proAdmin",
  initialState,
  reducers: {
    PRO_ALL_ADMIN: (state, action) => {
      state = {
        ...state,
        pros: [...action.payload],
      };
      return state;
    },
  },
});

export const PRO_GETALL_ADMIN = (state) => state.proAdmin.pros;
export const PROF_LENGTH_ADMIN = (state) => state.proAdmin.pros;

export const { PRO_ALL_ADMIN } = proStoreAdmin.actions;
export default proStoreAdmin.reducer;
