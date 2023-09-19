import { InstanceAxiosAdmin } from "../../Helpers/InstanceAxionsAdmin";
import {
  USER_STORE_LISTADD_ADMIN,
  USER_UPDATE_STORE_ADMIN,
  USER_ALL_UPDATE_STORE_ADMIN,
} from "../../Reducers/Admin/AdminUserSlice";

// gget all user
export const adminGetAllUserAction = () => {
  return async (dispatch) => {
    await InstanceAxiosAdmin.get("/users/").then((res) => {
      dispatch(USER_STORE_LISTADD_ADMIN(res.data));
    });
  };
};

// upload image ov user
export const uploadImageUserAction = (formdata) => {
  return async (dispatch) => {
    await InstanceAxiosAdmin.post(`/user-image/`, formdata).then((res) => {
      dispatch(USER_UPDATE_STORE_ADMIN(res.data));
      dispatch(USER_ALL_UPDATE_STORE_ADMIN(res.data));
    });
  };
};

// update bio
export const UpdateProfilUserAdmin = (id, formdata) => {
  return async (dispatch) => {
    await InstanceAxiosAdmin.put(`/users/${id}/`, formdata).then((res) => {
      dispatch(USER_UPDATE_STORE_ADMIN(res.data));
    });
  };
};
