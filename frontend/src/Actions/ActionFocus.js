import instanceAxios from "../Helpers/InstanceAxios";
import {
  GET_ALL_FOCUS_REDUCER,
  GET_ONE_FOCUS_REDUCER,
  GET_MY_FOCUS_REDUCER,
  GET_FOCUS_FOLLOW_REDUCER,
  GET_FOCUS_POPULAIRE_REDUCER,
  GET_FOCUS_RECOMMANDE_REDUCER,
  GET_ONE_FOCUS_BY_CATEGORY_REDUCER,
  GET_FOCUS_POPULAIRE_BY_CATEGORY_REDUCER,
} from "../Reducers/ReducerFocus";

// Create focus
export const createFocusAction = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("create-focus/", formdata);
    if (res.status === 200) {
      dispatch(GET_ALL_FOCUS_REDUCER([res.data]));
    }
    return res;
  };
};
// get all focus

export const getAllFocusAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get("/list-all-focus/");
    if (res) {
      dispatch(GET_ALL_FOCUS_REDUCER(res.data));
      return res.data;
    }
  };
};

// focus like
export const focusLikeAction = (formdata) => {
  return async () => {
    const res = await instanceAxios.post("focus/post/likes/", formdata);
    if (res) {
      return res.data;
    }
  };
};

// get one focus
export const getOneFocusAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`focus/get/${id}/`);
    if (res) {
      dispatch(GET_ONE_FOCUS_REDUCER(res.data));
      return res.data;
    }
  };
};

// get one focus by prog
export const getAllFocusProfAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`list-all-focus/${id}/`);
    if (res) {
      dispatch(GET_MY_FOCUS_REDUCER(res.data));
      return res.data;
    }
  };
};

// get one focus by prog
export const getFocusByCategory = (categorie) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`focus/category/${categorie}/`);
    if (res) {
      dispatch(GET_ONE_FOCUS_BY_CATEGORY_REDUCER(res.data));
      return res.data;
    }
  };
};

// get focus populaire
export const getFocusPopulaireAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get("focus/populair/all/");
    if (res) {
      dispatch(GET_FOCUS_POPULAIRE_REDUCER(res.data));
      return res.data;
    }
  };
};

// get focus populaire by category
export const getFocusPopulaireByCategorie = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`focus/populair/${id}/`);
    if (res) {
      dispatch(GET_FOCUS_POPULAIRE_BY_CATEGORY_REDUCER(res.data));
      return res.data;
    }
  };
};

// get focus by prof followed
export const get_followed_prof_focusesAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`focus/followed_prof/${id}/`);

    if (res) {
      dispatch(GET_FOCUS_FOLLOW_REDUCER(res.data));
      return res.data;
    }
  };
};

// get focus by prof followed
export const get_focuses_recomande_Action = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`focus/recomand/${id}/`);
    if (res) {
      dispatch(GET_FOCUS_RECOMMANDE_REDUCER(res.data));
      return res.data;
    }
  };
};

// focus comment
export const post_focus_comment_Action = (formdata) => {
  return async () => {
    const res = await instanceAxios.post("create-comment/", formdata);
    if (res) {
      return res.data;
    }
  };
};

// focus comment
export const get_all_focus_comment_Action = (focus_id) => {
  return async () => {
    const res = await instanceAxios.get(`list-all-comment/${focus_id}/`);
    if (res) {
      return res.data;
    }
  };
};

//  get all focus by category of prof id
export const get_all_focus_ofProf_byCategory_Action = (focus_id, category) => {
  return async () => {
    const res = await instanceAxios.get(
      `focus/allofprof/${category}/${focus_id}/`
    );
    if (res) {
      return res.data;
    }
  };
};

//  get all focus by category of prof id
export const get_focus_search = (searchQuery) => {
  return async () => {
    const res = await instanceAxios.get(`focus/search?q=${searchQuery}`);
    return res;
  };
};

//  get all focus by category of prof id
export const get_focus_ofProf_followByPro = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/focus/${id}/`);
    if(res){
      dispatch(GET_FOCUS_FOLLOW_REDUCER(res.data));
    }
    return res;
  };
};
