import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  refresh: null,
  message: null,
  userId: null,
  user: [],
};

const authStoreAdmin = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_STORE_LOGIN_ADMIN: (state, action) => {
      state = {
        ...state,
        auth: action.payload,
      };
      return state;
    },
    AUTH_STORE_SIGNUP_ADMIN: (state, action) => {
      state = {
        ...state,
        message: action.payload.message,
      };
      return state;
    },
    AUTH_STORE_LOGOUT_ADMIN: (state, action) => {
      state = {
        ...state,
        token: null,
        message: action.payload.message,
      };
      return state;
    },
  },
});

export const GET_AUTH_ADMIN = (state) => state;
export const {
  AUTH_STORE_LOGIN_ADMIN,
  AUTH_STORE_SIGNUP_ADMIN,
  AUTH_STORE_LOGOUT_ADMIN,
} = authStoreAdmin.actions;
export default authStoreAdmin.reducer;
