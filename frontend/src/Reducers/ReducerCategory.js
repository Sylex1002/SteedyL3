import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [],
  categoryListActive: false,
};

// Create a slice for the items
const ReducerCategory = createSlice({
  name: "category",
  initialState,
  reducers: {
    GET_ALL_CATEGORY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        categoryList: [...payload],
        categoryListActive: true,
      };
      return state;
    },
  },
});

// export category
export const GET_ALL_CATEGORY_LIST = (state) => state.category.categoryList;

// active
export const GET_ALL_CATEGORY_ACTIVE = (state) =>(
  state.category.categoryListActive);

export const { GET_ALL_CATEGORY_REDUCER } = ReducerCategory.actions;

// Export the reducer
export default ReducerCategory.reducer;
