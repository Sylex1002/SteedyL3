import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutEtudiant from "../Layout/LayoutEtudiant";
import CardNotification from "../components/CardNotification";
import {
  get_my_ntotification,
  readNotificationAction,
} from "../../Actions/ActionNotificate";
import { dataParseHM } from "../../Helpers/Utils";
import { useNavigate } from "react-router-dom";
import "./style/NotificationsEtudiant.scss";
import {
  GET_ALL_NOTIFICATE_LIST,
  GET_NOTIFICATE_ACTIVE,
} from "../../Reducers/ReducerNotification";
import {
  BaseURL,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import { viewHighlightAction } from "../../Actions/ActionHighlight";
import { AppContext } from "../../Context/AppContext";

export default function NotificationsEtudiant() {
  const list_notificate = useSelector(GET_ALL_NOTIFICATE_LIST);
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const [viewHigh, setViewHigh] = useState(false);
  const [liking, setLiking] = useState(false);
  const [HighData, setHighData] = useState(null);
  const { Uuid } = useContext(AppContext);

  // notification
  const active_notificate = useSelector(GET_NOTIFICATE_ACTIVE);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // notification fetch
  useEffect(() => {
    if (Uuid && active_notificate === false) {
      dispatch(get_my_ntotification(Uuid));
    }
  }, [dispatch, Uuid]);

  const handleViewd = async (HighData) => {
    if (HighData) {
      const formData = {
        user_id: user_connect.id,
        highlight_id: HighData.id,
      };
      const res = await dispatch(viewHighlightAction(formData));
      setHighData(res);
    }
  };

  const ViewCardHigh = () => {
    const backgroundCard = `url(${verificationCloudinaryHighlight(
      HighData.file
    )}) center/cover no-repeat`;

    const handleClose = () => {
      setHighData(null);
      setViewHigh(false);
    };

    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="view-high"
      >
        <div className="btn-closed" onClick={handleClose}>
          <CloseIcon sx={{ width: "24px", height: "24px" }} />
        </div>
        <div className="card-highlight" style={{ background: backgroundCard }}>
          <div className="identity">
            <div className="info-owner">
              <div className="card-info">
                <Stack direction="row" spacing="12px">
                  <div className="profil">
                    <img
                      src={BaseURL + HighData.professionnel.user.image_url}
                      alt="steedy"
                    />
                  </div>
                  <div className="text-info">
                    <Stack direction="column" spacing="6px">
                      <p>
                        {HighData.professionnel.user.first_name}{" "}
                        {HighData.professionnel.user.last_name}
                      </p>
                      <span>{HighData.professionnel.user.fonction}</span>
                    </Stack>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
          <div className="description-content">
            <div className="description-box">
              <p>{HighData.description}. </p>
            </div>
          </div>
        </div>
        <div className="actions">
          <div className="like" onClick={() => setLiking(!liking)}>
            <Stack direction="row" spacing="8px">
              {!liking ? (
                <FavoriteBorderIcon sx={{ width: "25px", height: "25px" }} />
              ) : (
                <FavoriteIcon
                  sx={{ width: "25px", height: "25px", color: "#e74c3c" }}
                />
              )}
              <p style={{ marginTop: "2px" }}>{HighData.like.length}</p>
            </Stack>
          </div>
          <div className="view">
            <Stack direction="row" spacing="8px">
              <VisibilityIcon sx={{ width: "25px", height: "25px" }} />
              <p style={{ marginTop: "2px" }}>{HighData.view.length}</p>
            </Stack>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <LayoutEtudiant>
      <div id="NotificationsEtudiant">
        <div className="NotificationsEtudiant_container">
          <div className="title_content">
            <h1 className="title">Notifications</h1>
            <span></span>
          </div>
          <div className="NotificationsEtudiant_content">
            {list_notificate.map((notif, index) => {
              const date = new Date(notif.created_at);

              {
                /* notification focsu */
              }
              if (notif.focus) {
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
                const navigates = async () => {
                  const formData = { user_id: Uuid };
                  // make sur that read became true
                  await dispatch(readNotificationAction(notif?.id, formData));
                  if (notif?.highLight) {
                    {
                      /* add notif */
                    }
                    setHighData(notif.highLight);
                    {
                      /* hadle view */
                    }
                    handleViewd();
                    setViewHigh(true);
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
                /* notification group */
              }
              if (notif.groupe) {
                const image = BaseURL + notif.groupe.image;

                const navigates = async () => {
                  const formData = { user_id: Uuid };
                  // make sur that read became true
                  await dispatch(readNotificationAction(notif?.id, formData));
                  if (notif?.groupe) {
                    navigate(`/etudiant/community/${notif?.groupe.id}/`);
                  }
                };

                return (
                  <CardNotification
                    userName={notif.groupe.groupe_name}
                    message={notif.message}
                    image={image}
                    key={index}
                    time={`${date.toLocaleDateString()} à ${dataParseHM(
                      notif.created_at
                    )}`}
                    read={notif.read}
                    navigates={navigates}
                  />
                );
              }
            })}
          </div>
        </div>

        {/* Highlight */}
        {viewHigh && HighData && ViewCardHigh()}
      </div>
    </LayoutEtudiant>
  );
}

