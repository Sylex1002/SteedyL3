import instanceAxios from "../Helpers/InstanceAxios";
import { GET_ONE_STUDENT_REDUCER } from "../Reducers/ReducerEtudiants";

export const getOneEtudiantAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/students/user/${id}/`);
    console.log("==>study", res);
    if (res) {
      dispatch(GET_ONE_STUDENT_REDUCER(res.data));
      return res.data;
    }
  };
};
