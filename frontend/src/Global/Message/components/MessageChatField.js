/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useRef, useState } from "react";
import List from "@mui/material/List";
import { Skeleton, Stack } from "@mui/material";
import Popover from "@mui/material/Popover";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import AlertDialog from "../Pages/ModalConfirmation";
import { dataParseHM } from "../../../Helpers/Utils";
import ListItemText from "@mui/material/ListItemText";
// import MicNoneIcon from "@mui/icons-material/MicNone";
import ListItemButton from "@mui/material/ListItemButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ShowMedia from "../../Community/Components/MediaList/ShowMedia";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import { BaseURL } from "../../../Helpers/ServiceApi";
import {  useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./style/message.scss";
import { motion } from "framer-motion";

function MessageChatField({
  messages,
  handleMessageSubmit,
  fileContent,
  message,
  setMessageContent,
  setFileContent,
  userDetMessage,
  setMessages,
}) {
  const [searchActiveMsg, setSearchActiveMsg] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const [searchValue, setSearchValue] = useState("");

  const handleActiveMsg = () => {
    setSearchValue("");
    setSearchActiveMsg(!searchActiveMsg);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const openMediaButton = () => {
    setShowMedia(true);
  };

  return (
    <div className="Message-content">
      <div className="box-message-etudiant">
        <div className="input-file">
          <div className="content-input">
            <div className="other-profil">
              <div className="other-profil-image">
                {userDetMessage && userDetMessage.image_url ? (
                  <img
                    src={`${BaseURL}${userDetMessage?.image_url}`}
                    alt="steedy-profil"
                    className="other-profil-image-content"
                  />
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={50}
                    height={50}
                  />
                )}
              </div>
              <div className="other-profil-username">
                {userDetMessage ? (
                  <span>
                    {" "}
                    {userDetMessage?.first_name} {userDetMessage?.last_name}
                  </span>
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={120}
                    height={20}
                  />
                )}
                {userDetMessage && <p>{userDetMessage.domain}</p>}
              </div>
            </div>
            <div className="search-content-msg">
              {searchActiveMsg && (
                <motion.div
                  initial={{ translateX: "60px" }}
                  animate={{ translateX: "0px" }}
                  transition={{ duration: 0.4 }}
                  exit={{ translateX: "100px" }}
                  className="content-search"
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Faire un recherche…"
                    style={{ borderRadius: 0 }}
                  />
                </motion.div>
              )}
            </div>
            <div className="menu-icon-message">
              <Stack direction="row" spacing={1}>
                <button
                  onClick={handleActiveMsg}
                  style={{
                    color: " #9b9b9b",
                    backgroundColor: "white",
                    border: "None",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22.5 21.4017L16.634 15.5357C18.0436 13.8434 18.7466 11.6728 18.5966 9.4754C18.4466 7.27803 17.4552 5.22307 15.8287 3.73803C14.2022 2.25298 12.0657 1.45218 9.86381 1.50221C7.6619 1.55224 5.56404 2.44926 4.00665 4.00665C2.44926 5.56404 1.55224 7.6619 1.50221 9.86381C1.45218 12.0657 2.25298 14.2022 3.73803 15.8287C5.22307 17.4552 7.27803 18.4466 9.4754 18.5966C11.6728 18.7466 13.8434 18.0436 15.5357 16.634L21.4017 22.5L22.5 21.4017ZM3.08127 10.072C3.08127 8.68938 3.49127 7.33779 4.25943 6.18817C5.02758 5.03855 6.11938 4.14253 7.39678 3.61341C8.67417 3.0843 10.0798 2.94586 11.4358 3.2156C12.7919 3.48534 14.0375 4.15114 15.0152 5.12882C15.9929 6.10649 16.6587 7.35212 16.9284 8.70819C17.1982 10.0643 17.0597 11.4699 16.5306 12.7473C16.0015 14.0246 15.1055 15.1165 13.9559 15.8846C12.8062 16.6528 11.4547 17.0628 10.072 17.0628C8.21859 17.0607 6.44166 16.3235 5.13109 15.0129C3.82051 13.7024 3.08333 11.9254 3.08127 10.072Z"
                      fill="#AFAFAF"
                    />
                  </svg>
                </button>
                <button
                  onClick={openMediaButton}
                  style={{
                    color: " #9b9b9b",
                    backgroundColor: "white",
                    border: "None",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.4285 3H5.57152C4.15131 3 3 4.15131 3 5.57152V18.4285C3 19.8487 4.15131 21 5.57152 21H18.4285C19.8487 21 21 19.8487 21 18.4285V5.57152C21 4.15131 19.8487 3 18.4285 3Z"
                      stroke="#AFAFAF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.42853 12C5.57141 12 4.28571 14.5714 3 14.5714"
                      stroke="#AFAFAF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.43164 12C13.2888 12 14.7717 14.5714 17.1459 14.5714"
                      stroke="#AFAFAF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.0014 13.2858C16.5014 13.2858 15.8585 17.1429 13.2871 17.1429"
                      stroke="#AFAFAF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.8586 10.7146C17.2788 10.7146 18.4301 9.56326 18.4301 8.14305C18.4301 6.72284 17.2788 5.57153 15.8586 5.57153C14.4384 5.57153 13.2871 6.72284 13.2871 8.14305C13.2871 9.56326 14.4384 10.7146 15.8586 10.7146Z"
                      stroke="#AFAFAF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  aria-describedby={id}
                  style={{
                    color: " #9b9b9b",
                    backgroundColor: "white",
                    border: "None",
                  }}
                  onClick={handleClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M14.0794 1.5C14.2382 1.50001 14.3929 1.55041 14.5212 1.64394C14.6495 1.73748 14.7448 1.86933 14.7934 2.0205L15.6184 4.584C15.9649 4.7535 16.2964 4.944 16.6129 5.1585L19.2469 4.5915C19.4022 4.55834 19.564 4.57534 19.7091 4.64003C19.8541 4.70473 19.9748 4.81379 20.0539 4.9515L22.1329 8.55C22.2123 8.68763 22.2459 8.84693 22.2289 9.0049C22.212 9.16288 22.1452 9.31139 22.0384 9.429L20.2309 11.424C20.2572 11.8065 20.2572 12.1905 20.2309 12.573L22.0384 14.571C22.1452 14.6886 22.212 14.8371 22.2289 14.9951C22.2459 15.1531 22.2123 15.3124 22.1329 15.45L20.0539 19.05C19.9746 19.1874 19.8538 19.2962 19.7088 19.3606C19.5638 19.425 19.4021 19.4418 19.2469 19.4085L16.6129 18.8415C16.2979 19.0545 15.9649 19.2465 15.6199 19.416L14.7934 21.9795C14.7448 22.1307 14.6495 22.2625 14.5212 22.3561C14.3929 22.4496 14.2382 22.5 14.0794 22.5H9.92141C9.76262 22.5 9.60793 22.4496 9.47962 22.3561C9.35131 22.2625 9.256 22.1307 9.20741 21.9795L8.38391 19.4175C8.03834 19.2485 7.70502 19.0555 7.38641 18.84L4.75391 19.4085C4.5986 19.4417 4.43679 19.4247 4.29176 19.36C4.14673 19.2953 4.02598 19.1862 3.94691 19.0485L1.86791 15.45C1.78852 15.3124 1.75489 15.1531 1.77188 14.9951C1.78886 14.8371 1.85558 14.6886 1.96241 14.571L3.76991 12.573C3.74372 12.1914 3.74372 11.8086 3.76991 11.427L1.96241 9.429C1.85558 9.31139 1.78886 9.16288 1.77188 9.0049C1.75489 8.84693 1.78852 8.68763 1.86791 8.55L3.94691 4.95C4.0262 4.81256 4.14704 4.70381 4.29205 4.63939C4.43706 4.57497 4.59877 4.55821 4.75391 4.5915L7.38641 5.16C7.70441 4.9455 8.03741 4.752 8.38391 4.5825L9.20891 2.0205C9.25734 1.86982 9.3522 1.73832 9.47991 1.64482C9.60762 1.55133 9.76163 1.50064 9.91991 1.5H14.0779H14.0794ZM13.5304 3H10.4704L9.61841 5.6505L9.04391 5.931C8.76148 6.06921 8.48885 6.22657 8.22791 6.402L7.69691 6.762L4.97291 6.174L3.44291 8.826L5.31041 10.893L5.26541 11.529C5.24385 11.8426 5.24385 12.1574 5.26541 12.471L5.31041 13.107L3.43991 15.174L4.97141 17.826L7.69541 17.2395L8.22641 17.598C8.48735 17.7734 8.75998 17.9308 9.04241 18.069L9.61691 18.3495L10.4704 21H13.5334L14.3884 18.348L14.9614 18.069C15.2435 17.9311 15.5157 17.7737 15.7759 17.598L16.3054 17.2395L19.0309 17.826L20.5609 15.174L18.6919 13.107L18.7369 12.471C18.7585 12.1569 18.7585 11.8416 18.7369 11.5275L18.6919 10.8915L20.5624 8.826L19.0309 6.174L16.3054 6.759L15.7759 6.402C15.5157 6.22622 15.2435 6.06884 14.9614 5.931L14.3884 5.652L13.5319 3H13.5304ZM12.0004 7.5C13.1939 7.5 14.3385 7.97411 15.1824 8.81802C16.0263 9.66193 16.5004 10.8065 16.5004 12C16.5004 13.1935 16.0263 14.3381 15.1824 15.182C14.3385 16.0259 13.1939 16.5 12.0004 16.5C10.8069 16.5 9.66234 16.0259 8.81843 15.182C7.97451 14.3381 7.50041 13.1935 7.50041 12C7.50041 10.8065 7.97451 9.66193 8.81843 8.81802C9.66234 7.97411 10.8069 7.5 12.0004 7.5ZM12.0004 9C11.2048 9 10.4417 9.31607 9.87909 9.87868C9.31648 10.4413 9.00041 11.2044 9.00041 12C9.00041 12.7956 9.31648 13.5587 9.87909 14.1213C10.4417 14.6839 11.2048 15 12.0004 15C12.7961 15 13.5591 14.6839 14.1217 14.1213C14.6843 13.5587 15.0004 12.7956 15.0004 12C15.0004 11.2044 14.6843 10.4413 14.1217 9.87868C13.5591 9.31607 12.7961 9 12.0004 9Z"
                      fill="#AFAFAF"
                    />
                  </svg>
                </button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <List>
                    <ListItemButton onClick={handleOpenModal}>
                      <ListItemText
                        primary="Supprimer la conversation"
                        onClick={handleClose}
                      />
                    </ListItemButton>
                  </List>
                </Popover>
                <AlertDialog
                  handleCloseModal={handleCloseModal}
                  openModal={openModal}
                  userID={user_connect}
                  userDetMessage={userDetMessage}
                  setMessages={setMessages}
                  messages={messages}
                />
              </Stack>
            </div>
          </div>
        </div>
        <div className="chat-log" ref={messagesEndRef}>
          {messages
            .filter((item) => {
              let newTem = [];

              {
                /* audio */
              }
              if (item.audio) {
                newTem = item.audio
                  .split("/")
                  .pop()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }

              {
                /* video */
              }
              if (item.video) {
                newTem = item.video
                  .split("/")
                  .pop()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }

              {
                /* fichier */
              }
              if (item.fichier) {
                newTem = item.fichier
                  .split("/")
                  .pop()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }

              {
                /* image */
              }
              if (item.image) {
                newTem = item.image
                  .split("/")
                  .pop()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }
              if (item.content) {
                newTem = item.content
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }

              return newTem;
            })
            .map((message, index) => (
              <MessageContent message={message} key={index} />
            ))}

          {fileContent && (
            <div className="file-uploaded">
              {["jpg", "jpeg", "png", "gif"].includes(
                fileContent.name.split(".").pop().toLowerCase()
              ) ? (
                <img
                  src={URL.createObjectURL(fileContent)}
                  alt={fileContent.name}
                />
              ) : ["mp4", "mov", "avi"].includes(
                  fileContent.name.split(".").pop().toLowerCase()
                ) ? (
                <video src={URL.createObjectURL(fileContent)} controls></video>
              ) : (
                <span>{fileContent.name}</span>
              )}
              <button
                className="reset-button"
                onClick={() => setFileContent(null)}
              >
                <CancelIcon />
              </button>
            </div>
          )}
        </div>
        <form className="form-submit" onSubmit={handleMessageSubmit}>
          <div className="input-container">
            <div className="bar-send-message">
              {/* <button className="mic-button">
                {" "}
                <MicNoneIcon />
              </button> */}
              <div className="champs-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleMessageSubmit(e);
                    }
                  }}
                  placeholder="Envoyer un message"
                />
              </div>
              <button
                className="link-button"
                onClick={() => document.getElementById("upload-file").click()}
              >
                {" "}
                <AttachFileIcon />
              </button>
              <input
                id="upload-file"
                type="file"
                onChange={(e) => setFileContent(e.target.files[0])}
                style={{ display: "none" }}
              />
              <button className="button-circle" type="submit">
                <SendIcon />
              </button>
            </div>
          </div>
        </form>
        {showMedia && (
          <ShowMedia
            onClose={() => setShowMedia(false)}
            conversation={messages}
          />
        )}
      </div>
    </div>
  );
}

MessageChatField.propTypes = {
  messages: PropTypes.array.isRequired,
  handleMessageSubmit: PropTypes.func.isRequired,
  fileContent: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  setMessageContent: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  setFileContent: PropTypes.array.isRequired,
  userDetMessage: PropTypes.object.isRequired,
  setMessages: PropTypes.object.isRequired,
};

// message
export const MessageContent = ({ message }) => {
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const timestamp = message.timestamp;
  const isCurrentUser = message.user_sender.id === user_connect.id;
  const user_sender = message.user_sender;
  const user_recipient = message.user_recipient;

  if (message.fichier) {
    return (
      <div
        className={`user-message ${
          isCurrentUser ? "user-message" : "other-message"
        }`}
      >
        <div
          className={isCurrentUser ? "profil-user-right" : "profil-user-left"}
        >
          <img
            className={
              isCurrentUser ? "profil-content-right" : "profil-content-left"
            }
            src={`${BaseURL}${
              isCurrentUser ? user_sender.image_url : user_recipient.image_url
            }`}
            alt="Profil-image"
          />
        </div>
        <div
          className={
            isCurrentUser ? "message-content-right" : "message-content-left"
          }
        >
          <b>{user_sender.first_name + " " + user_sender.last_name}</b>
          <p>{message.message}</p>
          <a
            className="link-content"
            href={`${BaseURL}${message.fichier}`}
            download={message.fichier}
            target="_blank"
          >
            {message.fichier.split("/").pop()}
          </a>
          <p className="timestamp">{dataParseHM(timestamp)}</p>
        </div>
      </div>
    );
  } else if (message.audio) {
    return (
      <div
        className={`user-message ${
          isCurrentUser ? "user-message" : "other-message"
        }`}
      >
        <div
          className={isCurrentUser ? "profil-user-right" : "profil-user-left"}
        >
          <img
            className={
              isCurrentUser ? "profil-content-right" : "profil-content-left"
            }
            src={`${BaseURL}${
              isCurrentUser ? user_sender.image_url : user_recipient.image_url
            }`}
            alt="steedy-profil"
          />
        </div>
        <div
          className={
            isCurrentUser ? "message-content-right" : "message-content-left"
          }
        >
          <b>{user_sender.first_name + " " + user_sender.last_name}</b>
          <p>{message.message}</p>
          <audio src={`${BaseURL}${message.audio}`} controls />
          <p className="timestamp">{dataParseHM(timestamp)}</p>
        </div>
      </div>
    );
  } else if (message.video) {
    return (
      <div
        className={`user-message ${
          isCurrentUser ? "user-message" : "other-message"
        }`}
      >
        <div
          className={isCurrentUser ? "profil-user-right" : "profil-user-left"}
        >
          <img
            className={
              isCurrentUser ? "profil-content-right" : "profil-content-left"
            }
            src={`${BaseURL}${
              isCurrentUser ? user_sender.image_url : user_recipient.image_url
            }`}
            alt="steedy-profil"
          />
        </div>
        <div
          className={
            isCurrentUser ? "message-content-right" : "message-content-left"
          }
        >
          <b>{user_sender.first_name + " " + user_sender.last_name}</b>
          <p>{message.message}</p>

          <video
            className="video-content"
            src={`${BaseURL}${message.video}`}
            alt="..."
            controls
          />
          <p className="timestamp">{dataParseHM(timestamp)}</p>
        </div>
      </div>
    );
  } else if (message.image) {
    return (
      <div
        className={`user-message ${
          isCurrentUser ? "user-message" : "other-message"
        }`}
      >
        <div
          className={isCurrentUser ? "profil-user-right" : "profil-user-left"}
        >
          <img
            className={
              isCurrentUser ? "profil-content-right" : "profil-content-left"
            }
            src={`${BaseURL}${user_sender?.image_url}`}
            alt="steedy-profil"
          />
        </div>
        <div
          className={
            isCurrentUser ? "message-content-right" : "message-content-left"
          }
        >
          <b>{user_sender.first_name + " " + user_sender.last_name}</b>
          <p>{message.message}</p>
          <a
            href={`${BaseURL}${message.image}`}
            target="_blank"
            download={`${message.image}`}
          >
            <img
              className="image-content"
              src={BaseURL + message.image}
              alt="..."
            />
          </a>
          <p className="timestamp">{dataParseHM(timestamp)}</p>
        </div>
      </div>
    );
  } else if (message.content) {
    // Check if message contains a link
    const linkPattern =
      /(?:^|\s)((?:https?:\/\/)?(?:www\.(?:[\w-]+\.)*[\w-]+(?::\d+)?(?:\/\S*)?)|(?:[\w-]+\.)*[\w-]+(?:\.\w+))(?:$|\s)/;
    const match = message.content.match(linkPattern);

    if (match) {
      const linkUrl = match[1];
      const linkText = match[0];
      const messageParts = message.content.split(match[0]);

      return (
        <div
          className={`user-message ${
            isCurrentUser ? "user-message" : "other-message"
          }`}
        >
          <div
            className={isCurrentUser ? "profil-user-right" : "profil-user-left"}
          >
            <img
              className={
                isCurrentUser ? "profil-content-right" : "profil-content-left"
              }
              src={`${BaseURL}${
                isCurrentUser ? user_sender.image_url : user_recipient.image_url
              }`}
              alt="Profil-image"
            />
          </div>
          <div
            className={
              isCurrentUser ? "message-content-right" : "message-content-left"
            }
          >
            <b>{isCurrentUser ? "" : user_recipient.first_name}</b>
            <p>
              {messageParts[0]}{" "}
              <a href={linkUrl} style={{ color: "blue" }}>
                {linkText}
              </a>{" "}
              {messageParts[1]}
            </p>
            <p className="timestamp">{dataParseHM(timestamp)}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`user-message ${
            isCurrentUser ? "user-message" : "other-message"
          }`}
        >
          <div
            className={isCurrentUser ? "profil-user-right" : "profil-user-left"}
          >
            <img
              className={
                isCurrentUser ? "profil-content-right" : "profil-content-left"
              }
              src={`${BaseURL}${user_sender.image_url}`}
              alt="Profil-image"
            />
          </div>
          <div
            className={
              isCurrentUser ? "message-content-right" : "message-content-left"
            }
          >
            <b>{user_sender.first_name + " " + user_sender.last_name}</b>
            <p style={{ marginTop: "8px" }}>{message.content}</p>
            <p className="timestamp">{dataParseHM(timestamp)}</p>
          </div>
        </div>
      );
    }
  }
};

MessageContent.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageChatField;
