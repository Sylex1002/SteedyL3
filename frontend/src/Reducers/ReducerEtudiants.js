import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: {},
};

// Create a slice for the items
const ReducerStudent = createSlice({
  name: "student",
  initialState,
  reducers: {
    GET_ONE_STUDENT_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        student: { ...payload },
      };
      return state;
    },
  },
});

export const GET_ONE_STUDENT = (state) => state.student.student;
export const { GET_ONE_STUDENT_REDUCER } = ReducerStudent.actions;

// Export the reducer
export default ReducerStudent.reducer;
