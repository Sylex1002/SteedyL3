import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { useParams } from "react-router-dom";
import ListUser from "../components/ListUser";
import { BaseURL } from "../../../Helpers/ServiceApi";
import { useDispatch, useSelector } from "react-redux";
import MessageChatField from "../components/MessageChatField";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import { get_user_by_matricule_action } from "../../../Actions/actionAuth";
import { useWebsocketMessage } from "../../../Context/WebsocketContext";
import { GET_HIGHLIGHT_UNVIEWED } from "../../../Reducers/ReducerHighlight";
import { getAllHighLightUnViewedfAction } from "../../../Actions/ActionHighlight";
import {
  auto_read_all_action,
  getConversationsAction,
  get_all_my_conversation_action,
} from "../../../Actions/ActionMessage";
import { DELETE_NOTIFICATE_MESSAGE_BYID_REDUCER } from "../../../Reducers/ReducerNotification";

export default function MessageEtudiant() {
  const { Uuid } = useContext(AppContext);
  const socketMessage = useWebsocketMessage();
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const user_matricule = useParams("/etudiant/messages/:matricule").matricule;

  // highlight
  const highlight_unviewed = useSelector(GET_HIGHLIGHT_UNVIEWED);

  //state
  const [userDetMessage, setUserDetMessage] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();

  // auto read message
  useEffect(() => {
    if (userDetMessage && user_connect) {
      if (userDetMessage.id && user_connect.id) {
        // form data
        const formdata = {
          user_recipient_id: userDetMessage.id,
          user_sender_id: user_connect.id,
        };
        // dispatch read auto
        dispatch(auto_read_all_action(formdata));
        dispatch(DELETE_NOTIFICATE_MESSAGE_BYID_REDUCER(userDetMessage.id));
      }
    }
  }, [userDetMessage, user_connect]);

  // get all of my conversation
  useEffect(() => {
    if (user_connect.id) {
      dispatch(get_all_my_conversation_action(user_connect.id)).then((res) => {
        setConversations(res);
      });
    }
  }, [dispatch, user_connect, messages]);

  // get user getter by matrcule
  useEffect(() => {
    if (user_matricule) {
      dispatch(get_user_by_matricule_action(user_matricule)).then((data) => {
        setUserDetMessage(data);
      });
    }
  }, [dispatch, user_matricule]);

  //   fetch conversetion
  useEffect(() => {
    const fetchMessagesFromServer = async () => {
      // get Conversations Action
      if (user_connect.id) {
        const fetchedMessages = await dispatch(
          getConversationsAction(user_matricule, user_connect.id)
        );
        setMessages(fetchedMessages);
      }
    };

    fetchMessagesFromServer();
  }, [user_matricule, user_connect]);

  // HIGHLIGHT
  useEffect(() => {
    if (Uuid !== null) {
      // ========HIGHLIGHT=======
      dispatch(getAllHighLightUnViewedfAction(Uuid));
    }
  }, [dispatch, Uuid]);

  //   socket of message
  useEffect(() => {
    if (socketMessage) {
      socketMessage.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    }
  }, [socketMessage]);

  //   send message
  const handleSubmit = (event) => {
    event.preventDefault();

    if (fileContent && message.trim() !== "" && socketMessage) {
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
          user_sender: user_connect?.id,
          user_recipient: userDetMessage?.id,
          file: messageFile,
          timestamp: getCurrentDate(),
        };
        socketMessage.send(JSON.stringify(data));
        // setbaseFile(true);
        setMessage("");
        setFileContent(null);
      };
    } else if (fileContent && socketMessage) {
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
          user_sender: user_connect?.id,
          user_recipient: userDetMessage?.id,
          file: messageFile,
          timestamp: getCurrentDate(),
        };
        socketMessage.send(JSON.stringify(data));
        // setbaseFile(true);
        setMessage("");
        setFileContent(null);
      };
    } else if (message && socketMessage) {
      // Check if message is a valid URL
      const urlPattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/;
      const isURL = urlPattern.test(message);

      let data;

      if (isURL) {
        const linkMessage = message;
        data = {
          message: linkMessage,
          user_sender: user_connect?.id,
          user_recipient: userDetMessage?.id,
          timestamp: getCurrentDate(),
        };
      } else {
        data = {
          message: message,
          user_sender: user_connect?.id,
          user_recipient: userDetMessage?.id,
          timestamp: getCurrentDate(),
        };
      }
      socketMessage.send(JSON.stringify(data));
      setMessage("");
    }
  };

  //   get current Data
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

  return (
    <LayoutEtudiant>
      <div className="all-community-message">
        <div className="communaute">
          <ListUser
            userDetMessage={userDetMessage}
            setUserDetMessage={setUserDetMessage}
            highlightList={highlight_unviewed}
            user_matricule={user_matricule}
            profsActive={false}
            fonction={"etudiant"}
            conversations={conversations}
          />
        </div>
        <div className="box-messaging">
          <MessageChatField
            handleMessageSubmit={handleSubmit}
            userID={user_connect}
            baseUrl={BaseURL}
            userDetMessage={userDetMessage}
            user_matricule={user_matricule}
            messages={messages}
            message={message}
            setMessageContent={setMessage}
            fileContent={fileContent}
            setFileContent={setFileContent}
            setMessages={setMessages}
          />
        </div>
      </div>
    </LayoutEtudiant>
  );
}
