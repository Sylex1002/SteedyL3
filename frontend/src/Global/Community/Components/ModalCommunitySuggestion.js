import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Styles/ModalCommunitySuggestion.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { join_group_action } from "../../../Actions/ActionCommunity";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function NestedModal({
  open,
  group_name,
  // createur_id,
  group_id,
  description,
  image,
  handleCloseFirstModal,
}) {
  const [showSecondModal, setShowSecondModal] = useState(false);
  // const [check, setCheck] = useState(true);
  // const [socket, setsocket] = useState(null);
  const userID = useSelector(GET_USER_INFO_CONNECT);
  const [reasonForJoining, setReasonForJoining] = useState("");
  const [agreedToRules, setAgreedToRules] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const agreedText = agreedToRules
      ? "Oui, j'accepte les règles de la communauté"
      : "Non, je ne veux pas suivre les règles de la communauté";

    const data = {
      user_id: userID.id,
      group_id: group_id,
      // createurID: createur_id,
      // message: `Demande de réjoindre la communauté ${group_name}`,
      reasonForJoining: reasonForJoining,
      agreedText: agreedText,
    };
    await dispatch(join_group_action(data));


    // socket.send(JSON.stringify(data));
    setReasonForJoining("");
    setAgreedToRules(true);
    handleCloseFirstModal();
    navigate("");
  };

  // useEffect(() => {
  //   const newSocket = new WebSocket(
  //     "ws://localhost:8000/ws/notification/etudiant/"
  //   );
  //   setsocket(newSocket);
  //   newSocket.onopen = () => {
  //     console.log("WebSocket connected");
  //   };

  //   newSocket.onmessage = async (event) => {
  //     const notification = JSON.parse(event.data);
  //   };

  //   newSocket.onclose = () => {
  //     console.log("WebSocket disconnected");
  //   };

  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  const handleOpenSecondModal = () => {
    setShowSecondModal(true);
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };

  return (
    <React.Fragment>
      <Modal className="modal" open={open} onClose={handleCloseFirstModal}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <Box className="modal-container">
            {!showSecondModal ?
              <div className="profil-group">
                <div className="annuler">
                  <button className="annuler" onClick={handleCloseFirstModal}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="profil-container">
                  <div className="group-image">
                    <img src={image} alt="..." />
                  </div>
                  <div className="group-name">
                    <p>#{group_name}</p>
                  </div>
                </div>
                <div className="description">
                  <p>{description}</p>
                </div>
                <div className="rejoindre">
                  <button
                    className="button-rejoindre"
                    style={
                      showSecondModal
                        ? { cursor: "not-allowed" }
                        : { cursor: "pointer" }
                    }
                    onClick={!showSecondModal ? handleOpenSecondModal : null}
                  >
                    Rejoindre
                  </button>
                </div>
              </div>
              :
              <div
                className="new-div"
                style={
                  showSecondModal
                    ? { height: "auto", padding: "24px" }
                    : { height: "0", padding: "0" }
                }
              >
                <div className="annuler-question">
                  <button
                    className="annuler_container"
                    onClick={handleCloseSecondModal}
                  >
                    <Stack direction='row' spacing='8px' style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                      <KeyboardArrowLeftIcon style={{ width: '25px', height: '25px', color: 'var(--bg)' }} />
                      <p>Retour</p>
                    </Stack>
                  </button>
                </div>
                <div className="Question">
                  <div className="Question-list">
                    <div className="question-container">
                      <label className="label-qst1">
                        Pourquoi rejoignez-vous cette communauté ?
                      </label>
                      <input
                        className="input-qst1"
                        type="text"
                        value={reasonForJoining}
                        onChange={(e) => setReasonForJoining(e.target.value)}
                      />
                    </div>
                    <div className="question-confirmation">
                      <p>
                        Êtes-vous d`accord pour suivre les règles dans la
                        communauté ?
                      </p>
                      <div className="input-check">
                        <FormControlLabel
                          className="radioOption"
                          control={
                            <Checkbox
                              style={{ color: "var(--bg)" }}
                              inputProps={{ "aria-label": "primary checkbox" }}
                              checked={agreedToRules}
                              onClick={() => setAgreedToRules(!agreedToRules)}
                            />
                          }
                          label="Oui"
                        />
                        <FormControlLabel
                          className="radioOption"
                          control={
                            <Checkbox
                              style={{ color: "var(--bg)" }}
                              inputProps={{ "aria-label": "primary checkbox" }}
                              checked={!agreedToRules}
                              onClick={() => setAgreedToRules(!agreedToRules)}
                            />
                          }
                          label="Non"
                        />
                      </div>
                    </div>
                    <div className="Button-soumettre">
                      <button
                        className="soumettre-container"
                        onClick={() => handleClick()}
                      >
                        Soumettre
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </Box>
        </motion.div>
      </Modal>
    </React.Fragment>
  );
}

NestedModal.propTypes = {
  open: PropTypes.bool.isRequired,
  group_name: PropTypes.string.isRequired,
  createur_id: PropTypes.string.isRequired,
  group_id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleCloseFirstModal: PropTypes.func.isRequired,
};

