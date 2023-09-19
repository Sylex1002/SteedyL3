import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  etudiantList: [],
  etudiant: {},
};

// Create a slice for the items
const ReducerEtudiant = createSlice({
  name: "focus",
  initialState,
  reducers: {
    GET_ALL_ETUDIANTLIST_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        etudiantList: [...payload],
      };
      return state;
    },
  },
});

export const GET_ALL_ETUDIANT_LIST = (state) => state.etudiant.etudiantList;

export const { GET_ALL_ETUDIANTLIST_REDUCER } = ReducerEtudiant.actions;

// Export the reducer
export default ReducerEtudiant.reducer;
