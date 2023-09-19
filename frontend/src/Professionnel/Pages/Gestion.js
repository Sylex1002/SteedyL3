import React, { useEffect } from "react";
import "./styles/Gestion.scss";
import LayoutDashboard from "../Layout/LayoutDashboard";
import { motion } from "framer-motion";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getIdUserAction, getUserInfoAction } from "../../Actions/actionAuth";
import { BaseURL } from "../../Helpers/ServiceApi";


export default function Gestion() {
  const user = useSelector(GET_USER_INFO_CONNECT);
  const [cookies] = useCookies(["access_token", "refresh_token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // user information
  useEffect(() => {
    return async () => {
      if (cookies.access_token) {
        // get user id
        const decodeToken = await dispatch(
          getIdUserAction({ token: cookies.access_token })
        );
        if (decodeToken.token_type === "access") {
          await dispatch(getUserInfoAction(decodeToken.user_id));
        }
      }
    };
  }, [dispatch, cookies.access_token]);

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const Card = (format, img, title, text, duration, link) => {
    return (
      <motion.div
        initial={{ translateY: "100px" }}
        animate={{ translateY: "0" }}
        transition={{ duration: duration }}
        className="card"
        onClick={() => navigate(link)}
      >
        <div className="image">
          <div className="img">
            {format === "svg"
              ? img
              : format === "img" && <img src={img} alt="..." />}
          </div>
        </div>
        <div className="paragraphe">
          <Stack direction="column" spacing={0.7}>
            <p className="titre">{title}</p>
            <p className="texte">{text}</p>
          </Stack>
        </div>
      </motion.div>
    );
  };

  const fourPointImg = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 64 65"
        fill="none"
      >
        <path
          d="M23.4546 17.394C23.4546 21.1093 20.4426 24.1213 16.7273 24.1213C13.0119 24.1213 10 21.1093 10 17.394C10 13.6786 13.0119 10.6667 16.7273 10.6667C20.4426 10.6667 23.4546 13.6786 23.4546 17.394Z"
          stroke="#F49030"
          strokeOpacity="0.5"
          strokeWidth="4"
        />
        <path
          d="M53.9995 17.394C53.9995 21.1093 50.9875 24.1213 47.2722 24.1213C43.5569 24.1213 40.5449 21.1093 40.5449 17.394C40.5449 13.6786 43.5569 10.6667 47.2722 10.6667C50.9875 10.6667 53.9995 13.6786 53.9995 17.394Z"
          stroke="#F49030"
          strokeWidth="4"
        />
        <path
          d="M23.4546 47.9396C23.4546 51.6549 20.4426 54.6669 16.7273 54.6669C13.0119 54.6669 10 51.6549 10 47.9396C10 44.2243 13.0119 41.2123 16.7273 41.2123C20.4426 41.2123 23.4546 44.2243 23.4546 47.9396Z"
          stroke="#F49030"
          strokeWidth="4"
        />
        <path
          d="M53.9995 47.9396C53.9995 51.6549 50.9875 54.6669 47.2722 54.6669C43.5569 54.6669 40.5449 51.6549 40.5449 47.9396C40.5449 44.2243 43.5569 41.2123 47.2722 41.2123C50.9875 41.2123 53.9995 44.2243 53.9995 47.9396Z"
          stroke="#F49030"
          strokeOpacity="0.5"
          strokeWidth="4"
        />
      </svg>
    );
  };

  return (
    <LayoutDashboard>
      <motion.div
        initial={{ translateX: "-100px" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        Gérer & Voir les données
      </motion.div>

      <div className="cards">
        <Stack direction="column" spacing='24px'>
          {/* Profil */}
          {Card(
            "img",
            `${BaseURL}${user.image_url}`,
            "Votre profil",
            lorem,
            0.3,
            "/professionnel/gerer-voir-les-donnees/mon-profil"
          )}

          {/* Highlight */}
          {Card(
            "svg",
            fourPointImg(),
            "Highlight",
            lorem,
            0.6,
            "/professionnel/gerer-voir-les-donnees/gestion-highlight"
          )}

          {/* Focus */}
          {Card(
            "svg",
            fourPointImg(),
            "Focus",
            lorem,
            0.9,
            "/professionnel/gerer-voir-les-donnees/gestion-focus"
          )}
        </Stack>
      </div>
    </LayoutDashboard>
  );
}
