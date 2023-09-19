import React, { useState } from "react";
import Logo from "../../../../Etudiant/components/Logo";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
import "./styles/ShowMedia.scss";
import CardMedia from "./CardMedia";
import { Grid, Stack } from "@mui/material";
import CardFichier from "./CardFichier";
import PropTypes from "prop-types";
import MicNoneIcon from "@mui/icons-material/MicNone";

const ShowMedia = ({ onClose, conversation }) => {
  const [activeMenu, setactiveMenu] = useState("all");
  const [searchInput, setSearchInput] = useState("");


  return (
    <div className="media-list">
      <div id="HeaderBlock">
        <div className="HeaderBlock_content">
          <Logo />
          <div className="HeaderBlock_right">
            <div>
              <CloseIcon className="HeaderBlock_close" onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
      <div className="all-content">
        <div className="menuBar">
          {/* <Stack direction='row'> */}
          <div
            className={activeMenu === "all" ? "menu active" : "menu"}
            onClick={() => setactiveMenu("all")}
          >
            <div className="icon"></div>
            <div className="text">
              <Stack direction="row" spacing="12px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M20.75 6.75001H12.8103L10.25 4.18969C10.1112 4.0498 9.94601 3.93889 9.76398 3.86341C9.58196 3.78792 9.38674 3.74938 9.18969 3.75001H4.25C3.85218 3.75001 3.47064 3.90804 3.18934 4.18935C2.90804 4.47065 2.75 4.85218 2.75 5.25001V18.8081C2.7505 19.1904 2.90257 19.5568 3.17286 19.8271C3.44316 20.0974 3.80962 20.2495 4.19188 20.25H20.8334C21.209 20.2495 21.569 20.1001 21.8346 19.8346C22.1001 19.569 22.2495 19.209 22.25 18.8334V8.25001C22.25 7.85218 22.092 7.47065 21.8107 7.18935C21.5294 6.90804 21.1478 6.75001 20.75 6.75001ZM4.25 5.25001H9.18969L10.6897 6.75001H4.25V5.25001ZM20.75 18.75H4.25V8.25001H20.75V18.75Z"
                    fill={activeMenu === "all" ? "var(--bg)" : "black"}
                  />
                </svg>
                <p>Tous</p>
              </Stack>
            </div>
          </div>
          <div
            className={activeMenu === "fichier" ? "menu active" : "menu"}
            onClick={() => setactiveMenu("fichier")}
          >
            <div className="icon"></div>
            <div className="text">
              <Stack direction="row" spacing="12px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M23.2138 9.16125L17.0888 3.03625C16.9658 2.91314 16.799 2.8439 16.625 2.84375H6.125C5.71889 2.84375 5.32941 3.00508 5.04224 3.29224C4.75508 3.57941 4.59375 3.96889 4.59375 4.375V23.625C4.59375 24.0311 4.75508 24.4206 5.04224 24.7078C5.32941 24.9949 5.71889 25.1562 6.125 25.1562H21.875C22.2811 25.1562 22.6706 24.9949 22.9578 24.7078C23.2449 24.4206 23.4062 24.0311 23.4062 23.625V9.625C23.4061 9.45101 23.3369 9.2842 23.2138 9.16125ZM17.2812 5.08375L21.1663 8.96875H17.2812V5.08375ZM21.875 23.8438H6.125C6.06698 23.8438 6.01134 23.8207 5.97032 23.7797C5.9293 23.7387 5.90625 23.683 5.90625 23.625V4.375C5.90625 4.31698 5.9293 4.26134 5.97032 4.22032C6.01134 4.1793 6.06698 4.15625 6.125 4.15625H15.9688V9.625C15.9688 9.79905 16.0379 9.96597 16.161 10.089C16.284 10.2121 16.451 10.2812 16.625 10.2812H22.0938V23.625C22.0938 23.683 22.0707 23.7387 22.0297 23.7797C21.9887 23.8207 21.933 23.8438 21.875 23.8438ZM18.1562 14.875C18.1562 15.049 18.0871 15.216 17.964 15.339C17.841 15.4621 17.674 15.5312 17.5 15.5312H10.5C10.326 15.5312 10.159 15.4621 10.036 15.339C9.91289 15.216 9.84375 15.049 9.84375 14.875C9.84375 14.701 9.91289 14.534 10.036 14.411C10.159 14.2879 10.326 14.2188 10.5 14.2188H17.5C17.674 14.2188 17.841 14.2879 17.964 14.411C18.0871 14.534 18.1562 14.701 18.1562 14.875ZM18.1562 18.375C18.1562 18.549 18.0871 18.716 17.964 18.839C17.841 18.9621 17.674 19.0312 17.5 19.0312H10.5C10.326 19.0312 10.159 18.9621 10.036 18.839C9.91289 18.716 9.84375 18.549 9.84375 18.375C9.84375 18.201 9.91289 18.034 10.036 17.911C10.159 17.7879 10.326 17.7187 10.5 17.7187H17.5C17.674 17.7187 17.841 17.7879 17.964 17.911C18.0871 18.034 18.1562 18.201 18.1562 18.375Z"
                    fill={activeMenu === "fichier" ? "var(--bg)" : "black"}
                  />
                </svg>
                <p>Fichiers</p>
              </Stack>
            </div>
          </div>
          <div
            className={activeMenu === "photo" ? "menu active" : "menu"}
            onClick={() => setactiveMenu("photo")}
          >
            <div className="icon"></div>
            <div className="text">
              <Stack direction="row" spacing="12px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M21.4999 3.5H6.5001C4.84319 3.5 3.5 4.84319 3.5 6.5001V21.4999C3.5 23.1568 4.84319 24.5 6.5001 24.5H21.4999C23.1568 24.5 24.5 23.1568 24.5 21.4999V6.5001C24.5 4.84319 23.1568 3.5 21.4999 3.5Z"
                    stroke={activeMenu === "photo" ? "var(--bg)" : "black"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 14.0001C6.49998 14.0001 4.99999 17 3.5 17"
                    stroke={activeMenu === "photo" ? "var(--bg)" : "black"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.0039 14.0001C15.5039 14.0001 17.234 17 20.0039 17"
                    stroke={activeMenu === "photo" ? "var(--bg)" : "black"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.5019 15.5001C19.2519 15.5001 18.5019 20 15.502 20"
                    stroke={activeMenu === "photo" ? "var(--bg)" : "black"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5021 12.5003C20.159 12.5003 21.5022 11.1571 21.5022 9.50022C21.5022 7.84331 20.159 6.50012 18.5021 6.50012C16.8451 6.50012 15.502 7.84331 15.502 9.50022C15.502 11.1571 16.8451 12.5003 18.5021 12.5003Z"
                    stroke={activeMenu === "photo" ? "var(--bg)" : "black"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Photos</p>
              </Stack>
            </div>
          </div>
          <div
            className={activeMenu === "video" ? "menu active" : "menu"}
            onClick={() => setactiveMenu("video")}
          >
            <div className="icon"></div>
            <div className="text">
              <Stack direction="row" spacing="12px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 29 28"
                  fill="none"
                >
                  <path
                    d="M26.2592 8.11767L26.2592 8.11772L26.2658 8.11317C26.31 8.0827 26.3601 8.06192 26.4129 8.0522C26.4646 8.04268 26.5178 8.04401 26.5689 8.05607C26.644 8.07617 26.7105 8.12035 26.7582 8.18188C26.8064 8.24423 26.8326 8.32086 26.8326 8.39972V8.39997V18.6324H26.8325L26.8326 18.6408C26.8338 18.7077 26.8177 18.7737 26.786 18.8326C26.7552 18.8899 26.7106 18.9385 26.6563 18.9741C26.5996 19.0072 26.5348 19.024 26.4691 19.0226L26.458 19.5224L26.4691 19.0226C26.4015 19.0211 26.3358 19.0004 26.2796 18.9629L26.2795 18.9628L22.6993 16.576V10.4906L26.2592 8.11767ZM19.9881 7.54442V19.5221C19.9881 19.8433 19.8606 20.1514 19.6334 20.3785C19.4063 20.6056 19.0983 20.7332 18.777 20.7332H3.37712C3.05591 20.7332 2.74787 20.6056 2.52074 20.3785C2.29361 20.1514 2.16602 19.8433 2.16602 19.5221V7.54442C2.16602 7.22321 2.29361 6.91516 2.52074 6.68804C2.74787 6.46091 3.05591 6.33331 3.37712 6.33331H18.777C19.0983 6.33331 19.4063 6.46091 19.6334 6.68804C19.8606 6.91516 19.9881 7.22321 19.9881 7.54442Z"
                    stroke={activeMenu === "video" ? "var(--bg)" : "black"}
                  />
                </svg>
                <p>Videos</p>
              </Stack>
            </div>
          </div>

          <div
            className={activeMenu === "audio" ? "menu active" : "menu"}
            onClick={() => setactiveMenu("audio")}
          >
            <div className="icon"></div>
            <div className="text">
              <Stack direction="row" spacing="12px">
                <MicNoneIcon />
                <p>Audio</p>
              </Stack>
            </div>
          </div>
        </div>
        <div className="search">
          <div className="search-bar">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Faire un recherche…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {/* <div className="plus">
            <AddIcon className="add-icon" />
          </div> */}
        </div>
        {activeMenu === "all" && (
          <div className="card-mediaList">
            <div className="content">
              <Grid container spacing={2} direction="row">
                {conversation
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
                        .includes(searchInput.toLowerCase());
                    }

                    {
                      /* video */
                    }
                    if (item.video) {
                      newTem = item.video
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
                    }

                    {
                      /* fichier */
                    }
                    if (item.fichier) {
                      newTem = item.fichier
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
                    }

                    {
                      /* image */
                    }
                    if (item.image) {
                      newTem = item.image
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
                    }

                    return newTem;
                  })

                  .map((message, index) => {
                    {
                      /* fichier */
                    }
                    if (message.fichier) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardFichier file={message.fichier} />
                        </Grid>
                      );
                    }

                    {
                      /* image */
                    }
                    if (message.image) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardMedia type={"img"} file={message.image} />
                        </Grid>
                      );
                    }

                    {
                      /* video */
                    }
                    if (message.video) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardMedia type={"video"} file={message.video} />
                        </Grid>
                      );
                    }

                    {
                      /* audio */
                    }
                    if (message.audio) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardMedia type={"audio"} file={message.audio} />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </div>
          </div>
        )}
        {activeMenu === "fichier" && (
          <div className="card-mediaList">
            <div className="content">
              <Grid container spacing={2} direction="row">
                {conversation
                  .filter(
                    (item) =>
                      item.fichier &&
                      item.fichier
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                  )
                  .map((message, index) => {
                    if (message.fichier) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardFichier file={message.fichier} />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </div>
          </div>
        )}
        {activeMenu === "photo" && (
          <div className="card-mediaList">
            <div className="content">
              <Grid container spacing={2} direction="row">
                {conversation
                  .filter(
                    (item) =>
                      item.image &&
                      item.image
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                  )
                  .map((message, index) => {
                    if (message.image) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardMedia type={"img"} file={message.image} />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </div>
          </div>
        )}
        {activeMenu === "video" && (
          <div className="card-mediaList">
            <div className="content">
              <Grid container spacing={2} direction="row">
                {conversation
                  .filter(
                    (item) =>
                      item.video &&
                      item.video
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                  )
                  .map((message, index) => {
                    if (message.video) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardMedia type={"video"} file={message.video} />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </div>
          </div>
        )}

        {activeMenu === "audio" && (
          <div className="card-mediaList">
            <div className="content">
              <Grid container spacing={2} direction="row">
                {conversation
                  .filter(
                    (item) =>
                      item.audio &&
                      item.audio
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                  )
                  .map((message, index) => {
                    if (message.audio) {
                      return (
                        <Grid item md={3} key={index}>
                          <CardMedia type={"audio"} file={message.audio} />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ShowMedia.propTypes = {
  onClose: PropTypes.func.isRequired,
  conversation: PropTypes.array.isRequired,
};

export default ShowMedia;
