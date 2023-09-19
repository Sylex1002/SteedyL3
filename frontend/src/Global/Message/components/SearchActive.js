import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "./style/searchActive.scss";
import { motion } from "framer-motion";
import AlertDialog from "../Pages/ModalConfirmation";
import ShowMedia from "../../Community/Components/MediaList/ShowMedia";
import PropTypes from "prop-types";
import {
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import { useSelector } from "react-redux";
import { MessageContent } from "./MessageChatField";

function SearchActive({
  messagess,
  baseUrl,
  setFileContent,
  userDetMessage,
  setSearchActive,
  setMessageContent,
  handleMessageSubmit,
  message,
  setMessages,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [showMedia, setShowMedia] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const messagesEndRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const user_connect = useSelector(GET_USER_INFO_CONNECT);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messagess]);

//   const handleSearch = () => {
//     setSearchActive(true);
//   };
  const openMediaButton = () => {
    setShowMedia(true);
  };
  const handleClear = () => {
    setSearchActive(false);
    setSearchValue("");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="Message-content-active-message">
        <div className="box-message-etudiant">
          <div className="input-file-active-message">
            <div className="content-input-active-message">
              <div className="other-profil">
                <div className="other-profil-image">
                  <img
                    className="other-profil-image-content"
                    src={`${baseUrl}${userDetMessage?.image_url}`}
                    alt="Profil-image"
                  />
                </div>
                <div className="other-profil-username">
                  {userDetMessage?.username} {userDetMessage?.last_name}
                  <p>1min</p>
                </div>
              </div>
              <div className="menu-icon">
                <Stack direction="row" spacing={1}>
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
                    messages={messagess}
                  />
                </Stack>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="search-input-container-message"
            >
              <motion.div
                initial={{ translateY: "-100px" }}
                animate={{ translateY: "0px" }}
                exit={{ translateY: "-100px" }}
                className="content"
              >
                <div className="searchicon">
                  <SearchIcon className="search-icon" />
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Faire un recherche…"
                  style={{ borderRadius: 0 }}
                />
                <p
                  style={{ borderRight: "1px solid #fefefe", color: "#686868" }}
                >
                  {
                    messagess.filter((message) =>
                      message.message
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase())
                    ).length
                  }{" "}
                  sur {messagess.length}
                </p>
                <p
                  style={{ cursor: "pointer", color: "#686868" }}
                  onClick={handleClear}
                >
                  Annuler
                </p>
              </motion.div>
            </motion.div>
          </div>
          <div className="chat-log-active-message" ref={messagesEndRef}>
            {messagess
              .filter((message) =>
                message.content
                  ?.toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((message, index) => {
                return <MessageContent message={message} key={index} />;
              })}
          </div>
          <form className="form-submit-active" onSubmit={handleMessageSubmit}>
            <div className="input-container-active">
              <div className="bar-send-message">
                <button className="mic-button">
                  {" "}
                  <MicNoneIcon />
                </button>
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
              conversation={messagess}
            />
          )}
        </div>
      </div>
    </>
  );
}



SearchActive.propTypes = {
    messagess: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    setFileContent: PropTypes.object.isRequired,
    userDetMessage: PropTypes.object.isRequired,
    setSearchActive: PropTypes.bool.isRequired,
    setMessageContent: PropTypes.string.isRequired,
    handleMessageSubmit: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    setMessages: PropTypes.array.isRequired,
  };
  

export default SearchActive;
