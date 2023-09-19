import { InstanceAxiosAdmin } from "../../Helpers/InstanceAxionsAdmin";
import { ADD_HIGHLIGHT_STORE_ADMIN } from "../../Reducers/Admin/AdminHighlightSlice";

export const getAllHightlightAction = () => {
  return async (dispatch) => {
    const res = await InstanceAxiosAdmin.get("/highlight/");
    dispatch(ADD_HIGHLIGHT_STORE_ADMIN(res.data));
  };
};
