import InstanceAxios from "../Helpers/InstanceAxios";
import { getConversationByMatriculeReducer } from "../Reducers/ReducerMessageByMat";

export const getConversationByMatriculeAction = (matricule, sender_id) => {
  return async (dispatch) => {
    const response = await InstanceAxios.get(
      `/get_conversationsByMat/${matricule}/${sender_id}/`
    );
    dispatch(getConversationByMatriculeReducer(response.data));
    return response.data;
  };
};
