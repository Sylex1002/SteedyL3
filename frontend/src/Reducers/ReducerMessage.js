import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: {
    messages: [],
  },
  etudiantMessageList: [],
  ProfMessageList: [],
  ACTIVEMessageList:false,
};

const ReducerConversation = createSlice({
  name: "message",
  initialState,
  reducers: {
    GET_CONVERSATIONS_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        messages: [...payload],
      };
      return state;
    },
    GET_ETTUDIANT_MESSAGE_LISTE_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        etudiantMessageList: [...payload],
        ACTIVEMessageList:true
      };
      return state;
    },
    GET_PROFESSIONNEL_MESSAGE_LISTE_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        ProfMessageList: [...payload],
        ACTIVEMessageList:true
      };
      return state;
    },
  },
});

export const getConversationsList = (state) => state.message.messages;
export const GET_ETTUDIANT_MESSAGE_LISTS = (state) =>(
  state.message.etudiantMessageList);
export const GET_PROFESSIONNEL_MESSAGE_LISTS = (state) =>(
  state.message.ProfMessageList);

// active
export const GET_ACTIVE_MESSAGE_LIST = (state) => state.message.ACTIVEMessageList;


export const {
  GET_CONVERSATIONS_REDUCER,
  GET_ETTUDIANT_MESSAGE_LISTE_REDUCER,
  GET_PROFESSIONNEL_MESSAGE_LISTE_REDUCER,
} = ReducerConversation.actions;

export default ReducerConversation.reducer;
