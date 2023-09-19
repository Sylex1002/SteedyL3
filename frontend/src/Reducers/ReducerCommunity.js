import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  communityEnAttent: [],
  communityList: [],
  communityLists: [],
  communityListContainerUser: [],
  communityListNOTContainerUser: [],
  community: {},
  messageGroupe: {
    messages: [],
  },
};

const ReducerCommunity = createSlice({
  name: "community",
  initialState,
  reducers: {
    GET_ALL_COMMUNITY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        communityList: [...payload],
      };
      return state;
    },
    GET_ALL_COMMUNITY_ByUSER_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        communityLists: [...payload],
      };
      return state;
    },
    GET_ONE_COMMUNITY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        community: { ...payload },
      };
    },
    GET_ALL_COMMUNITY_CONTAINER_USER_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        communityListContainerUser: [...payload],
      };
      return state;
    },
    GET_ALL_COMMUNITY_NOT_CONTAINER_USER_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        communityListNOTContainerUser: [...payload],
      };
      return state;
    },
    GET_CONVERSATIONS_COMMUNITY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        messages: [...payload],
      };
      return state;
    },
    POST_NEW_COMMUNITY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        communityListContainerUser: [
          ...state.communityListContainerUser,
          payload,
        ],
      };
      return state;
    },
    GET_COMMUNITY_EN_ATTENT_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        communityEnAttent: [...payload],
      };
      return state;
    },
    DELETE_COMMUNITY_EN_ATTENT_REDUCER: (state, { payload }) => {
      state.communityEnAttent = state.communityEnAttent.filter((item) => item !== payload);
      return state;
    },
  },
});

export const GET_COMMUNITY_EN_ATTENT = state => state.community.communityEnAttent;

export const GET_ALL_COMMUNITY = (state) => state.community.communityList;
export const GET_ALL_COMMUNITY_ByUSER = (state) =>(
  state.community.communityLists);
export const GET_ONE_COMMUNITY = (state) => state.community.community;
export const GET_ALL_COMMUNITY_CONTAINER_USER = (state) =>(
  state.community.communityListContainerUser);
export const GET_ALL_COMMUNITY_NOT_CONTAINER_USER = (state) =>(
  state.community.communityListNOTContainerUser);
export const getConversationsList = (state) => state.messageGroupe.messages;
export const {
  GET_ALL_COMMUNITY_REDUCER,
  GET_ONE_COMMUNITY_REDUCER,
  POST_NEW_COMMUNITY_REDUCER,
  GET_COMMUNITY_EN_ATTENT_REDUCER,
  GET_ALL_COMMUNITY_ByUSER_REDUCER,
  GET_CONVERSATIONS_COMMUNITY_REDUCER,
  GET_ALL_COMMUNITY_CONTAINER_USER_REDUCER,
  GET_ALL_COMMUNITY_NOT_CONTAINER_USER_REDUCER,
  DELETE_COMMUNITY_EN_ATTENT_REDUCER,
} = ReducerCommunity.actions;

export default ReducerCommunity.reducer;
