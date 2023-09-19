import { React, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import "./style/ModalNotification.scss";
// import axios from "axios";
import PropTypes from "prop-types";
import { GET_ALL_NOTIFICATE_LIST } from "../../Reducers/ReducerNotification";
import { useDispatch, useSelector } from "react-redux";
import CardNotification from "../../Etudiant/components/CardNotification";
import { AppContext } from "../../Context/AppContext";
import {
  delete_notificate_AND_groupWaiting_action,
  // delete_notification_action,
  readNotificationAction,
} from "../../Actions/ActionNotificate";
import { useNavigate } from "react-router-dom";
import {
  BaseURL,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";
import { dataParseHM } from "../../Helpers/Utils";
import { add_user_into_group_action } from "../../Actions/ActionCommunity";

export default function ModalNotifications({
  handleClose,
  open,
  setHighData,
  handleViewd,
  handleHighlightModal,
}) {
  const notif_list = useSelector(GET_ALL_NOTIFICATE_LIST);
  const { Uuid } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteNotification = async (notif) => {
    if (notif.groupeEnAttent) {
      const id_group = notif.groupeEnAttent.id;
      const id_notif = notif.id;
      
      await dispatch(
        delete_notificate_AND_groupWaiting_action(id_notif, id_group)
      );
    }
  };

  const handleAgreeDemande = async (notif) => {
    console.log('notif=',notif);
    const id_group = notif.groupeEnAttent.groupes.id;
    const id_group_wait = notif.groupeEnAttent.id;
    const id_notif = notif.id;
    const user_id = notif.user.id;
      
    const data = {
      groupe_id: id_group,
      user_id: user_id,
    };

    await dispatch(add_user_into_group_action(data))
      .then(() => {
        console.log('data===',data);
        delete_notificate_AND_groupWaiting_action(id_notif,id_group_wait);
      })
      .catch((error) => {
        console.error("Error adding user to the group:", error);
      });
  };

  
  return (
    <div>
      <Modal className="modal-notification" open={open} onClose={handleClose}>
        <Box className="notification-container">
          <div className="recherche-notification">
            <SearchIcon id="searchIcon" />
            <input
              type="text"
              placeholder="Rechercher votre notification içi..."
            />
            <button className="annuler" onClick={handleClose}>
              Annuler
            </button>
          </div>
          <div className="notification-list">
            {notif_list.length > 0 &&
              notif_list.map((notif, index) => {
                {
                  /* notificate for focus */
                }
                if (notif.focus) {
                  const date = new Date(notif.created_at);

                  const navigates = async () => {
                    const formData = { user_id: Uuid };
                    // make sur that read became true
                    await dispatch(readNotificationAction(notif?.id, formData));
                    if (notif?.focus) {
                      navigate(`/etudiant/focus/${notif?.focus.id}`);
                    }
                  };

                  const image = verificationCloudinaryHighlight(notif.focus.bg);

                  return (
                    <CardNotification
                      key={index}
                      image={image}
                      userName={`${notif.user.first_name}  ${notif.user.last_name}`}
                      time={`${date.toLocaleDateString()} à ${dataParseHM(
                        notif.created_at
                      )}`}
                      message={notif.message}
                      read={notif.read}
                      navigates={navigates}
                    />
                  );
                }

                {
                  /* notificate for higilight */
                }
                if (notif.highLight) {
                  const date = new Date(notif.created_at);

                  const navigates = async () => {
                    const formData = { user_id: Uuid };
                    // make sur that read became true
                    await dispatch(readNotificationAction(notif?.id, formData));
                    if (notif?.highLight) {
                      setHighData(notif.highLight);
                      {
                        /* hadle view */
                      }
                      handleViewd(notif.highLight);
                      handleHighlightModal();
                    }
                  };

                  const image = verificationCloudinaryHighlight(
                    notif.highLight.file
                  );

                  return (
                    <CardNotification
                      key={index}
                      image={image}
                      userName={`${notif.user.first_name}  ${notif.user.last_name}`}
                      time={`${date.toLocaleDateString()} à ${dataParseHM(
                        notif.created_at
                      )}`}
                      message={notif.message}
                      read={notif.read}
                      navigates={navigates}
                    />
                  );
                }

                {
                  /* groupeEnAttent */
                }
                if (notif.groupeEnAttent) {
                  return (
                    <CardGroupWait
                      handleDeleteNotification={handleDeleteNotification}
                      handleAgreeDemande={handleAgreeDemande}
                      notif={notif}
                      key={index}
                    />
                  );
                }
              })}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

ModalNotifications.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  notification: PropTypes.array.isRequired,
  setNotification: PropTypes.array.isRequired,
  setHighData: PropTypes.func.isRequired,
  handleViewd: PropTypes.func.isRequired,
  handleHighlightModal: PropTypes.func.isRequired,
};

const CardGroupWait = ({
  notif,
  handleAgreeDemande,
  handleDeleteNotification,
}) => (
  <div>
    <div className="notification-container-list">
      <div className="notification-image">
        <img src={`${BaseURL}${notif.user.image_url}`} alt="..." />
      </div>
      <div className="info-groupe-joindre">
        <div className="notification-name">
          <p>
            {notif.user.username} {notif.user.last_name} :
          </p>
          <span>{notif.message}</span>
        </div>
        <div className="answer-question">
          {/* <div className="raison-join">{notif.reasonForJoining}</div> */}
          {/* <div className="agreement">{notif.agreedText}</div> */}
          <div className="agreement">wala</div>
        </div>
        <div className="button-decision">
          <button
            className="button-accept"
            onClick={() =>handleAgreeDemande(notif)}
          >
            {" "}
            Accepter
          </button>
          <button
            className="button-reject"
            onClick={() => handleDeleteNotification(notif)}
          >
            {" "}
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
);

CardGroupWait.propTypes = {
  notif: PropTypes.object.isRequired,
  handleAgreeDemande: PropTypes.func.isRequired,
  handleDeleteNotification: PropTypes.func.isRequired,
};
