import React, { useState, useRef, useContext, useEffect } from "react";
import { Stack } from "@mui/material";
import playBtn from "../../Images/play.png";
import pauseBtn from "../../Images/pause.png";
import { AudioContext } from "../../Context/AudioContext ";
import { verificationCloudinaryFocus } from "../../Helpers/ServiceApi";
import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

import "./style/FocusProfilPro.scss";

export default function FocusProfilPro(props) {
  const { playActive, setPlayActive, img, name, title, listen, focus } = props;

  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const AudioRef = useRef(null);
  const urlAudio = verificationCloudinaryFocus('/'+focus?.podcast);
  const {
    audio,
    mutedFocus,
    ActiveFootFocus,
    handlePlayFocusAutoAudio,
    handlePauseFocusAutoAudio,
  } = useContext(AudioContext);

  // auto pause et play
  useEffect(() => {
    if (playActive === focus.id && play) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [playActive, focus, play]);

  // tooglr play
  const handleTooglePlay = () => {
    setPlayActive(focus.id);
    if (play) {
      // pasue
      setPlay(false);
      // play
      if (!mutedFocus && audio !== null) {
        handlePlayFocusAutoAudio();
      }
    } else {
      // pause focus footer
      if (ActiveFootFocus) {
        handlePauseFocusAutoAudio();
      }
      // play bar
      setPlay(true);
      if (AudioRef.current.currentTime > 0) {
        AudioRef.current.currentTime = 0;
      }
    }
  };

  // duration
  const dureCard = (e) => {
    if (e !== Infinity) {
      let durationInMinutes = Math.floor(e / 60);
      setDuration(durationInMinutes);
    } else {
      setDuration(0);
    }
  };

  return (
    <div className="focusProfilPro">
      <Stack direction="row" spacing={1}>
        <div className="smallProfil">
          <img src={img} alt="..." />
        </div>
        <div className="name">
          <p>{name}</p>
        </div>
        <div className="task">
          <Marquee direction="left" speed={30} gradient={false}>
            <p>{title}</p>
          </Marquee>
        </div>
        <div className="time">
          <p>{duration} min</p>
        </div>
        <div className="plays">
          <p>{listen} listenners</p>
        </div>
        <div className="btnPlay" style={{ justifyContent: "center" }}>
          <div className="play" onClick={handleTooglePlay}>
            <ReactPlayer
              ref={AudioRef}
              playing={play}
              controls={false}
              url={urlAudio}
              height={1}
              width={1}
              loop
              onDuration={dureCard}
            />
            <img src={!play ? playBtn : pauseBtn} alt="..." />
          </div>
        </div>
      </Stack>
    </div>
  );
}

FocusProfilPro.propTypes = {
  playActive: PropTypes.string.isRequired,
  setPlayActive: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  listen: PropTypes.string.isRequired,
  focus: PropTypes.object.isRequired,
};
