import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/CardAllProfessionnelle.scss";
import Stack from "@mui/material/Stack/Stack";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import chatLogo from "../../Images/chatCard.png";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import { AudioContext } from "../../Context/AudioContext ";
import PropTypes from "prop-types";

import {
  post_follower_user_all_Action,
  post_unfollower_user_all_Action,
} from "../../Actions/actionAuth";
import { AppContext } from "../../Context/AppContext";
import { BaseURL } from "../../Helpers/ServiceApi";

export default function CardAllProfessionnel(props) {
  // audio context
  const { mutedFocus, setIsPlaying, setMutedFocus, ActiveFootFocus } =
    useContext(AudioContext);
  const { Uuid } = useContext(AppContext);

  // props
  const { pro, width } = props;

  // state
  const user_conect = useSelector(GET_USER_INFO_CONNECT);
  const [Duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [percent, setPercent] = useState(0);
  const [abonne, setAbonne] = useState(false);
  const dispatch = useDispatch();
  const AudioRef = useRef(null);
  const navigate = useNavigate();

  // abonnes
  useEffect(() => {
    if (pro) {
      const isAbonne = pro.user.following.some(
        (follower) => follower.id === Uuid
      );
      setAbonne(isAbonne);
    }
  }, [pro, user_conect]);

  // handleFollower
  const handleFollower = () => {
    const formdata = {
      follower: user_conect.id,
      user: pro.user.id,
    };
    // dispatch
    dispatch(post_follower_user_all_Action(formdata));
  };

  // handleUnFollower
  const handleUnFollower = () => {
    const formdata = {
      follower: user_conect.id,
      user: pro.user.id,
    };
    // dispatch
    dispatch(post_unfollower_user_all_Action(formdata));
  };

  // handlePlayOver
  const handlePlayOver = async () => {
    AudioRef.current?.seekTo(0);
    setPlaying(true);
    if (ActiveFootFocus) {
      setIsPlaying(false);
    }
  };

  // handlePauseOut
  const handlePauseOut = async () => {
    if (ActiveFootFocus) {
      if (mutedFocus) {
        setIsPlaying(false);
      } else {
        setMutedFocus(false);
        setIsPlaying(true);
      }
    }

    setPlaying(false);
  };

  // dureCard
  const dureCard = (e) => {
    setDuration(e);
  };

  // handleProgress
  const handleProgress = (playedSeconds) => {
    setPercent(playedSeconds);
  };

  const handleNavigateChat = () => {
    navigate(`/etudiant/messages/${pro.user.matricule}`);
  };

  return (
    <motion.div
      className="CardAllProfessionnel"
      id="waveform"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: props.duree }}
      style={{ width: width }}
      onMouseOver={handlePlayOver}
      onMouseLeave={handlePauseOut}
    >
      <div>
        <div className="profilsImage">
          <Stack
            direction="column"
            spacing={1}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link to={`/etudiant/createur/${pro.id}/`}>
              <div className="profilPhoto_content">
                <div className="profilPhoto">
                  <div className="profilPhoto_img">
                    <img
                      src={`${BaseURL}${pro.user.image_url}`}
                      alt="..."
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <ReactPlayer
                    ref={AudioRef}
                    url={`${BaseURL + pro.podcast}`}
                    controls={false}
                    playing={playing}
                    height={1}
                    width={1}
                    onProgress={({ playedSeconds }) =>
                      handleProgress(playedSeconds)
                    }
                    onDuration={dureCard}
                  />
                  <div className="hoveringAction">
                    <CircularProgressbar
                      maxValue={Duration}
                      value={percent}
                      strokeWidth={2.4}
                      styles={{
                        path: {
                          stroke: "#f49030",
                        },
                        trail: {
                          stroke: "#FFF",
                        },
                      }}
                    />
                  </div>
                  <div className="rounded">
                    <div className="point"></div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="nameStatut">
              <Stack direction="column">
                <div className="info" style={{ lineHeight: "7px" }}>
                  <p style={{ textAlign: "center", fontWeight: 700 }}>
                    {pro.user.first_name} {pro.user.last_name}
                  </p>
                </div>
                <div className="statut">
                  <span>{pro.user.domain}</span>
                </div>
              </Stack>
            </div>
            <div className="CardAllProfessionnel_abonne">
              <PeopleOutlinedIcon />
              <span>
                {pro.user.following.length} Abonne
                {pro.user.following.length > 1 ? "s" : ""}
              </span>
            </div>
          </Stack>
        </div>
      </div>

      <div>
        <div className="btnBottom_card_pro" style={{ width: "100%" }}>
          <Stack direction="row" spacing={1}>
            {abonne ? (
              <button
                onClick={handleUnFollower}
                className="card_pro_btn1"
                style={{
                  width: "100%",
                  fontWeight: 700,
                }}
              >
                Desabonner
              </button>
            ) : (
              <button
                onClick={handleFollower}
                className="card_pro_btn1"
                style={{ width: "100%", fontWeight: 700 }}
              >
                S`abonner
              </button>
            )}
            {abonne && (
              <button
                onClick={handleNavigateChat}
                className="card_pro_btn2"
                style={{ width: "30%" }}
              >
                <img src={chatLogo} alt="..." />
              </button>
            )}
          </Stack>
        </div>
      </div>
    </motion.div>
  );
}

CardAllProfessionnel.propTypes = {
  pro: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  duree: PropTypes.number.isRequired,
};
