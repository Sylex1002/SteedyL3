import instanceAxios from "../Helpers/InstanceAxios";
import { DELETE_COMMUNITY_EN_ATTENT_REDUCER } from "../Reducers/ReducerCommunity";
import {
  DELETE_ONE_NOTIFICATE_REDUCER,
  FILTER_NOTIFICATE_VIEWED_REDUCER,
  GET_ALL_NOTIFICATE_REDUCER,
  GET_ALL_NOTIFICATE_VIEWED_REDUCER,
  PUSH_NOTIFICATE_MESSAGE_REDUCER,
  PUSH_NOTIFICATE_REDUCER,
  PUSH_NOTIFICATE_VIEWED_REDUCER,
} from "../Reducers/ReducerNotification";

// Get all notifications
export const getAllNotificationAction = () => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`all_notifications/`);
    if (res) {
      dispatch(GET_ALL_NOTIFICATE_REDUCER(res.data));
      return res.data;
    }
  };
};

//
export const readNotificationAction = (id, formData) => {
  return async (dispatch) => {
    const res = await instanceAxios.patch(`read_notification/${id}/`, formData);
    if (res) {
      dispatch(GET_ALL_NOTIFICATE_REDUCER(res.data));
      // focus viewed
      let notification = [...res.data];
      const noti_viewd = notification.filter((item) => item.read === false);
      dispatch(GET_ALL_NOTIFICATE_VIEWED_REDUCER(noti_viewd));
    }
    return res.data;
  };
};

export const get_my_ntotification = (id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`my_notification/${id}/`);
    if (res) {
      dispatch(GET_ALL_NOTIFICATE_REDUCER(res.data.all));
      // focus viewed view
      dispatch(GET_ALL_NOTIFICATE_VIEWED_REDUCER(res.data.view));
    }
    return res;
  };
};

export const update_notification_action = (data) => {
  return async (dispatch) => {
    //
    dispatch(PUSH_NOTIFICATE_REDUCER(data));
    //  notification read in false
    dispatch(PUSH_NOTIFICATE_VIEWED_REDUCER(data));
  };
};

export const delete_notification_action = (notificationId) => {
  return async (dispatch) => {
    const res = await instanceAxios.delete(
      `/delete-notification/${notificationId}/`
    );
    if (res.status === 204) {
      dispatch(DELETE_ONE_NOTIFICATE_REDUCER(notificationId));
    }
    return res.data;
  };
};

export const delete_notificate_AND_groupWaiting_action = (
  id_notif,
  id_group
) => {
  return async (dispatch) => {
    const res = await instanceAxios.delete(
      `del-notif-and-group/${id_notif}/${id_group}/`
    );

    if (res.status === 204) {
      dispatch(DELETE_ONE_NOTIFICATE_REDUCER(id_notif));
      dispatch(DELETE_COMMUNITY_EN_ATTENT_REDUCER(id_group));
      // notification viewd
      dispatch(FILTER_NOTIFICATE_VIEWED_REDUCER(id_notif));
    }
    return res.data;
  };
};

export const get_my_notification_msg_action = (user_id) => {
  return async (dispatch) => {
    const res = await instanceAxios.get(`get-notif-msg/${user_id}/`);
    if (res.status === 200) {
      const newData = [...res.data];
      newData.forEach((item) => {
        dispatch(PUSH_NOTIFICATE_MESSAGE_REDUCER(item));
      });
    }
    return res.data;
  };
};
