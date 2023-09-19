import axios from "axios";
import instanceAxios from "../Helpers/InstanceAxios";
import { API_BASE_URL } from "../Helpers/ServiceApi";

import {
  LOGIN_USER_REDUCER,
  GET_USER_INFO_REDUCER,
  GET_ID_USER_REDUCER,
  REFRESH_TOKEN_REDUCER,
  UPLOAD_USER_IMG_REDUCER,
  GET_ALL_USERS_REDUCER,
  LOGOUT_USERS_REDUCER,
  setOtp,
  GET_PROF_FOLLOWER_ByUSER_REDUCER,
} from "../Reducers/ReducerUser";

import {
  GET_ONE_PROF_REDUCER,
  GET_ALL_PROFLIST_REDUCER,
  GET_PROF_FOLLOW_REDUCER,
  GET_PROF_SAMECATEGORY_REDUCER,
  GET_PROF_POPULAIRE_REDUCER,
} from "../Reducers/ReduceProfesssionnel";

// Sign In
export const signupUserAction = (form) => {
  return async () => {
    const res = await instanceAxios.post("/signup", form);
    return res;
  };
};

// login users
export const loginAction = (form) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/login", form);
    dispatch(LOGIN_USER_REDUCER(res.data));
    return res;
  };
};

// get id of user
export const getIdUserAction = (token) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/decodeToken/", token);
    if (res) {
      dispatch(GET_ID_USER_REDUCER(res.data));
      return res.data;
    }
  };
};

// get id of user
export const refreshTokenAction = (refresh) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/refresh/", refresh);
    if (res) {
      dispatch(REFRESH_TOKEN_REDUCER(res.data));
      return res.data;
    }
  };
};

//get user info
export const getUserInfoAction = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/users/${id}/`);
    if (res) {
      dispatch(GET_USER_INFO_REDUCER(res.data));
      return res.data;
    }
  };
};

//s'abonne
export const getUserInfoByTokenAction = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/user/info/", formdata);
    if (res) {
      dispatch(GET_USER_INFO_REDUCER(res.data));
      return res;
    }
  };
};

//s'abonne
export const userFollowerAction = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/follower/", formdata);
    if (res.status === 200) {
      dispatch(GET_ONE_PROF_REDUCER(res.data));
    }
    return res;
  };
};

//s'abonne
export const userUnFollowerAction = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/unFollowUser/", formdata);
    if (res.status === 200) {
      dispatch(GET_ONE_PROF_REDUCER(res.data));
    }
    return res;
  };
};

export const post_follower_user_all_Action = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/follower/all/prof/", formdata);
    if (res.status === 200) {
      dispatch(GET_ALL_PROFLIST_REDUCER(res.data.allProf));
      dispatch(GET_PROF_FOLLOW_REDUCER(res.data.profFollow));
      dispatch(GET_PROF_POPULAIRE_REDUCER(res.data.profpopulaire));
      dispatch(GET_PROF_SAMECATEGORY_REDUCER(res.data.profRecommande));
    }
    return res;
  };
};

export const post_unfollower_user_all_Action = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post("/unfollower/all/prof/", formdata);

    if (res.status === 200) {
      dispatch(GET_ALL_PROFLIST_REDUCER(res.data.allProf));
      dispatch(GET_PROF_FOLLOW_REDUCER(res.data.profFollow));
      dispatch(GET_PROF_POPULAIRE_REDUCER(res.data.profpopulaire));
      dispatch(GET_PROF_SAMECATEGORY_REDUCER(res.data.profRecommande));
    }
    return res;
  };
};

//get user info
export const putUserInfoAction = (id, formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/users/${id}/`, formdata);
    if (res) {
      dispatch(GET_USER_INFO_REDUCER(res.data));
      return res.data;
    }
  };
};

export const uploadImageAction = (formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios.post(`/user-image/`, formdata);
    if (res) {
      dispatch(UPLOAD_USER_IMG_REDUCER(res.data));
      return res.data;
    }
  };
};

//get user info
export const updateUserInfoAction = (id, formdata) => {
  return async (dispatch) => {
    const res = await instanceAxios
      .put(`/users/${id}/`, formdata)
      .then((res) => {
        dispatch(GET_USER_INFO_REDUCER(res.data));
      });
    return res;
  };
};

//get user info
export const verifyEmailAction = async (email) => {
  return await axios.post(`${API_BASE_URL}/verify-email/`, { email: email });
};

//get user info
export const verifyUsernameAction = async (username) => {
  return await axios.post(`${API_BASE_URL}/verify-username/`, {
    username: username,
  });
};

// login avec socio
export const loginWithSocio = (formdata) => {
  return async () => {
    const res = await instanceAxios.post(`/login-socio/`, formdata);
    return res;
  };
};

// login with linkedin
export const loginWithLinkedinAction = (formdata) => {
  return async () => {
    const res = await instanceAxios.post(`/linkedin-access-token/`, formdata);
    return res;
  };
};

//get all user info
export const getAllUserInfoAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`users/`);
    if (res) {
      dispatch(GET_ALL_USERS_REDUCER(res.data));
    }
    return res.data;
  };
};

//get all user info
export const logoutUserInfoAction = () => {
  return async (dispatch) => {
    dispatch(LOGOUT_USERS_REDUCER());
  };
};

//Forgot password
export const getEmailToSendOtp = (formData) => {
  return async (dispatch) => {
    const data = await instanceAxios.post(`/send-otp/`, formData);
    dispatch(
      setOtp({
        email: data.data.email,
        expiration: data.data.expiration,
        otp: data.data.otp,
        otp_hashed: data.data.otp_hashed,
      })
    );
    return data;
  };
};

export const verifyOtp = (formData) => {
  return async (dispatch) => {
    const data = await instanceAxios.post(`/verify-otp/`, formData);
    dispatch(
      setOtp({
        email: data.data.email,
        expiration: data.data.expiration,
        otp: data.data.otp,
        otp_hashed: data.data.otp_hashed,
      })
    );
    return data;
  };
};

export const resetPassword = (formData) => {
  return async () => {
    const data = await instanceAxios.patch(`/reset-password/`, formData);
    return data;
  };
};

// get professionnel fllower par l'user
export const getProfFollowedByUser = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`/followers/${id}/`);
    if (res) {
      dispatch(GET_PROF_FOLLOWER_ByUSER_REDUCER(res.data));
      return res.data;
    }
  };
};

// get user by matricule
export const get_user_by_matricule_action = (matricule) => {
  return async () => {
    const res = await instanceAxios.get(`/user-matricule/${matricule}/`);
    return res.data;
  };
};

// get user following
export const get_user_following_action = (id) => {
  return async () => {
    const res = await instanceAxios.get(`/user-following/${id}/`);
    return res.data;
  };
};