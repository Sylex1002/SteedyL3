import instanceAxios from "../Helpers/InstanceAxios";
import {
    GET_HIGHLIGHT24H_REDUCER,
    GET_MY_HIGHLIGHT_REDUCER,
    GET_ONE_HIGHLIGHT_REDUCER,
    GET_ALL_HIGHLIGHT_REDUCER, 
    GET_HIGHLIGHT_UNVIEW_REDUCER,
    GET_HIGHLIGHT_FOLLOW_REDUCER,
} from "../Reducers/ReducerHighlight";

export const getAllHighlightAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get("/highlight/");
    if (res) {
      dispatch(GET_ALL_HIGHLIGHT_REDUCER(res.data));
      return res.data;
    }
  };
};

// Ajouter un highlight
export const addHighlightAction = (formData) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("highlight_img/", formData);
    if (res) {
      dispatch(GET_ONE_HIGHLIGHT_REDUCER(res.data));
    }
    return res;
  };
};

// Supprimer un highlight
export const deleteHighlightAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.delete(`highlight_del/${id}/`);
    if (res) {
      dispatch(GET_ONE_HIGHLIGHT_REDUCER(res.data));
      return res.data;
    }
  };
};

// Highlight vue
export const viewHighlightAction = (form) => {
  return async (dispatch) => {
    const res = await instanceAxios.post(`highlight/new/view/`, form);
    if (res) {
      dispatch(GET_ONE_HIGHLIGHT_REDUCER(res.data));
      return res.data;
    }
  };
};

// Highlight vue
export const likeHighlightAction = (form) => {
  return async (dispatch) => {
    const res = await instanceAxios.post(`highlight/new/like/`, form);
    if (res) {
      dispatch(GET_ONE_HIGHLIGHT_REDUCER(res.data));
      return res.data;
    }
  };
};

export const getHighlight24HAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`highlight/last/${id}/`);
    if (res) {
      dispatch(GET_HIGHLIGHT24H_REDUCER(res.data));
      return res.data;
    }
  };
};

export const getHighlightFollowAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`highlight/follow/${id}/`);
    if (res) {
      dispatch(GET_HIGHLIGHT_FOLLOW_REDUCER(res.data));
      return res.data;
    }
  };
};

export const getAllHighLightProfAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`highlight_get/${id}/`);
    if (res) {
      dispatch(GET_MY_HIGHLIGHT_REDUCER(res.data));
      return res.data;
    }
  };
};

export const getAllHighLightUnViewedfAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`highlight/unviewed/${id}/`);
    if (res) {
      dispatch(GET_HIGHLIGHT_UNVIEW_REDUCER(res.data));
      return res.data;
    }
  };
};

export const get_search_highlight_action = (searchQuery) => {
  return async () => {
    const res = await instanceAxios.get(`highlight/search?q=${searchQuery}`);
    return res;
  };
};

export const like_filter_highlight_action = (data) => {
  return async (dispatch) => {
    dispatch(GET_HIGHLIGHT_UNVIEW_REDUCER(data));
  };
};

export const get_one_highlight_action = (id) => {
  return async () => {
    const res = await instanceAxios.get(`highlight/one/${id}/`);
    return res.data;
  };
};


export const get_highlight_ofProf_followByPro = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`professionnels/highlight/${id}/`);
    if(res){
      dispatch(GET_HIGHLIGHT_FOLLOW_REDUCER(res.data));
    }
    return res;
  };
};
