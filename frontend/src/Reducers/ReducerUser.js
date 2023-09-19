import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iSuccess: "",
  isLoading: false,
  userActive: false,
  data: {},
  id: "",
  users: [],
  otp: {
    email: "",
    expiration: "",
    otp: "",
    otp_hashed: "",
  },
  profFollowedByUser: [],
  Followinguser: [],
};

// Create a slice for the items
const ReducerUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN_USER_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        refresh_token: payload.refresh,
        access_token: payload.access,
        data: {
          ...payload,
          refresh_token: null,
          access_token: null,
        },
      };
      return state;
    },
    SIGNUP_USER_REDUCER: (state, { payload }) => {
      state = { ...state, ...payload };
      return state;
    },
    GET_USER_INFO_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        data: { ...payload },
        userActive: true,
      };
      return state;
    },
    UPLOAD_USER_IMG_REDUCER: (state, { payload }) => {
      state.data = payload;
      return state;
    },
    GET_ID_USER_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        id: payload.user_id,
      };
      return state;
    },
    REFRESH_TOKEN_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        access_token: payload.access,
        refresh_token: payload.refresh,
      };
      return state;
    },
    GET_ALL_USERS_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        users: [...payload],
      };
      return state;
    },
    LOGOUT_USERS_REDUCER: (state) => {
      state = {
        ...state,
        iSuccess: "",
        isLoading: false,
        userActive: false,
        data: {},
        id: "",
      };
      return state;
    },
    setOtp: (state, action) => {
      // payload
      const { email, expiration, otp, otp_hashed } = action.payload;

      // state
      state.otp.email = email;
      state.otp.expiration = expiration;
      state.otp.otp = otp;
      state.otp.otp_hashed = otp_hashed;

      return state;
    },
    GET_PROF_FOLLOWER_ByUSER_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profFollowedByUser: [...payload],
      };
      return state;
    },
    GET_FOLLOWING_OFUSER_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profFollowedByUser: [...payload],
      };
      return state;
    },
  },
});

export const GET_USER_ID = (state) => state.user.id;
export const GET_USER_INFO = (state) => state.user;
export const GET_USER_INFO_CONNECT = (state) => state.user.data;
export const GET_ALL_USERS = (state) => state.user.users;
export const GET_USER_ACTIVE = (state) => state.user.userActive;
export const GET_PROF_FOLLOWER_ByUSER = state => state.user.profFollowedByUser;

export const {
  LOGIN_USER_REDUCER,
  SIGNUP_USER_REDUCER,
  GET_ID_USER_REDUCER,
  LOGOUT_USERS_REDUCER,
  REFRESH_TOKEN_REDUCER,
  GET_ALL_USERS_REDUCER,
  GET_USER_INFO_REDUCER,
  UPLOAD_USER_IMG_REDUCER,
  GET_PROF_FOLLOWER_ByUSER_REDUCER,
  setOtp,
} = ReducerUser.actions;

// Export the reducer
export default ReducerUser.reducer;
