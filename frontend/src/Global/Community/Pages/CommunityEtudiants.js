import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllCommunityContainerUserAction,
  getConversationsCommunityAction,
  getOneCommunityAction,
} from "../../../Actions/ActionCommunity";
import { GET_ALL_COMMUNITY_CONTAINER_USER } from "../../../Reducers/ReducerCommunity";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import ListCommunity from "../Components/ListCommunity";
import MessageGroup from "../Components/MessageGroup";
import "./Styles/Community.scss";
import { API_WEBSoCKET } from "../../../Helpers/ServiceApi";

const CommunityEtudiants = () => {
  const allGroupeContainerUser = useSelector(GET_ALL_COMMUNITY_CONTAINER_USER);
  const user_connecte = useSelector(GET_USER_INFO_CONNECT);
  const [GroupDestMessage, setGroupDestMessage] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const group_id = useParams().id;
  const dispatch = useDispatch();

  //   get  community
  useEffect(() => {
    if (group_id) {
      dispatch(getOneCommunityAction(group_id)).then((data) => {
        setGroupDestMessage(data);
      });
    }
  }, [dispatch, group_id]);

  //   connect socket of message group
  useEffect(() => {
    const newSocket = new WebSocket(
      `${API_WEBSoCKET}/chat/messagegroupe/${group_id}/`
    );
    setSocket(newSocket);
    newSocket.onopen = () => console.log("WebSocket connected message group");
    newSocket.onclose = () => console.log("WebSocket disconnected");

    return () => {
      newSocket.close();
    };
  }, [group_id]);

  //   socket responae of message
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (group_id === data?.to_groupe) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      };
    }
  }, [socket]);

  //   get all community container of user
  useEffect(() => {
    if (user_connecte.id) {
      dispatch(getAllCommunityContainerUserAction(user_connecte.id));
    }
  }, [dispatch, user_connecte]);

  //   get Conversations Community Action
  useEffect(() => {
    if (group_id) {
      dispatch(getConversationsCommunityAction(group_id)).then((data) => {
        setMessages(data);
      });
    }
  }, [group_id]);

  // get Current Date
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  // handle submit the message
  const handleSubmit = (event) => {
    event.preventDefault();

    if (fileContent && message.trim() !== "" && socket) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileContent);
      fileReader.onload = () => {
        const messageFile = {
          name: fileContent.name,
          type: fileContent.type,
          size: fileContent.size,
          data: fileReader.result,
        };

        const data = {
          message: message,
          user_sender: user_connecte.id,
          groupe_recipient: group_id,
          file: messageFile,
          timestamp: getCurrentDate(),
        };
        socket.send(JSON.stringify(data));
        setMessage("");
        setFileContent(null);
      };
    } else if (fileContent && socket) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileContent);
      fileReader.onload = () => {
        const messageFile = {
          name: fileContent.name,
          type: fileContent.type,
          size: fileContent.size,
          data: fileReader.result,
        };
        const data = {
          user_sender: user_connecte.id,
          groupe_recipient: group_id,
          file: messageFile,
          timestamp: getCurrentDate(),
        };
        socket.send(JSON.stringify(data));
        setMessage("");
        setFileContent(null);
      };
    } else if (message && socket) {
      const data = {
        message: message,
        user_sender: user_connecte.id,
        groupe_recipient: group_id,
        timestamp: getCurrentDate(),
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };


  return (
        <LayoutEtudiant>
          <div className="all-community-message">
            <div className="communaute">
              <ListCommunity
                community={allGroupeContainerUser}
                user={user_connecte}
                GroupDestMessage={GroupDestMessage}
                setGroupDestMessage={setGroupDestMessage}
                userDetected={false}
              />
            </div>
            <div className="box-messaging">
              <MessageGroup
                handleMessageSubmit={handleSubmit}
                userID={user_connecte}
                GroupDestMessage={GroupDestMessage}
                messages={messages}
                message={message}
                setMessageContent={setMessage}
                fileContent={fileContent}
                setFileContent={setFileContent}
              />
            </div>
          </div>
        </LayoutEtudiant>
  );
};

export default CommunityEtudiants;
