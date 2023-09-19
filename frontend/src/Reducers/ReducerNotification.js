import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificate: [],
  notificateViewed: [],
  notificateMessage: [],
  notificateMsg: [],
  activeNotificate: false,
  activeNotificateViewed: false,
  activeNotificateMessage: false,
  notificateMsgActive: false,
};

// Create a slice for the items
const ReducerNotification = createSlice({
  name: "notificate",
  initialState,
  reducers: {
    GET_ALL_NOTIFICATE_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        notificate: [...payload],
        activeNotificate: true,
      };
      return state;
    },
    GET_ALL_NOTIFICATE_VIEWED_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        notificateViewed: [...payload],
        activeNotificateViewed: true,
      };
      return state;
    },
    GET_ALL_NOTIFICATE_MESSAGE_REDUCER: (state, { payload }) => {
      state.notificateMessage = state.notificateMessage.filter(
        (item) => item !== payload
      );
      state.notificateMessage.push(payload);
      state.activeNotificateMessage = true;
      return state;
    },
    DELETE_ONE_NOTIFICATE_REDUCER: (state, { payload }) => {
      state.notificate = state.notificate.filter((item) => item.id !== payload);
      state.activeNotificate = true;
      return state;
    },
    FILTER_NOTIFICATE_VIEWED_REDUCER: (state, { payload }) => {
      state.notificateViewed = state.notificateViewed.filter(
        (item) => item.id !== payload
      );
      state.activeNotificateViewed = true;
      return state;
    },
    PUSH_NOTIFICATE_REDUCER: (state, { payload }) => {
      state.notificate.push(payload);
      state.activeNotificate = true;
      return state;
    },
    PUSH_NOTIFICATE_VIEWED_REDUCER: (state, { payload }) => {
      state.notificateViewed.push(payload);
      state.activeNotificateViewed = true;
      return state;
    },
    PUSH_NOTIFICATE_MESSAGE_REDUCER: (state, { payload }) => {
      state.notificateMsg = state.notificateMsg.filter(
        (item) => item.user_sender.id !== payload.user_sender.id
      );
      state.notificateMsg.push(payload);
      state.notificateMsgActive = true;
      return state;
    },
    DELETE_NOTIFICATE_MESSAGE_REDUCER: (state, { payload }) => {
      state.notificateMsg = state.notificateMsg.filter(
        (item) => item.user_sender.id !== payload.user_sender.id
      );
      state.notificateMsgActive = true;
      return state;
    },
    DELETE_NOTIFICATE_MESSAGE_BYID_REDUCER: (state, { payload }) => {
      state.notificateMsg = state.notificateMsg.filter(
        (item) => item.user_sender.id !== payload
      );
      state.notificateMsgActive = true;
      return state;
    },
  },
});

export const GET_ALL_NOTIFICATE_LIST = (state) => (state.notificate.notificate);
export const GET_MY_NOTIFICATION_MSG = (state) => (state.notificate.notificateMsg);
export const GET_ALL_NOTIFICATE_MESSAGE = (state) =>
  state.notificate.notificateMessage;
export const GET_ALL_NOTIFICATE_VIEWED_LIST = (state) =>
  state.notificate.notificateViewed;

// active notification
export const GET_NOTIFICATE_ACTIVE = (state) =>(
  state.notificate.activeNotificate);
export const GET_NOTIFICATE_VIEWED_ACTIVE = (state) =>(
  state.notificate.activeNotificateViewed);
export const GET_NOTIFICATE_MESSAGE_ACTIVE = (state) =>(
  state.notificate.activeNotificateMessage);
  export const GET_NOTIFICATE_MSG_ACTIVE = (state) =>(
    state.notificate.notificateMsgActive);
  

export const {
  GET_ALL_NOTIFICATE_REDUCER,
  GET_ALL_NOTIFICATE_VIEWED_REDUCER,
  GET_ALL_NOTIFICATE_MESSAGE_REDUCER,
  DELETE_ONE_NOTIFICATE_REDUCER,
  FILTER_NOTIFICATE_VIEWED_REDUCER,
  PUSH_NOTIFICATE_VIEWED_REDUCER,
  PUSH_NOTIFICATE_REDUCER,
  PUSH_NOTIFICATE_MESSAGE_REDUCER,
  DELETE_NOTIFICATE_MESSAGE_REDUCER,
  DELETE_NOTIFICATE_MESSAGE_BYID_REDUCER,
} = ReducerNotification.actions;

// Export the reducer
export default ReducerNotification.reducer;
