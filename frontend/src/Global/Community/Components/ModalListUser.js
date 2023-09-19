import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Styles/ModalListUser.scss";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import PropTypes from "prop-types";

export default function NestedModal({
  handleClose,
  open,
  newAllGroup,
  BaseURL,
  userProfil,
}) {
  // const [searchQuery, setSearchQuery] = useState("");
  const [socket, setsocket] = useState(null);
  const userID = useSelector(GET_USER_INFO_CONNECT);

  const handleClick = (group) => {
    const data = {
      user: userID.id,
      groupID: group.id,
      createurID: group.createur.id,
      message: ` Demande de réjoindre la communauté ${group.groupe_name}`,
    };
    socket.send(JSON.stringify(data));
  };

  useEffect(() => {
    const newSocket = new WebSocket(
      "ws://localhost:8000/ws/notification/etudiant/"
    );
    setsocket(newSocket);
    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = async (event) => {
      const notification = JSON.parse(event.data);
      console.log(notification);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <Modal className="modal" open={open} onClose={handleClose}>
        <Box className="modal-container">
          <div className="recherche">
            <SearchIcon id="searchIcon" />
            <input type="text" placeholder="Rechercher votre groupe içi..." />
            <button className="annuler" onClick={handleClose}>
              Annuler
            </button>
          </div>
          <div className="group-list">
            {newAllGroup
              ?.filter((group) =>
                `${group.groupe_name}`
                  .toLowerCase()
              )
              .map((group, index) => {
                return (
                  <div key={index}>
                    <div className="group-container">
                      <div className="group-image">
                        <img
                          src={
                            group.image
                              ? `${BaseURL}${group.image}`
                              : userProfil
                          }
                          alt="..."
                        />
                      </div>
                      <div className="group-name">
                        <p>{group.groupe_name}</p>
                        <span>{group.members.length} membres</span>
                      </div>
                      <button
                        className="button-joindre"
                        onClick={() => handleClick(group)}
                      >
                        Joindre
                        <AddIcon id="AddIcon" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

NestedModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  newAllGroup: PropTypes.array.isRequired,
  BaseURL: PropTypes.string.isRequired,
  userProfil: PropTypes.string.isRequired,
};
