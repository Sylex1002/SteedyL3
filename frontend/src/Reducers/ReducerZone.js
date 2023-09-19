import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoneList: [],
  zone: {},
};

const ReducerZone = createSlice({
  name: "zone",
  initialState,
  reducers: {
    GET_ALL_ZONE_REDUCER: (state, { payload }) => {
      state = {
        ...state,
        zoneList: [...payload],
      };
      return state;
    },
  },
});

export const GET_ALL_ZONE_LIST = (state) => state.zoneList;

export const { GET_ALL_ZONE_REDUCER } = ReducerZone.actions;

export default ReducerZone.reducer;
