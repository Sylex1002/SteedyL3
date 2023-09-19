import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: {
    messages: [],
  },
};

const ReducerMessageByMat = createSlice({
  name: "message",
  initialState,
  reducers: {
    getConversationByMatriculeReducer: (state, { payload }) => {
      state = {
        ...state,
        message: [...payload],
      };
      return state;
    },
  },
});

export const getConversationByMatricule = (state) => state.message.messages;


export const { getConversationByMatriculeReducer } =
  ReducerMessageByMat.actions;

export default ReducerMessageByMat.reducer;
