import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import ListUser from "../components/ListUser";
import MessageChatField from "../components/MessageChatField";
import "../../Community/Pages/Styles/Community.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProfFollwing } from "../../../Actions/ActionProf";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import LayoutDashboard from "../../../Professionnel/Layout/LayoutDashboard";
import { GET_PROF_FOLLOWER_ByUSER } from "../../../Reducers/ReducerUser";
import { GET_PROF_FOLLOWING } from "../../../Reducers/ReduceProfesssionnel";
import { getProfFollowedByUser } from "../../../Actions/actionAuth";
import {
  // auto_read_all_action,
  getConversationsAction,
} from "../../../Actions/ActionMessage";
import { AppContext } from "../../../Context/AppContext";
import { useWebsocketMessage } from "../../../Context/WebsocketContext";
import { BaseURL } from "../../../Helpers/ServiceApi";

function Chat() {
  const socketMessage = useWebsocketMessage();

  const { Uuid } = useContext(AppContext);

  const profFollowByUser = useSelector(GET_PROF_FOLLOWER_ByUSER);
  const profFollowing = useSelector(GET_PROF_FOLLOWING);
  const userID = useSelector(GET_USER_INFO_CONNECT);
  // const userTypeUrl =
  //   userID?.fonction === "Professionnel"
  //     ? `/professionnel/messages/:matricule`
  //     : `/etudiant/messages/:matricule`;
  const user_matricule = useParams("/:fonction/messages/:matricule").matricule;
  const userDetected = userID?.fonction === "Professionnel";

  const filterMap = userDetected ? profFollowing : profFollowByUser;

  const user_filter = filterMap.filter(
    (prof) =>
      (userDetected ? prof?.follower.matricule : prof?.user.matricule) ===
      user_matricule
  );

  const [userDetMessage, setUserDetMessage] = useState(
    userDetected ? user_filter[0]?.follower : user_filter[0]?.user
  );

  // const [baseFile, setbaseFile] = useState(false);
  // const { messages, setMessages, socket } = useContext(AppContext);

  const [fileContent, setFileContent] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
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

  useEffect(() => {
    const fetchProfessorsData = async () => {
      if (userDetected && Uuid !== null) {
        const fetchedProfessors = await dispatch(getProfFollwing(Uuid));
       
        const user_filter = fetchedProfessors.filter(
          (prof) => prof.follower?.matricule === user_matricule
        );

        if (user_filter.length > 0) {
          setUserDetMessage(
            userDetected ? user_filter[0]?.follower : user_filter[0]?.user
          );
        }
      } else {
        if (Uuid !== null) {
          dispatch(getProfFollowedByUser(Uuid));

          const fetchedProfessors = await dispatch(getProfFollowedByUser(Uuid));

          const user_filter = fetchedProfessors.filter(
            (prof) => prof?.user?.matricule === user_matricule
          );

          if (user_filter.length > 0) {
            setUserDetMessage(
              userDetected ? user_filter[0]?.follower : user_filter[0]?.user
            );
          }
        }
      }
    };

    fetchProfessorsData();
  }, [dispatch, user_matricule, userDetected, userID?.id]);

  useEffect(() => {
    if (user_filter.length > 0) {
      setUserDetMessage(
        userDetected ? user_filter[0]?.follower : user_filter[0]?.user
      );
    } else {
      setUserDetMessage({});
    }
  }, [userDetected]);

  useEffect(() => {
    if (socketMessage) {
      socketMessage.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
        // setbaseFile(true);
      };
    }
  }, [socketMessage]);

  useEffect(() => {
    const fetchMessagesFromServer = async () => {
      if (userDetMessage) {
        // getConversationsAction
        if (user_filter.length > 0) {
          const fetchedMessages = await dispatch(
            getConversationsAction(
              userDetected
                ? user_filter[0]?.follower?.id
                : user_filter[0]?.user?.id,
              userID?.id
            )
          );

          setMessages(fetchedMessages);
        }
      }
    };

    fetchMessagesFromServer();
  }, [
    userDetected ? user_filter[0]?.follower.id : user_filter[0]?.user.id,
    userID?.id,
  ]);

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
          user_sender: userID?.id,
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
          user_sender: userID?.id,
          user_recipient: userDetMessage?.id,
          file: messageFile,
          timestamp: getCurrentDate(),
        };
        console.log(data);
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
          user_sender: userID?.id,
          user_recipient: userDetMessage?.id,
          timestamp: getCurrentDate(),
        };
      } else {
        data = {
          message: message,
          user_sender: userID?.id,
          user_recipient: userDetMessage?.id,
          timestamp: getCurrentDate(),
        };
      }
      socketMessage.send(JSON.stringify(data));
      setMessage("");
    }
  };

  // useEffect(() => {
  //   if(userID.id && userDetMessage.id){
  //     const fromdata = {
  //       user_recipient_id: userDetMessage?.id,
  //       user_sender_id: userID?.id,
  //     };
  //     dispatch(auto_read_all_action(fromdata));
  //   }
  // }, []);

  return (
    <>
      {userDetected ? (
        <LayoutDashboard>
          <div className="all-community-message">
            <div className="communaute">
              <ListUser
                profs={profFollowing}
                baseUrl={BaseURL}
                userID={userID}
                userDetMessage={userDetMessage}
                userDetected={userDetected}
                setUserDetMessage={setUserDetMessage}
              />
            </div>
            <div className="box-messaging">
              <MessageChatField
                handleMessageSubmit={handleSubmit}
                userID={userID}
                baseUrl={BaseURL}
                userDetMessage={userDetMessage}
                user_matricule={user_matricule}
                messages={messages}
                message={message}
                setMessageContent={setMessage}
                fileContent={fileContent}
                setFileContent={setFileContent}
              />
            </div>
          </div>
        </LayoutDashboard>
      ) : (
        <LayoutEtudiant>
          <div className="all-community-message">
            <div className="communaute">
              <ListUser
                profs={profFollowByUser}
                baseUrl={BaseURL}
                userID={userID}
                userDetMessage={userDetMessage}
                setUserDetMessage={setUserDetMessage}
                // newMessage={newMessage}
              />
            </div>
            <div className="box-messaging">
              <MessageChatField
                handleMessageSubmit={handleSubmit}
                userID={userID}
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
      )}
    </>
  );
}
export default Chat;
