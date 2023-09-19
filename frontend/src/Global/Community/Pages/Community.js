import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCommunityContainerUserAction } from "../../../Actions/ActionCommunity";
import { GET_ALL_COMMUNITY_CONTAINER_USER } from "../../../Reducers/ReducerCommunity";
import LayoutDashboard from "../../../Professionnel/Layout/LayoutDashboard";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import { BaseURL } from "../../../Helpers/InstanceAxionsAdmin";
import ListCommunity from "../Components/ListCommunity";
import MessageGroup from "../Components/MessageGroup";
import "./Styles/Community.scss";
import axios from "axios";

const Community = () => {
  const userID = useSelector(GET_USER_INFO_CONNECT);
  const userDetected = userID?.fonction === "Professionnel";
  const allGroupeContainerUser = useSelector(GET_ALL_COMMUNITY_CONTAINER_USER);
  const group_id = useParams().id;
  const groupe_filter = allGroupeContainerUser.filter(
    (group) => group?.id === group_id
  );
  const [GroupDestMessage, setGroupDestMessage] = useState(groupe_filter);
  const [fileContent, setFileContent] = useState(null);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [unreadMessages, setUnreadMessages] = useState({});
  const [newMessageCount, setNewMessageCount] = useState(0);

  const dispatch = useDispatch();

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

  // const markAllMessagesAsRead = async (groupId) => {
  //   try {
  //     await axios.post(`http://localhost:8000/api/mark_all_messages_as_read/${groupId}/`);
  //     setNewMessageCount(0); // Réinitialiser le compteur de nouveaux messages
  //   } catch (error) {
  //     console.error('Error marking messages as read:', error);
  //   }
  // };

  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://localhost:8000/ws/chat/messagegroupe/messageGroupe/`
    );
    setSocket(newSocket);
    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");

    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    if (JSON.stringify(groupe_filter) !== JSON.stringify(GroupDestMessage)) {
      setGroupDestMessage(groupe_filter);
    }
  }, [groupe_filter, GroupDestMessage, dispatch, userID?.id]);


  
  useEffect(() => {
    const fetchGroupsDataGroupe = async () => {
      const fetchedPGroupes = await dispatch(
        getAllCommunityContainerUserAction(userID.id)
      );
      const groupe_filter = fetchedPGroupes.filter(
        (group) => group.id.toString() === group_id
      );
      if (groupe_filter[0]?.id !== GroupDestMessage.id) {
        setGroupDestMessage(groupe_filter);
      }
    };
    fetchGroupsDataGroupe();
  }, [dispatch, group_id]);

  const fetchMessages = async (groupId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get_conversationsGroupe/${groupId}/`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMessagesFromServer = async () => {
      if (GroupDestMessage && GroupDestMessage.length > 0) {
        const groupId = GroupDestMessage[0]?.id;
        const fetchedMessages = await fetchMessages(groupId);
        setMessages(fetchedMessages);
      }
    };
    fetchMessagesFromServer();
  }, [GroupDestMessage[0]?.id]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (GroupDestMessage[0]?.id === data?.groupe_recipient) {
          setMessages((prevMessages) => [...prevMessages, data]);
          setNewMessageCount((prevCount) => prevCount + 1);
        }
      };
    }
  }, [socket, GroupDestMessage[0]?.id, allGroupeContainerUser]);

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
          user_sender: userID,
          groupe_recipient: GroupDestMessage[0]?.id,
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
          user_sender: userID,
          groupe_recipient: GroupDestMessage[0]?.id,
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
        user_sender: userID,
        groupe_recipient: GroupDestMessage[0]?.id,
        timestamp: getCurrentDate(),
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };

  return (
    <>
      {userDetected ? (
        <LayoutDashboard>
          <div className="all-community-message">
            <div className="communaute">
              <ListCommunity
                community={allGroupeContainerUser}
                user={userID}
                fetchMessages={fetchMessages}
                GroupDestMessage={GroupDestMessage}
                setGroupDestMessage={setGroupDestMessage}
                userDetected={userDetected}
                // unreadMessages={unreadMessages}
                newMessageCount={newMessageCount}
                // markAllMessagesAsRead={markAllMessagesAsRead}
              />
            </div>
            <div className="box-messaging">
              <MessageGroup
                handleMessageSubmit={handleSubmit}
                userID={userID}
                baseUrl={BaseURL}
                GroupDestMessage={GroupDestMessage}
                messages={messages}
                message={message}
                setMessageContent={setMessage}
                fileContent={fileContent}
                userDetected={userDetected}
                setFileContent={setFileContent}
                // markMessagesAsRead={markAllMessagesAsRead}
              />
            </div>
          </div>
        </LayoutDashboard>
      ) : (
        <LayoutEtudiant>
          <div className="all-community-message">
            <div className="communaute">
              <ListCommunity
                community={allGroupeContainerUser}
                user={userID}
                fetchMessages={fetchMessages}
                GroupDestMessage={GroupDestMessage}
                setGroupDestMessage={setGroupDestMessage}
                userDetected={userDetected}
                // unreadMessages={unreadMessages}
                // markAllMessagesAsRead={markAllMessagesAsRead}
              />
            </div>
            <div className="box-messaging">
              <MessageGroup
                handleMessageSubmit={handleSubmit}
                userID={userID}
                baseUrl={BaseURL}
                GroupDestMessage={GroupDestMessage}
                messages={messages}
                message={message}
                setMessageContent={setMessage}
                fileContent={fileContent}
                setFileContent={setFileContent}
                // unreadMessages={unreadMessages}
                // markAllMessagesAsRead={markAllMessagesAsRead}
              />
            </div>
          </div>
        </LayoutEtudiant>
      )}
    </>
  );
};

export default Community;
