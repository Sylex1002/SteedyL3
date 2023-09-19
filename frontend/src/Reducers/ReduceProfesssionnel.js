import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profList: [],
  profFollow: [],
  profUnFollow: [],
  profSameCategory: [],
  profPopulaire: [],
  profFollowing: [],
  prof: {},
  profPopulaireActive: false,
  profSameCategoryActive: false,
  profFollowActive: false,
  profUnFollowActive: false,
  profListActive: false,
  profActive: false,
};

// Create a slice for the items
const ReducerProfesssionnel = createSlice({
  name: "prof",
  initialState,
  reducers: {
    GET_ALL_PROFLIST_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profList: [...payload],
        profListActive: true,
      };
      return state;
    },
    GET_ONE_PROF_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        prof: { ...payload },
        profActive: true,
      };
      return state;
    },
    GET_PROF_FOLLOW_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profFollow: [...payload],
        profFollowActive: true,
      };
      return state;
    },
    GET_PROF_UNFOLLOW_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profUnFollow: [...payload],
        profUnFollowActive: true,
      };
      return state;
    },
    GET_PROF_SAMECATEGORY_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profSameCategory: [...payload],
        profSameCategoryActive: true,
      };
      return state;
    },
    GET_PROF_POPULAIRE_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profPopulaire: [...payload],
        profPopulaireActive: true,
      };
      return state;
    },
    GET_PROF_FOLLOWING_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        profFollowing: [...payload],
      };
      return state;
    },
  },
});

// export prof
export const GET_ONE_PROF = (state) => state.prof.prof;
export const GET_ALL_PROF_LIST = (state) => state.prof.profList;
export const GET_FOLLOW_PROF_LIST = (state) => state.prof.profFollow;
export const GET_UNFOLLOW_PROF_LIST = (state) => state.prof.profUnFollow;
export const GET_POPULAIRE_PROF_LIST = (state) => state.prof.profPopulaire;
export const GET_PROF_FOLLOWING = (state) => state.prof.profFollowing;

export const GET_SAMACATEGORY_PROF_LIST = (state) =>(
  state.prof.profSameCategory);

// export active profesionel
export const GET_SAMECATEGORY_PROF_LIST_ACTIVE = (state) =>
  state.prof.profSameCategoryActive;
export const GET_POPULAIRE_PROF_ACTIVE = (state) =>
  state.prof.profPopulaireActive;
export const GET_FOLLOW_PROF_LIST_ACTIVE = (state) =>
  state.prof.profFollowActive;
export const GET_ALL_PROF_LIST_ACTIVE = (state) => state.prof.profListActive;
export const GET_ONE_PROF_ACTIVE = (state) => state.prof.profActive;

export const {
  GET_ONE_PROF_REDUCER,
  GET_PROF_FOLLOW_REDUCER,
  GET_ALL_PROFLIST_REDUCER,
  GET_PROF_UNFOLLOW_REDUCER,
  GET_PROF_POPULAIRE_REDUCER,
  GET_PROF_FOLLOWING_REDUCER,
  GET_PROF_SAMECATEGORY_REDUCER,
} = ReducerProfesssionnel.actions;

// Export the reducer
export default ReducerProfesssionnel.reducer;
