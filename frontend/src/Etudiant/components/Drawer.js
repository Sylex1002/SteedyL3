import React from "react";
import { useMatch, Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import "./style/Drawer.scss";
import lockIcon from "../../Images/icons/lock.svg";
import focusIcon from "../../Images/icons/radio.svg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import highlightIcon from "../../Images/icons/smartphone.svg";
import { logoutUserInfoAction } from "../../Actions/actionAuth";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";

import {
  GET_ALL_NOTIFICATE_VIEWED_LIST,
  GET_MY_NOTIFICATION_MSG,
} from "../../Reducers/ReducerNotification";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

import { Badge } from "@mui/material";
import PropTypes from "prop-types"; // Importez PropTypes
import { deleteCookie } from "../../Helpers/Utils";


export default function DrawerLeft({ handleOpenDrop }) {
  const match = useMatch("/:fonction/:menu/");
  const menuUrl = match?.params?.menu;
  const list_notificate = useSelector(GET_ALL_NOTIFICATE_VIEWED_LIST);
  const { openDrawer } = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const msg_notificates = useSelector(GET_MY_NOTIFICATION_MSG);


  const deconnecter = async (e) => {
    e.preventDefault();
    await dispatch(logoutUserInfoAction());
    deleteCookie("access_token");
    navigate("/login");
  };

  return (
    <div
      className="drawer_content"
      style={!openDrawer ? { width: "5%" } : { width: "15%" }}
    >
      <DraawerWrite
        handleOpenDrop={handleOpenDrop}
        deconnecter={deconnecter}
        menuUrl={menuUrl}
        open={openDrawer}
        countNotification={list_notificate.length}
        messagecoute={msg_notificates.length}
      />
    </div>
  );
}

// Draawer Write
const DraawerWrite = ({
  handleOpenDrop,
  deconnecter,
  menuUrl,
  open,
  countNotification,
  messagecoute,
}) => (
  <div id="DraawerWrite">
    <div className="drawer">
      <div className="list_button" style={{ paddingInline: "5px" }}>
        <div
          onClick={handleOpenDrop}
          className="item dropDrawer"
          title="drop"
          style={{
            width: "100%",
            position: "relative",
            display: "inline-flex",
            flexDirection: "row",
          }}
        >
          <div
            className="icon"
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                paddingInline: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M4 8.28564L24.0837 8.29391"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.85714 4H21.1349C22.7169 4 24 5.27517 24 6.85714V21.1429C24 22.7248 22.7248 24 21.1429 24H6.85714C5.27517 24 4.00617 22.726 4.00555 21.144L4 6.85714C3.99939 5.27517 5.27517 4 6.85714 4Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.1431 8.28564V23.9999"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {open && (
            <div
              className="nameLink"
              style={{
                flex: "1",
                width: "50%",
                height: "40px",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <ChevronLeftIcon />
            </div>
          )}
        </div>
      </div>

      <div className={menuUrl === "decouvrir" ? "listMenu active" : "listMenu"}>
        <Link to="/etudiant/decouvrir" className="item" title="Decouvrir">
          <div
            className="icon"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExploreOutlinedIcon sx={{ width: "20px", height: "20px" }} />
          </div>
          {open && (
            <div className="nameLink">
              <p>Decouvrir</p>
            </div>
          )}
        </Link>
      </div>

      <div
        className={menuUrl === "highlights" ? "listMenu active" : "listMenu"}
      >
        <Link to="/etudiant/highlights" className="item" title="Highlight">
          <div className="icon" style={{ textAlign: "center" }}>
            <img src={highlightIcon} alt="..." width="18px" height="18px" />
          </div>
          {open && (
            <div className="nameLink">
              <p>Highlight</p>
            </div>
          )}
        </Link>
      </div>

      <div className={menuUrl === "focus" ? "listMenu active" : "listMenu"}>
        <Link to="/etudiant/focus" className="item" title="Focus">
          <div className="icon" style={{ textAlign: "center" }}>
            <img src={focusIcon} alt="..." width="18px" height="18px" />
          </div>
          {open && (
            <div className="nameLink">
              <p>Focus</p>
            </div>
          )}
        </Link>
      </div>
      <div className={menuUrl === "messages" ? "listMenu active" : "listMenu"}>
        <Link to="/etudiant/messages" className="item" title="Message">
          <div className="icon" style={{ textAlign: "center" }}>
            <Badge
              badgeContent={messagecoute}
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
          {open && (
            <div className="nameLink">
              <p>Message</p>
            </div>
          )}
        </Link>
      </div>

      <div className={menuUrl === "community" ? "listMenu active" : "listMenu"}>
        <Link to="/etudiant/community/" className="item" title="Message">
          <div className="icon" style={{ textAlign: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M19.9542 17.031C19.5103 16.6714 18.987 16.4273 18.4311 16.3171L18.5 13.5H19.25C19.25 13.4998 19.25 13.4996 19.25 13.4993C19.25 13.2451 19.2318 12.9949 19.1968 12.75H24.25C24.8018 12.75 25.25 13.1982 25.25 13.75V15.7243L25.2461 15.7767C25.1207 16.5927 24.708 17.1744 23.9944 17.5802C23.2952 17.9777 22.278 18.2197 20.9155 18.2546C20.6919 17.7821 20.3643 17.3632 19.9542 17.031ZM3.75 12.75H8.80322C8.76812 12.9951 8.75 13.2455 8.75 13.5C8.75 14.5356 9.05075 15.5024 9.56891 16.3162C8.46895 16.5331 7.55453 17.2651 7.08629 18.2506C5.79395 18.2042 4.80988 17.9681 4.11171 17.5841C3.37188 17.1772 2.927 16.5929 2.75681 15.7859L2.75 15.7144V13.75C2.75 13.1982 3.19821 12.75 3.75 12.75ZM17.75 18.75C18.3018 18.75 18.75 19.1982 18.75 19.75V21.7243L18.7461 21.7767C18.6207 22.5927 18.208 23.1744 17.4944 23.5802C16.7369 24.0109 15.6059 24.259 14.067 24.259C12.5353 24.259 11.394 24.0144 10.6117 23.5841C9.87188 23.1772 9.427 22.5929 9.25681 21.7859L9.25 21.7144V19.75C9.25 19.1982 9.69821 18.75 10.25 18.75H17.75ZM14 10.75C14.7293 10.75 15.4288 11.0397 15.9445 11.5555C16.4603 12.0712 16.75 12.7707 16.75 13.5C16.75 14.2293 16.4603 14.9288 15.9445 15.4445C15.4288 15.9603 14.7293 16.25 14 16.25C13.2707 16.25 12.5712 15.9603 12.0555 15.4445C11.5397 14.9288 11.25 14.2293 11.25 13.5C11.25 12.7707 11.5397 12.0712 12.0555 11.5555C12.5712 11.0397 13.2707 10.75 14 10.75ZM20.5 4.75C21.2293 4.75 21.9288 5.03973 22.4445 5.55546C22.9603 6.07118 23.25 6.77065 23.25 7.5C23.25 8.22935 22.9603 8.92882 22.4445 9.44454C21.9288 9.96027 21.2293 10.25 20.5 10.25C19.7707 10.25 19.0712 9.96027 18.5555 9.44454C18.0397 8.92882 17.75 8.22935 17.75 7.5C17.75 6.77065 18.0397 6.07118 18.5555 5.55546C19.0712 5.03973 19.7707 4.75 20.5 4.75ZM7.5 4.75C8.22935 4.75 8.92882 5.03973 9.44454 5.55546C9.96027 6.07118 10.25 6.77066 10.25 7.5C10.25 8.22935 9.96027 8.92882 9.44454 9.44454C8.92882 9.96027 8.22935 10.25 7.5 10.25C6.77065 10.25 6.07118 9.96027 5.55546 9.44454C5.03973 8.92882 4.75 8.22935 4.75 7.5C4.75 6.77065 5.03973 6.07118 5.55546 5.55546C6.07118 5.03973 6.77065 4.75 7.5 4.75Z"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          {open && (
            <div className="nameLink">
              <p>Community</p>
            </div>
          )}
        </Link>
      </div>

      <div
        className={menuUrl === "notifications" ? "listMenu active" : "listMenu"}
      >
        <Link
          to="/etudiant/notifications"
          className="item"
          title="Notification"
        >
          <div className="icon" style={{ textAlign: "center" }}>
            <Badge
              badgeContent={countNotification}
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
                  fill={menuUrl === "notifications" ? "var(--bg)" : "black"}
                  mask="url(#path-2-inside-1_566_3603)"
                />
              </svg>
            </Badge>
          </div>
          {open && (
            <div
              className="nameLink"
              style={
                menuUrl === "notifications"
                  ? { color: "var(--bg)" }
                  : { color: "#000" }
              }
            >
              <p>Notification</p>
            </div>
          )}
        </Link>
      </div>
      <div className={menuUrl === "Createurs" ? "listMenu active" : "listMenu"}>
        <Link
          to="/etudiant/Createurs"
          className={menuUrl === "createurs" ? "item active" : "item"}
          title="Createurs"
        >
          <div className="icon" style={{ textAlign: "center" }}>
            {/* <ParkOutlinedIcon /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M16.646 23.5049C18.5456 20.7599 19.1253 18.2376 19.2726 16.678C20.2533 17.035 21.053 17.4749 21.6309 17.962C22.355 18.5723 22.6832 19.2108 22.6832 19.8333V23.85H16.4072L16.646 23.5049ZM15.4705 23.2425L15.5723 23.85H12.4273L12.5292 23.2425L13.4742 17.6075L13.5092 17.3987L13.4145 17.2093L12.7423 15.8648C13.155 15.8347 13.5747 15.8167 13.9998 15.8167C14.425 15.8167 14.8447 15.8347 15.2574 15.8648L14.5851 17.2093L14.4904 17.3987L14.5255 17.6075L15.4705 23.2425ZM11.3537 23.5049L11.5925 23.85H5.3165V19.8333C5.3165 19.2121 5.64629 18.5735 6.37268 17.9624C6.95147 17.4754 7.7506 17.0359 8.72713 16.679C8.87458 18.2387 9.45451 20.7605 11.3537 23.5049ZM13.9998 4.15C16.2192 4.15 18.0165 5.94732 18.0165 8.16667C18.0165 10.386 16.2192 12.1833 13.9998 12.1833C11.7805 12.1833 9.98317 10.386 9.98317 8.16667C9.98317 5.94732 11.7805 4.15 13.9998 4.15Z"
                stroke="black"
                strokeWidth="1.3"
              />
            </svg>
          </div>
          {open && (
            <div className="nameLink">
              <p>Createurs</p>
            </div>
          )}
        </Link>
      </div>
      {/* <div className='listMenu'>
                <div className='item' title='Communaute'>
                    <div className='icon' style={{ textAlign: 'center' }}>
                        <PeopleOutlinedIcon />
                    </div>
                    {open &&
                        <div className='nameLink'>
                            <p>Communaute</p>
                        </div>
                    }
                </div>
            </div> */}
      <div className="disconnect">
        <button onClick={deconnecter} className="drawerBtn" title="Deconnecter">
          {open ? (
            <div className="deconnectLink">
              <p>Deconnecter</p>
            </div>
          ) : (
            <div className="deconnectLink">
              {/* <AdjustOutlinedIcon /> */}
              <img src={lockIcon} alt="..." width="18px" height="18px" />
            </div>
          )}
        </button>
      </div>
    </div>
  </div>
);

DrawerLeft.propTypes = {
  handleOpenDrop: PropTypes.func.isRequired,
  // open: PropTypes.bool.isRequired,
};

DraawerWrite.propTypes = {
  handleOpenDrop: PropTypes.func.isRequired,
  deconnecter: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  menuUrl: PropTypes.string.isRequired,
  countNotification: PropTypes.number.isRequired,
  messagecoute: PropTypes.number.isRequired,
};
