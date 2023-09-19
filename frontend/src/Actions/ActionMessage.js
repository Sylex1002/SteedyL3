import InstanceAxios from "../Helpers/InstanceAxios";
import {
  GET_ETTUDIANT_MESSAGE_LISTE_REDUCER,
  GET_PROFESSIONNEL_MESSAGE_LISTE_REDUCER,
} from "../Reducers/ReducerMessage";
import { GET_ALL_NOTIFICATE_MESSAGE_REDUCER } from "../Reducers/ReducerNotification";

export const getConversationsAction = (recipientId, senderId) => {
  return async () => {
    const res = await InstanceAxios.get(
      `/get_conversations/${recipientId}/${senderId}/`
    );
    return res.data;
  };
};

export const message_action = (id) => {
  return async () => {
    const res = await InstanceAxios.get(`/messages/${id}/`);
    return res.data;
  };
};

export const Notif_message_action_etudiant = (id) => {
  return async (dispatch) => {
    const res = await InstanceAxios.get(
      `/notification-messages-etudiant/${id}/`
    );
    if (res) {
      // add etudiant message liste
      dispatch(GET_ETTUDIANT_MESSAGE_LISTE_REDUCER(res.data));
      // algor
      const messageData = [...res.data];
      const folterMessage = messageData.filter(
        (item) => item.message.length > 0
      );

      // add in reduc
      folterMessage.forEach((msg) => {
        dispatch(GET_ALL_NOTIFICATE_MESSAGE_REDUCER(msg.user.id));
      });
    }
    return res.data;
  };
};

export const Notif_message_action_prof = (id) => {
  return async (dispatch) => {
    const res = await InstanceAxios.get(`/notification-messages-prof/${id}/`);
    if (res) {
      dispatch(GET_PROFESSIONNEL_MESSAGE_LISTE_REDUCER(res.data));

      // algor 
      const messageData = [...res.data];
      const folterMessage = messageData.filter(
        (item) => item.message.length > 0
      );
      // add in reduc
      folterMessage.forEach((msg) => {
        dispatch(GET_ALL_NOTIFICATE_MESSAGE_REDUCER(msg.user.id));
      });
    }
    return res.data;
  };
};


// all read
export const auto_read_all_action = (formdata) => {
  return async () => {
    const res = await InstanceAxios.post(`/message-all-read/`,formdata);
    return res.data;
  };
};

// delete conversaton
export const delete_Conversations_Action = (recipientId, senderId) => {
  return async () => {
    // senderId= user connecte
    const res = await InstanceAxios.delete(
      `/delete-conversations/${recipientId}/${senderId}/`
    );
    
    return res;
  };
};

// get my  conversation
export const get_all_my_conversation_action = (id) => {
  return async () => {
    const res = await InstanceAxios.get(`/conversations/${id}/`);
    return res.data;
  };
};
