import instanceAxios from "../Helpers/InstanceAxios";
import { GET_ALL_CATEGORY_REDUCER } from "../Reducers/ReducerCategory";

// get all prof
export const getAllCategoryAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get("/category/");
    if (res) {
      dispatch(GET_ALL_CATEGORY_REDUCER(res.data));
      return res.data;
    }
  };
};

export const get_one_category_action = () => {
  return async () => {};
};

export const update_category_action = () => {
  return async () => {};
};

export const delete_category_action = () => {
  return async () => {};
};
