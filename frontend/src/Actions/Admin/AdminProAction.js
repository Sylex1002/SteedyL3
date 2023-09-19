import { InstanceAxiosAdmin } from "../../Helpers/InstanceAxionsAdmin";
import { PRO_ALL_ADMIN } from "../../Reducers/Admin/AdminProSlice";

export const GetAllPro = () => {
  return async (dispatch) => {
    const res = await InstanceAxiosAdmin.get("/professionnels/");
    dispatch(PRO_ALL_ADMIN(res.data));
  };
};
