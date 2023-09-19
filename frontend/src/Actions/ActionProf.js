import instanceAxios from "../Helpers/InstanceAxios";
import {
  GET_ONE_PROF_REDUCER,
  GET_PROF_FOLLOW_REDUCER,
  GET_ALL_PROFLIST_REDUCER,
  GET_PROF_UNFOLLOW_REDUCER,
  GET_PROF_POPULAIRE_REDUCER,
  GET_PROF_FOLLOWING_REDUCER,
  GET_PROF_SAMECATEGORY_REDUCER,
} from "../Reducers/ReduceProfesssionnel";

// get all prof
export const getAllProfAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get("/professionnels/");
    if (res) {
      dispatch(GET_ALL_PROFLIST_REDUCER(res.data));
      return res.data;
    }
  };
};

// get prof follow
export const getFollowProfAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/followed/${id}/`);
    if (res) {
      dispatch(GET_PROF_FOLLOW_REDUCER(res.data));
      return res.data;
    }
  };
};

// get prof unfollow
export const getUnFollowProfAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/unfollowed/${id}/`);
    if (res) {
      dispatch(GET_PROF_UNFOLLOW_REDUCER(res.data));
      return res.data;
    }
  };
};

// get prof unfollow same category
export const getUnFollowSameCategoryProfAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/category/${id}/`);
    if (res) {
      dispatch(GET_PROF_SAMECATEGORY_REDUCER(res.data));
      return res.data;
    }
  };
};

// get one prof
export const getOneProf_Action = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/${id}/`);
    if (res) {
      dispatch(GET_ONE_PROF_REDUCER(res.data));
      return res.data;
    }
  };
};

// get one prof
export const postProf_Action = (formdata) => {
  return async () => {
    const res = await instanceAxios.post("pro-add/", formdata);
    if (res) {
      return res.data;
    }
  };
};

export const getOneProfAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/professionnels/${id}/`);
    if (res.status === 200) {
      dispatch(GET_ONE_PROF_REDUCER(res.data));
    }
    return res;
  };
};

export const getProfIdAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/professionnels/user/${id}/`);
    if (res.status === 200) {
      dispatch(GET_ONE_PROF_REDUCER(res.data));
    }
    return res.data;
  };
};

export const getProfPopulaireAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/professionnels/populaire/all/`);
    if (res.status === 200) {
      dispatch(GET_PROF_POPULAIRE_REDUCER(res.data));
    }
    return res.data;
  };
};

export const getPro_search_Action = (searchQuery) => {
  return async () => {
    const res = await instanceAxios.get(
      `professionnels/search?q=${searchQuery}`
    );
    return res;
  };
};

export const post_follower_prof_action = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("professionnels/follower", formdata);
    if (res) {
      dispatch(GET_PROF_FOLLOW_REDUCER(res.data.followed_profs));
    }
    return res;
  };
};

export const get_prof_follow_byprof_action = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/follower/${id}/`);
    if (res) {
      dispatch(GET_PROF_FOLLOW_REDUCER(res.data));
    }
    return res;
  };
};

export const get_prof_similaire_prof_action = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/similar/${id}/`);
    if (res) {
      dispatch(GET_PROF_SAMECATEGORY_REDUCER(res.data));
    }
    return res;
  };
};

// get professionnel following
export const getProfFollwing = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/following/${id}/`);
    if (res) {
      dispatch(GET_PROF_FOLLOWING_REDUCER(res.data));
      return res.data;
    }
  };
};
