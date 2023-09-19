import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
  update: false,
};

const userStoreAdmin = createSlice({
  name: "userAdmin",
  initialState,
  reducers: {
    USER_STORE_LISTADD_ADMIN: (state, action) => {
      state = {
        ...state,
        users: [...action.payload],
        update: false,
      };
      return state;
    },
    USER_UPDATE_STORE_ADMIN: (state, action) => {
      state = {
        ...state,
        user: action.payload,
        update: true,
      };
      return state;
    },
    USER_ALL_UPDATE_STORE_ADMIN: (state, action) => {
      state = {
        ...state,
        users: [...state.users, action.payload],
        update: true,
      };
      return state;
    },
    USER_FALSE_UPDATE_ADMIN: (state) => {
      state = {
        ...state,
        update: false,
      };
      return state;
    },
  },
});

export const GET_USER_ADMIN = (state) => state.userAdmin;
export const GET_USER_LEN_ADMIN = (state) => state.userAdmin.users.length;
export const GET_LIST_USER_ADMIN = (state) => state.userAdmin.users;
export const GET_ONE_USER_ADMIN = (state) => state.userAdmin.user;
export const GET_UPDATE_USER_ADMIN = (state) => state.userAdmin.update;

export const {
  USER_STORE_LISTADD_ADMIN,
  USER_UPDATE_STORE_ADMIN,
  USER_ALL_UPDATE_STORE_ADMIN,
  USER_FALSE_UPDATE_ADMIN,
} = userStoreAdmin.actions;
export default userStoreAdmin.reducer;
