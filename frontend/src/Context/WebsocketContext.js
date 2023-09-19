// WebsocketContext.js - Contexte pour gérer le Websocket
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_WEBSoCKET } from "../Helpers/ServiceApi";
import PropTypes from "prop-types";
import { GET_USER_INFO_CONNECT } from "../Reducers/ReducerUser";
import { useSelector } from "react-redux";

// creation context
const WebsocketNotificationContext = createContext();
const WebsocketMessageContext = createContext();

// creation de hooks
export function useWebsocketNotification() {
  return useContext(WebsocketNotificationContext);
}

export function useWebsocketMessage() {
  return useContext(WebsocketMessageContext);
}

// creation provider of notification
export function WebsocketNotificationProvider({ children }) {
  const user = useSelector(GET_USER_INFO_CONNECT);
  const [socket, setSocket] = useState(null);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    if (user.id) {
      setUser_id(user.id);
    }
  }, [user]);

  // ======socket for notificatio====
  useEffect(() => {
    if (user_id) {
      const newSocket = new WebSocket(
        `${API_WEBSoCKET}/notification/${user_id}/`
      );

      newSocket.onopen = () => {
        console.log("Websocket connected");
      };

      newSocket.onclose = () => {
        console.log("Websocket disconnected");
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user_id]);

  return (
    <WebsocketNotificationContext.Provider value={socket}>
      {children}
    </WebsocketNotificationContext.Provider>
  );
}

// donne le type children
WebsocketNotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Websocket Message Provider
export function WebsocketMessageProvider({ children }) {
  const user = useSelector(GET_USER_INFO_CONNECT);
  const [socketMessage, setSocketMessage] = useState(null);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    if (user.id) {
      setUser_id(user.id);
    }
  }, [user]);

  // =======================socket for message=====================
  useEffect(() => {
    if (user_id) {
      const newSocket = new WebSocket(
        `${API_WEBSoCKET}/chat/messages/${user_id}/`
      );

      newSocket.onopen = () => {
        console.log("Websocket connected message");
      };

      newSocket.onclose = () => {
        console.log("Websocket disconnected message");
      };

      setSocketMessage(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user_id]);

  return (
    <WebsocketMessageContext.Provider value={socketMessage}>
      {children}
    </WebsocketMessageContext.Provider>
  );
}

// donne le type children
WebsocketMessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

//
export function WebsocketProvider({ children }) {
  return (
    <WebsocketNotificationProvider>
      <WebsocketMessageProvider>{children}</WebsocketMessageProvider>
    </WebsocketNotificationProvider>
  );
}
// donne le type children

WebsocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
