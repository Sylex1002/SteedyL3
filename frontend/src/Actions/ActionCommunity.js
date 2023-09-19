import instanceAxios from "../Helpers/InstanceAxios";
import {
  GET_ALL_COMMUNITY_REDUCER,
  GET_ONE_COMMUNITY_REDUCER,
  POST_NEW_COMMUNITY_REDUCER,
  GET_COMMUNITY_EN_ATTENT_REDUCER,
  GET_ALL_COMMUNITY_ByUSER_REDUCER,
  GET_ALL_COMMUNITY_CONTAINER_USER_REDUCER,
  GET_ALL_COMMUNITY_NOT_CONTAINER_USER_REDUCER,
} from "../Reducers/ReducerCommunity";

//get all conversation in community
export const getConversationsCommunityAction = (GroupDestMessageID) => {
  return async () => {
    const res = await instanceAxios.get(
      `/get_conversationsGroupe/${GroupDestMessageID}/`
    );
    return res.data;
  };
};

//get all community
export const getAllCommunityAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get("/get-all-groupe/");
    if (res) {
      dispatch(GET_ALL_COMMUNITY_REDUCER(res.data));
      return res.data;
    }
  };
};

//get all community created by user
export const getAllCommunityByUserAction = (userID) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/groupe-createdby-user/${userID}/`);
    if (res) {
      dispatch(GET_ALL_COMMUNITY_ByUSER_REDUCER(res.data));
      return res.data;
    }
  };
};

//get all community container user
export const getAllCommunityContainerUserAction = (userID) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(
      `/get-group-containing-user/${userID}/`
    );
    if (res) {
      dispatch(GET_ALL_COMMUNITY_CONTAINER_USER_REDUCER(res.data));
      return res.data;
    }
  };
};

//get all community NOT container user
export const getAllCommunityNOTContainerUserAction = (userID) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(
      `/get-group-NOT-container-user/${userID}/`
    );
    if (res) {
      dispatch(GET_ALL_COMMUNITY_NOT_CONTAINER_USER_REDUCER(res.data));
      return res.data;
    }
  };
};

//get one community
export const getOneCommunityAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/get-one-groupe/${id}/`);
    if (res) {
      dispatch(GET_ONE_COMMUNITY_REDUCER(res.data));
    }
    return res.data;
  };
};

export const createCommunaute_action = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post(`/create-groupe/`, formdata);
    if (res) {
      dispatch(POST_NEW_COMMUNITY_REDUCER(res.data));
    }
    return res.data;
  };
};

export const join_group_action = (formdata) => {
  return async () => {
    const res = await instanceAxios.post(`/join/group/`, formdata);
    return res.data;
  };
};

export const add_user_into_group_action = (formdata) => {
  return async () => {
    const res = await instanceAxios.post(`/add-user-to-groupe/`, formdata);
    return res.data;
  };
};

//get one community
export const getCommuntyEnAttent = (user_id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/get-group-enAttent/${user_id}/`);
    if (res) {
      dispatch(GET_COMMUNITY_EN_ATTENT_REDUCER(res.data));
      return res.data;
    }
  };
};

// delete group waiting
export const delete_waiting_group_action = (group_id) => {
  return async () => {
    const res = await instanceAxios.delete(
      `/delete-group-waiting/${group_id}/`
    );
    return res.data;
  };
};

// add user into view of group message
export const add_user_inot_messageGroup_action = (formdata) => {
  return async () => {
    return await instanceAxios.post("add-group-views", formdata).data;
  };
};
