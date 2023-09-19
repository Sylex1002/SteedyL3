import instancesAxiosZone from "../Helpers/InstanceAxiosZone";

import { GET_ALL_ZONE_REDUCER } from "../Reducers/ReducerZone";

//get all zone
export const getAllZoneAction = () => {
  return async (dispatch) => {
    const { data } = await instancesAxiosZone.get("/api/rooms");
    dispatch(GET_ALL_ZONE_REDUCER(data));
    return data;
  };
};
