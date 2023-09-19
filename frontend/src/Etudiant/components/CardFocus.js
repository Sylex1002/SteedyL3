import React, { useState, useContext, useRef } from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";

import {
  BaseURL,
  verificationCloudinaryFocus,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";

import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { focusLikeAction } from "../../Actions/ActionFocus";
import { AudioContext } from "../../Context/AudioContext ";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import { dataParser } from "../../Helpers/Utils";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import "./style/CardFocus.scss";

export default function CardFocus({ focus , maxWidth}) {
  const { toggleOpenModal } = useContext(AppContext);

  const {
    mutedFocus,
    ActiveFootFocus,
    handlePlayFocusAutoAudio,
    handlePauseFocusAutoAudio,
  } = useContext(AudioContext);

  const user = focus.professionnel.user;
  const AudioHoverRef = useRef(null);
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const [ActiveComment, setActiveComment] = useState(false);
  const [focusLikeActive, setfocusLikeActive] = useState(false);
  const [focusLikeData, setfocusLikeData] = useState(focus.liked_by);
  const Likes_filter = focusLikeData.filter(
    (userLike_id) => userLike_id === user_connect.id
  );
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // navigate into lire focus
  const GetFocusDataLire = () => {
    if (focus.podcast) {
      navigate(`/etudiant/focus/${focus.id}`);
    } else {
      navigate(-1);
    }
  };

  // handle focus events like active
  const handleFocusLikeActive = () => {
    setfocusLikeActive(!focusLikeActive);
  };

  // handle play auto hover
  const handlePlayAutoHover = async () => {
    const duration = 10000; // Durée en millisecondes pendant laquelle le son doit être joué
    const interval = 1000; // Interval entre chaque incrémentation du compteur de secondes
    let countSecond = 0; // Compteur de secondes

    // return 0 curernt tome
    if (AudioHoverRef.current) {
      AudioHoverRef.current.currentTime = 0;
    }

    // Lecture du son
    const playAudio = () => {
      setMuted(false);
      setPlaying(true);
    };

    // Mise en pause du son
    const pauseAudio = () => {
      setMuted(true);
      setPlaying(false);
    };

    // r
    const reset = () => {
      countSecond = 0;
      if (AudioHoverRef.current) {
        AudioHoverRef.current?.seekTo(0);
      }
    };

    // Réinitialisation du compteur de secondes et remise à zéro de la lecture du son
    if (ActiveFootFocus) {
      handlePauseFocusAutoAudio();
    }

    // Sinon, on commence à jouer le son
    playAudio();
    // On incrémente le compteur de secondes toutes les secondes pendant la durée définie
    const intervalId = setInterval(() => {
      countSecond++;
      // Si la durée de lecture est écoulée, on met le son en pause et on réinitialise le compteur de secondes
      if (countSecond >= duration / interval) {
        pauseAudio();
        reset();
        clearInterval(intervalId);
      }
    }, interval);
  };

  // handle pause auto leave
  const handlePauseAutoLeave = async () => {
    setMuted(true);
    setPlaying(false);
    // play footer
    if (ActiveFootFocus) {
      if (!mutedFocus) {
        handlePlayFocusAutoAudio();
      } 
    }
  };

  // handle like focus
  const handleLikeFocus = async () => {
    const user_id = user_connect.id;
    const focus_id = focus.id;
    const formdata = { user_id, focus_id };
    await dispatch(focusLikeAction(formdata)).then((res) => {
      setfocusLikeData([...res.liked_by]);
    });
  };

  // handle active comment
  const handleActiveComment = () => {
    setActiveComment(!ActiveComment);
  };

  // duration of focus change
  const dureCard = (e) => {
    if (e > 0) {
      let durationInMinutes = Math.floor(e / 60);
      setDuration(durationInMinutes);
    } else {
      setDuration(0);
    }
  };

  // handle navigate comment
  const handleNavigateComent = () => {
    navigate(`/etudiant/focus/${focus.id}/listen`);
  };

  const handleNavigateProf = () => {
    navigate(`/etudiant/createur/${focus.professionnel.id}`);
  };

  return (
    <div
      id="CardFocus"
      onMouseOver={handlePlayAutoHover}
      onMouseLeave={handlePauseAutoLeave}
      style={{
        background: `url(${verificationCloudinaryHighlight('/' +
          focus.bg
        )}) center/cover no-repeat `,
        width:maxWidth,
      }}
    >
      <div className="CardFocus_content">
        <div className="CardFocus_head">
          <Stack direction="row" spacing={1}>
            <div className="CardFocus_head_img">
              <img
                onClick={handleNavigateProf}
                src={`${BaseURL}${user.image_url}`}
                className="CardFocus_img"
                alt="profil"
              />
            </div>
            <div className="CardFocus_head_info">
              <h4>
                {user.first_name} {user.last_name}
              </h4>
              <span className="CardFocus_head_info_dec">
                {dataParser(focus.createdAt)}
              </span>
            </div>
          </Stack>
        </div>
        <div className="CardFocus_body">
          <div className="CardFocus_audio">
            <ReactPlayer
              ref={AudioHoverRef}
              playing={playing}
              controls={false}
              url={verificationCloudinaryFocus('/' + focus.podcast)}
              muted={muted}
              height={1}
              width={1}
              loop
              onDuration={dureCard}
            />
          </div>
          <CardFocusNonHover focus={focus} />
          <CardFocusHover
            handleFocusLikeActive={handleFocusLikeActive}
            handlePauseAutoLeave={handlePauseAutoLeave}
            handleActiveComment={handleActiveComment}
            GetFocusDataLire={GetFocusDataLire}
            handleLikeFocus={handleLikeFocus}
            focusLikeActive={focusLikeActive}
            toggleOpenModal={toggleOpenModal}
            AudioHoverRef={AudioHoverRef}
            focusLikeData={focusLikeData}
            Likes_filter={Likes_filter}
            activeBtnPlay={playing}
            duration={duration}
            focus={focus}
            handleNavigateComent={handleNavigateComent}
          />
        </div>
      </div>
    </div>
  );
}

CardFocus.propTypes = {
  focus: PropTypes.object.isRequired,
  maxWidth: PropTypes.string.isRequired,
};

// card facus non hover
const CardFocusNonHover = ({ focus }) => (
  <div id="CardFocusNonHover">
    <div className="CardFocusNonHover_body"></div>
    <div className="CardFocus_foot">
      <span>{focus.titre.slice(0, 50)}</span>
      <p>{focus.description.slice(0, 100)}</p>
    </div>
  </div>
);

CardFocusNonHover.propTypes = {
    focus: PropTypes.object.isRequired,
  };

// card focus hover
const CardFocusHover = ({
  handleNavigateComent,
  GetFocusDataLire,
  handleLikeFocus,
  activeBtnPlay,
  focusLikeData,
  Likes_filter,
  duration,
  focus,
}) => (
  <div id="CardFocusHover">
    <div className="CardFocusHover_content">
      <div className="CardFocusHover_content_left">
        <div
          className="CardFocusHover_content_left_click"
          onClick={GetFocusDataLire}
        ></div>
        <div className="CardFocusHover_content_left_play">
          <div className="CardFocusHover_play_content">
            <div className="CardFocusHover_play" onClick={GetFocusDataLire}>
              <div className="CardFocusHover_play_btns">
                {!activeBtnPlay && <PlayCircleOutlineOutlinedIcon />}
                {activeBtnPlay && <PauseCircleFilledOutlinedIcon />}
              </div>
              <span className="CardFocusHover_play_min">{duration} min</span>
            </div>
          </div>
          <div className="CardFocusHover_play_vide"></div>
        </div>
      </div>
      <div className="CardFocusHover_content_right">
        <div className="CardFocusHover_content_right_vide"></div>
        <div className="CardFocusHover_content_right_content">
          <div className="CardFocusHover_bts">
            <div className="CardFocusHover_bts_icons">
              {Likes_filter[0] !== undefined ? (
                <FavoriteOutlinedIcon
                  onClick={handleLikeFocus}
                  className="CardFocusHover_bts_icon_value CardFocusHover_bts_icon_value_active"
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  onClick={handleLikeFocus}
                  className="CardFocusHover_bts_icon_value "
                />
              )}
            </div>
            <span>{focusLikeData.length}</span>
          </div>
          <div className="CardFocusHover_bts">
            <div className="CardFocusHover_bts_icons">
              <ChatBubbleOutlinedIcon
                onClick={handleNavigateComent}
                className="CardFocusHover_bts_icon_value"
              />
            </div>
            <span>{focus ? focus.comment_count : 0}</span>
          </div>
          <div className="CardFocusHover_bts">
            <div className="CardFocusHover_bts_icons">
              <ShareOutlinedIcon className="CardFocusHover_bts_icon_value" />
            </div>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

CardFocusHover.propTypes = {
    handleNavigateComent: PropTypes.func.isRequired,
    GetFocusDataLire: PropTypes.object.isRequired,
    handleLikeFocus: PropTypes.func.isRequired,
    activeBtnPlay: PropTypes.bool.isRequired,
    focusLikeData: PropTypes.array.isRequired,
    Likes_filter: PropTypes.array.isRequired,
    duration: PropTypes.number.isRequired,
    focus: PropTypes.object.isRequired,
    
  };