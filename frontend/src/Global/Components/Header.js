import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { AppContext } from "../../Context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Etudiant/components/Logo";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";
import "./style/header.scss";
import { Badge } from "@mui/material";
import {
  GET_ALL_NOTIFICATE_VIEWED_LIST,
} from "../../Reducers/ReducerNotification";
import { update_notification_action } from "../../Actions/ActionNotificate";
import ModalNotifications from "./ModalNotification";
import { motion } from "framer-motion";
import {
  BaseURL,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { viewHighlightAction } from "../../Actions/ActionHighlight";
import { useWebsocketNotification } from "../../Context/WebsocketContext";
import { get_my_notification_msg_action } from "../../Actions/ActionNotificate";

import {
  PUSH_NOTIFICATE_MESSAGE_REDUCER,
  GET_MY_NOTIFICATION_MSG,
  GET_NOTIFICATE_MSG_ACTIVE
} from "../../Reducers/ReducerNotification";

export default function Header(props) {
  const user = useSelector(GET_USER_INFO_CONNECT);
  const { searchInput, setSearchInput } = useContext(AppContext);
  const list_notificate = useSelector(GET_ALL_NOTIFICATE_VIEWED_LIST);

  const [viewHigh, setViewHigh] = useState(false);
  const [HighData, setHighData] = useState(null);
  const [liking, setLiking] = useState(false);

  const [open, setOpen] = useState(false);
  const { Uuid } = useContext(AppContext);
  const socketNotificate = useWebsocketNotification();
  const dispatch = useDispatch();
  const msg_notificates = useSelector(GET_MY_NOTIFICATION_MSG);
  const active_notificate_msg = useSelector(GET_NOTIFICATE_MSG_ACTIVE);

  useEffect(() => {
    if (user.id && active_notificate_msg === false) {
      dispatch(get_my_notification_msg_action(user.id));
    }
  }, [dispatch, user,active_notificate_msg]);



  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  const handleViewd = async (HighData) => {
    if (HighData) {
      const formData = {
        user_id: Uuid,
        highlight_id: HighData.id,
      };
      const res = await dispatch(viewHighlightAction(formData));
      setHighData(res);
    }
  };

  const handleHighlightModal = () => {
    setViewHigh(true);
    setOpen(false);
  };

  //envoie du socket
  useEffect(() => {
    if (socketNotificate) {
      socketNotificate.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.user) {
          dispatch(update_notification_action(data));
        }
        // notification message
        if (data.user_sender) {
          dispatch(PUSH_NOTIFICATE_MESSAGE_REDUCER(data));
        }
      };
    }
  }, [socketNotificate]);

  return (
    <div className="headerProfil">
      <Grid2 container spacing={1} className="menuLink">
        <Grid2 item xs={4} md={3}>
          <Logo />
        </Grid2>
        <Grid2
          item
          xs={12}
          md={9}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Stack
            direction="row"
            spacing={2}
            style={props.pro && { width: "100%" }}
          >
            {props.showSearch ? (
              <div
                className="searchWithFilter"
                style={
                  props.pro && {
                    background: "#F3F0EE",
                    border: "1px solid #F3F0EE",
                  }
                }
              >
                <Stack direction="row" spacing={1}>
                  <div id="searchIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M21.7495 21.1895L16.0855 15.5255C17.4466 13.8915 18.1253 11.7957 17.9805 9.67395C17.8356 7.55225 16.8784 5.56807 15.3079 4.13416C13.7374 2.70026 11.6745 1.92703 9.54844 1.97534C7.42236 2.02365 5.39674 2.88977 3.89298 4.39353C2.38922 5.89729 1.5231 7.92291 1.47479 10.049C1.42648 12.1751 2.19971 14.2379 3.63361 15.8085C5.06752 17.379 7.0517 18.3362 9.1734 18.481C11.2951 18.6259 13.391 17.9471 15.025 16.586L20.689 22.25L21.7495 21.1895ZM2.99948 10.25C2.99948 8.915 3.39536 7.60996 4.13706 6.49993C4.87876 5.38989 5.93296 4.52473 7.16636 4.01384C8.39976 3.50295 9.75696 3.36927 11.0663 3.62973C12.3757 3.89018 13.5784 4.53305 14.5224 5.47706C15.4665 6.42106 16.1093 7.62379 16.3698 8.93317C16.6302 10.2425 16.4966 11.5997 15.9857 12.8331C15.4748 14.0665 14.6096 15.1207 13.4996 15.8624C12.3895 16.6041 11.0845 17 9.74948 17C7.95987 16.998 6.24414 16.2862 4.9787 15.0208C3.71326 13.7554 3.00146 12.0396 2.99948 10.25Z"
                        fill="#AFAFAF"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    value={searchInput}
                    placeholder="Rechercher"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                  />
                </Stack>
              </div>
            ) : (
              <div className="none-search"></div>
            )}
            <Stack
              direction="row"
              spacing={2}
              style={
                props.pro && {
                  width: "70%",
                  display: "flex",
                  justifyContent: "end",
                }
              }
            >
              {props.pro ? (
                <Stack direction="row" spacing={1}>
                  <div className="msg">
                    <Badge
                      badgeContent={msg_notificates.length}
                      max={9}
                      sx={{ fontSize: "4px" }}
                      color="error"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M4.28337 19.1784L4.19925 19.4743L3.21848 22.9243L3.21729 22.9285C3.16228 23.1178 3.15879 23.3183 3.20716 23.5094C3.25542 23.7 3.35354 23.8743 3.49143 24.0145C3.62789 24.1512 3.79871 24.2485 3.98588 24.2962C4.17361 24.344 4.37079 24.3401 4.55649 24.2849L4.56567 24.2822L4.56569 24.2822L8.02723 23.3015L8.32278 23.2177L8.59215 23.3654C10.0961 24.1897 11.7685 24.6592 13.4817 24.7381C15.1949 24.817 16.9034 24.5032 18.4767 23.8206C20.05 23.138 21.4465 22.1048 22.5593 20.7999C23.6721 19.495 24.4719 17.9529 24.8974 16.2915C25.323 14.6302 25.363 12.8935 25.0146 11.2143C24.6662 9.53508 23.9384 7.95775 22.887 6.60287C21.8356 5.24799 20.4883 4.15143 18.9482 3.397C17.408 2.64257 15.7158 2.25024 14.0009 2.25L4.28337 19.1784ZM4.28337 19.1784L4.13547 18.9087M4.28337 19.1784L4.13547 18.9087M4.13547 18.9087C3.19613 17.1955 2.71917 15.2672 2.75154 13.3136C2.78392 11.3601 3.32451 9.44862 4.32009 7.76748C5.31567 6.08634 6.73192 4.69348 8.42939 3.72601C10.1269 2.75856 12.047 2.24986 14.0008 2.25L4.13547 18.9087ZM17.4458 13.0836L18.1676 13.2271L17.4458 13.0836C17.3634 13.4976 17.4057 13.9268 17.5672 14.3169C17.7288 14.7069 18.0024 15.0403 18.3534 15.2749C18.7045 15.5094 19.1172 15.6346 19.5394 15.6346C20.1055 15.6346 20.6485 15.4097 21.0488 15.0094L20.5184 14.4791L21.0488 15.0094C21.4491 14.6091 21.674 14.0661 21.674 13.5C21.674 13.0778 21.5488 12.6651 21.3142 12.3141C21.0797 11.963 20.7463 11.6894 20.3563 11.5279C19.9662 11.3663 19.537 11.324 19.1229 11.4064C18.7089 11.4888 18.3285 11.6921 18.03 11.9906C17.7314 12.2891 17.5281 12.6695 17.4458 13.0836ZM7.27652 15.2749C7.62755 15.5094 8.04026 15.6346 8.46245 15.6346C9.02859 15.6346 9.57153 15.4097 9.97185 15.0094C10.3722 14.6091 10.5971 14.0661 10.5971 13.5C10.5971 13.0778 10.4719 12.6651 10.2373 12.3141C10.0028 11.963 9.66938 11.6894 9.27933 11.5279C8.88928 11.3663 8.46008 11.324 8.04601 11.4064C7.63193 11.4888 7.25158 11.6921 6.95305 11.9906C6.65452 12.2891 6.45121 12.6695 6.36885 13.0836C6.28649 13.4976 6.32876 13.9268 6.49032 14.3169C6.65189 14.7069 6.92549 15.0403 7.27652 15.2749ZM12.815 15.2749C13.166 15.5094 13.5787 15.6346 14.0009 15.6346C14.567 15.6346 15.11 15.4097 15.5103 15.0094C15.9106 14.6091 16.1355 14.0661 16.1355 13.5C16.1355 13.0778 16.0103 12.6651 15.7758 12.3141C15.5412 11.963 15.2078 11.6894 14.8178 11.5279C14.4277 11.3663 13.9985 11.324 13.5845 11.4064C13.1704 11.4888 12.79 11.6921 12.4915 11.9906C12.193 12.2891 11.9897 12.6695 11.9073 13.0836C11.8249 13.4976 11.8672 13.9268 12.0288 14.3169C12.1903 14.7069 12.4639 15.0403 12.815 15.2749Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </Badge>
                  </div>
                  <div onClick={handleOpen} className="notify">
                    <Badge
                      badgeContent={list_notificate.length}
                      max={9}
                      sx={{ fontSize: "4px" }}
                      color="error"
                    >
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 28 28"
                fill="none"
              >
                <mask id="path-2-inside-1_566_3603" fill="white">
                  <path d="M24.156 18.0702C24.067 17.963 23.9797 17.8559 23.894 17.7525C22.7154 16.327 22.0024 15.4666 22.0024 11.4311C22.0024 9.34179 21.5026 7.6275 20.5174 6.34179C19.791 5.39196 18.809 4.67143 17.5147 4.13893C17.498 4.12966 17.4832 4.11751 17.4708 4.10304C17.0052 2.54411 15.7313 1.5 14.2945 1.5C12.8577 1.5 11.5843 2.54411 11.1188 4.10143C11.1064 4.11537 11.0917 4.12714 11.0754 4.13625C8.05506 5.37964 6.5872 7.76518 6.5872 11.4295C6.5872 15.4666 5.87524 16.327 4.69559 17.7509C4.60988 17.8543 4.52256 17.9593 4.43363 18.0686C4.20392 18.3456 4.05837 18.6826 4.01423 19.0398C3.97008 19.397 4.02918 19.7593 4.18452 20.0839C4.51506 20.7804 5.21952 21.2127 6.02363 21.2127H22.5713C23.3717 21.2127 24.0713 20.7809 24.4029 20.0877C24.5589 19.763 24.6186 19.4003 24.5748 19.0428C24.531 18.6852 24.3857 18.3477 24.156 18.0702ZM14.2945 25.5C15.0687 25.4994 15.8282 25.2892 16.4925 24.8919C17.1569 24.4945 17.7013 23.9248 18.0681 23.243C18.0854 23.2104 18.0939 23.1738 18.0929 23.1368C18.0918 23.0999 18.0813 23.0638 18.0622 23.0322C18.0431 23.0005 18.0161 22.9744 17.9839 22.9562C17.9518 22.9381 17.9154 22.9285 17.8785 22.9286H10.7117C10.6747 22.9284 10.6383 22.9379 10.606 22.956C10.5737 22.9741 10.5467 23.0003 10.5276 23.032C10.5084 23.0636 10.4978 23.0997 10.4967 23.1367C10.4957 23.1737 10.5042 23.2103 10.5215 23.243C10.8882 23.9247 11.4326 24.4944 12.0968 24.8917C12.7611 25.2891 13.5205 25.4993 14.2945 25.5Z" />
                </mask>
                <path
                  d="M24.156 18.0702L25.3114 17.1136L25.3102 17.1122L24.156 18.0702ZM23.894 17.7525L22.7379 18.7083L22.7392 18.7098L23.894 17.7525ZM20.5174 6.34179L19.3259 7.25304L19.3267 7.25412L20.5174 6.34179ZM17.5147 4.13893L16.7855 5.44976L16.8625 5.49259L16.944 5.52611L17.5147 4.13893ZM17.4708 4.10304L16.0335 4.53224L16.1246 4.83718L16.3316 5.07887L17.4708 4.10304ZM11.1188 4.10143L12.2387 5.09936L12.4605 4.85046L12.556 4.53104L11.1188 4.10143ZM11.0754 4.13625L11.6464 5.52331L11.7291 5.48928L11.8071 5.44568L11.0754 4.13625ZM4.69559 17.7509L5.85038 18.7082L5.8507 18.7078L4.69559 17.7509ZM4.43363 18.0686L5.58836 19.0261L5.5971 19.0153L4.43363 18.0686ZM4.18452 20.0839L5.53965 19.4408L5.53758 19.4364L4.18452 20.0839ZM24.4029 20.0877L23.0509 19.438L23.0498 19.4404L24.4029 20.0877ZM14.2945 25.5L14.2931 27L14.2957 27L14.2945 25.5ZM18.0681 23.243L19.3891 23.9537L19.3941 23.9443L18.0681 23.243ZM17.8785 22.9286V24.4286H17.88L17.8785 22.9286ZM10.7117 22.9286L10.7064 24.4286H10.7117V22.9286ZM10.5215 23.243L9.19547 23.9443L9.20052 23.9537L10.5215 23.243ZM25.3102 17.1122C25.1855 16.962 25.1813 16.955 25.0488 16.7952L22.7392 18.7098C22.7781 18.7568 22.9485 18.964 23.0017 19.0282L25.3102 17.1122ZM25.0501 16.7967C24.4526 16.0741 24.1427 15.6834 23.9163 15.0591C23.6786 14.4037 23.5024 13.3838 23.5024 11.4311H20.5024C20.5024 13.5139 20.6826 14.9419 21.0961 16.082C21.5209 17.2531 22.1568 18.0054 22.7379 18.7083L25.0501 16.7967ZM23.5024 11.4311C23.5024 9.1086 22.9456 7.04456 21.708 5.42945L19.3267 7.25412C20.0595 8.21044 20.5024 9.57497 20.5024 11.4311H23.5024ZM21.7089 5.43054C20.7957 4.23654 19.583 3.36788 18.0854 2.75175L16.944 5.52611C18.035 5.97497 18.7862 6.54739 19.3259 7.25304L21.7089 5.43054ZM18.2439 2.82809C18.3827 2.90533 18.5067 3.00662 18.61 3.1272L16.3316 5.07887C16.4597 5.2284 16.6134 5.354 16.7855 5.44976L18.2439 2.82809ZM18.9081 3.67383C18.2868 1.59342 16.5061 0 14.2945 0V3C14.9565 3 15.7237 3.49479 16.0335 4.53224L18.9081 3.67383ZM14.2945 0C12.083 0 10.303 1.59331 9.68165 3.67181L12.556 4.53104C12.8657 3.4949 13.6325 3 14.2945 3V0ZM9.99893 3.1035C10.0976 2.99272 10.2142 2.89921 10.3437 2.82682L11.8071 5.44568C11.9693 5.35507 12.1151 5.23802 12.2387 5.09936L9.99893 3.1035ZM10.5044 2.74919C8.74906 3.47181 7.35702 4.56813 6.42118 6.08888C5.49373 7.59602 5.0872 9.40117 5.0872 11.4295H8.0872C8.0872 9.79348 8.41461 8.57371 8.97617 7.66116C9.52935 6.76223 10.3814 6.04408 11.6464 5.52331L10.5044 2.74919ZM5.0872 11.4295C5.0872 13.3833 4.91115 14.4035 4.67357 15.0589C4.44748 15.6826 4.13796 16.0728 3.54049 16.794L5.8507 18.7078C6.43287 18.0051 7.06916 17.2531 7.49396 16.0814C7.90727 14.9413 8.0872 13.5128 8.0872 11.4295H5.0872ZM3.54081 16.7936C3.45726 16.8944 3.36451 17.0059 3.27016 17.1218L5.5971 19.0153C5.68061 18.9127 5.7625 18.8142 5.85038 18.7082L3.54081 16.7936ZM3.27896 17.1111C2.86631 17.6088 2.60486 18.2142 2.52556 18.8558L5.5029 19.2238C5.51189 19.1511 5.54153 19.0824 5.58831 19.026L3.27896 17.1111ZM2.52556 18.8558C2.44625 19.4974 2.55241 20.1483 2.83147 20.7314L5.53758 19.4364C5.50594 19.3703 5.49391 19.2965 5.5029 19.2238L2.52556 18.8558ZM2.82941 20.7271C3.42174 21.9751 4.67225 22.7127 6.02363 22.7127V19.7127C5.7668 19.7127 5.60838 19.5856 5.53964 19.4408L2.82941 20.7271ZM6.02363 22.7127H22.5713V19.7127H6.02363V22.7127ZM22.5713 22.7127C23.9233 22.7127 25.1642 21.9723 25.7561 20.735L23.0498 19.4404C22.9784 19.5895 22.8201 19.7127 22.5713 19.7127V22.7127ZM25.7549 20.7373C26.0352 20.1541 26.1423 19.5028 26.0637 18.8605L23.0859 19.225C23.0949 19.2979 23.0827 19.3719 23.0509 19.438L25.7549 20.7373ZM26.0637 18.8605C25.9851 18.2183 25.724 17.612 25.3114 17.1136L23.0005 19.0267C23.0474 19.0833 23.077 19.1521 23.0859 19.225L26.0637 18.8605ZM14.2957 27C15.3406 26.9992 16.3658 26.7155 17.2625 26.1792L15.7226 23.6046C15.2906 23.863 14.7967 23.9996 14.2933 24L14.2957 27ZM17.2625 26.1792C18.1592 25.6429 18.894 24.8739 19.3891 23.9537L16.7471 22.5324C16.5086 22.9757 16.1546 23.3462 15.7226 23.6046L17.2625 26.1792ZM19.3941 23.9443C19.5323 23.6829 19.6006 23.3902 19.5923 23.0947L16.5935 23.179C16.5872 22.9573 16.6384 22.7378 16.7421 22.5418L19.3941 23.9443ZM19.5923 23.0947C19.584 22.7991 19.4994 22.5108 19.3467 22.2576L16.7777 23.8068C16.6631 23.6169 16.5997 23.4006 16.5935 23.179L19.5923 23.0947ZM19.3467 22.2576C19.194 22.0044 18.9784 21.795 18.7209 21.6497L17.247 24.2627C17.0539 24.1538 16.8922 23.9967 16.7777 23.8068L19.3467 22.2576ZM18.7209 21.6497C18.4633 21.5045 18.1726 21.4283 17.8769 21.4286L17.88 24.4286C17.6582 24.4288 17.4402 24.3717 17.247 24.2627L18.7209 21.6497ZM17.8785 21.4286H10.7117V24.4286H17.8785V21.4286ZM10.7169 21.4286C10.4209 21.4275 10.1296 21.5032 9.87152 21.6481L11.3405 24.2639C11.1469 24.3726 10.9284 24.4293 10.7064 24.4286L10.7169 21.4286ZM9.87152 21.6481C9.61341 21.7931 9.39722 22.0024 9.24402 22.2557L11.8111 23.8082C11.6962 23.9982 11.534 24.1552 11.3405 24.2639L9.87152 21.6481ZM9.24402 22.2557C9.09083 22.509 9.00584 22.7977 8.99734 23.0936L11.9961 23.1798C11.9897 23.4017 11.926 23.6182 11.8111 23.8082L9.24402 22.2557ZM8.99734 23.0936C8.98883 23.3896 9.05712 23.6826 9.1955 23.9443L11.8475 22.5418C11.9513 22.738 12.0025 22.9578 11.9961 23.1798L8.99734 23.0936ZM9.20052 23.9537C9.69548 24.8737 10.4302 25.6427 11.3268 26.179L12.8668 23.6045C12.4349 23.3461 12.0809 22.9756 11.8425 22.5324L9.20052 23.9537ZM11.3268 26.179C12.2234 26.7153 13.2484 26.999 14.2931 27L14.2959 24C13.7926 23.9995 13.2988 23.8629 12.8668 23.6045L11.3268 26.179Z"
                  mask="url(#path-2-inside-1_566_3603)"
                  fill={"black"}

                />
              </svg>
                    </Badge>
                  </div>
                  <ModalNotifications
                    open={open}
                    handleClose={handleClose}
                    user={user}
                    handleHighlightModal={handleHighlightModal}
                    setHighData={setHighData}
                    handleViewd={handleViewd}
                  />
                </Stack>
              ) : null}
              <div className="header_right_content_Et">
                <div className="header_img_content">
                  {user.image_url ? (
                    <img
                      className="header_img_profil"
                      src={`${BaseURL}${user.image_url}`}
                      alt="profil_header"
                    />
                  ) : (
                    <Skeleton variant="rounded" width={40} height={40} />
                  )}
                </div>
              </div>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>

      {/* Highlight */}
      {viewHigh && HighData && ViewCardHigh()}
    </div>
  );
}

Header.propTypes = {
  showSearch: PropTypes.bool.isRequired,
  pro: PropTypes.bool.isRequired,
};
