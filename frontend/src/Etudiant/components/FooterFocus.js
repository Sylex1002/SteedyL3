import React, { useContext, useState, useCallback, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
// import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { focusLikeAction } from "../../Actions/ActionFocus";
import { AudioContext } from "../../Context/AudioContext ";
import {
  verificationCloudinaryFocus,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";
import VolumeDown from "@mui/icons-material/VolumeDown";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Cancel } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import Marquee from "react-fast-marquee";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import "./style/FooterFocus.scss";

export default function FooterFocus() {
  const { toggleOpenModal } = useContext(AppContext);

  const {
    nextActive,
    setnextActive,
    audio,
    wavesurfer,
    activeModal,
    cancelButtonFocus,
    DataNext,
    focusData,
    setfocusData,
    // focusCurrent,
    duration,
    isPlaying,
    progress,
    volume,
    wavesurferLoade,
    handleSeekTo,
    handleVolume,
    handleReplayFocus,
    handleActiveCercle,
    handlePlayFocus,
    handlePauseFocus,
    handleChangeAudio,
    handlePlayFocusAutoAudio,
  } = useContext(AudioContext);

  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const [Like_Active, setLike_Active] = useState(false);
  const [randomMode, setRandomMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // active next play
  useEffect(() => {
    if (nextActive) {
      handlePlayFocusAutoAudio();
      setnextActive(false);
    }
  }, [nextActive, handlePlayFocusAutoAudio, setnextActive]);

  // active like
  useEffect(() => {
    if (focusData) {
      if (focusData.liked_by.includes(user_connect.id)) {
        setLike_Active(true);
      } else {
        setLike_Active(false);
      }
    }
  }, [focusData, setLike_Active, user_connect]);

  // handle next focus
  const handleNextFoucs = useCallback(() => {
    if (DataNext && focusData) {
      const focusIndex = DataNext.findIndex(
        (focus) => focus.id === focusData.id
      );
      let nextLength = DataNext.length - 1;
      let indexNext = 0;
      // ab
      if (randomMode) {
        indexNext = Math.floor(Math.random() * nextLength);
      } else {
        indexNext = focusIndex + 1;
        if (indexNext > nextLength) {
          indexNext = 0;
        }
      }
      // new data next by length
      const nextFocus = DataNext[indexNext];
      if (nextFocus) {
        // handleStopFocus

        // const audioLink = `${API_CLOUDINARY}${nextFocus.podcast}`
        const audioLink = verificationCloudinaryFocus('/'+nextFocus.podcast);
        //
        // wave surfer audio
        if (wavesurfer.current && wavesurferLoade) {
          wavesurfer.current.load(audioLink);
        }
        // handle rhe change audio
        handleChangeAudio(audioLink);
        // add data into focus
        setfocusData(nextFocus);
        // navigate
        if (cancelButtonFocus) {
          if (activeModal) {
            navigate(`/etudiant/Focus/${nextFocus.id}`);
          } else {
            navigate(`/etudiant/Focus/${nextFocus.id}/listen`);
          }
        }
        // play
        setnextActive(true);
      } else {
        return (indexNext = 0);
      }
    }
  }, [
    DataNext,
    setnextActive,
    focusData,
    setfocusData,
    randomMode,
    navigate,
    cancelButtonFocus,
    handleChangeAudio,
    wavesurfer,
    activeModal,
    wavesurferLoade,
  ]);

  // handler next
  useEffect(() => {
    // handle next auto focus
    const handleAudioEnded = () => {
      handleNextFoucs();
    };

    if (audio) {
      audio.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [audio, handleNextFoucs]);

  // handle like
  const handleLikeFocus = async () => {
    const user_id = user_connect.id;
    const focus_id = focusData.id;
    const formdata = { user_id, focus_id };
    await dispatch(focusLikeAction(formdata)).then((res) => {
      // add data
      setfocusData({ ...res });
      //  if user like
      if (res.liked_by.includes(user_connect.id)) {
        setLike_Active(true);
      } else {
        setLike_Active(false);
      }
    });
  };

  // lecture aleatoire
  const handleAleatoirFocus = () => {
    setRandomMode(!randomMode);
  };

  // handle prev focus
  const handlePrevFoucs = () => {
    if (DataNext && focusData) {
      const focusIndex = DataNext.findIndex(
        (focus) => focus.id === focusData.id
      );
      let nextLength = DataNext.length - 1;
      let indexPrev = focusIndex - 1;
      // if prev negative
      if (indexPrev < 0) {
        indexPrev = nextLength;
      }
      // new data prev
      let newData = DataNext[indexPrev];

      // const audioLink = `${API_CLOUDINARY}${newData.podcast}`
      const audioLink = verificationCloudinaryFocus('/'+newData.podcast);

      if (wavesurfer.current && wavesurferLoade) {
        wavesurfer.current.load(audioLink);
      }

      handleChangeAudio(audioLink);
      // add into data
      setfocusData(newData);
      //
      if (cancelButtonFocus) {
        if (activeModal) {
          navigate(`/etudiant/Focus/${newData.id}`);
        } else {
          navigate(`/etudiant/Focus/${newData.id}/listen`);
        }
      }
      // play
      setnextActive(true);
    }
  };

  // handle navigate comment
  const handleNavigateComent = () => {
    // localStorage.setItem('audioPosition', focusCurrent);
    navigate(`/etudiant/focus/${focusData.id}/listen`);
  };

  // format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div id="FooterFocus">
      <div className="FooterFocus_ligne">
        <Slider
          aria-label="time-indicator"
          size="small"
          value={progress}
          min={0}
          max={duration ? duration : 0}
          step={1}
          onChange={(e) => handleSeekTo(e.target.value)}
          id="FooterFocusLire_ligne_progressA"
          sx={{
            color: "#f49030",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px 'rgb(255 255 255 / 16%)'}`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
      </div>
      <div className="FooterFocus_content">
        <div className="FooterFocus_left">
          <div className="FooterFocus_left_img">
            {focusData ? (
              <img
                src={verificationCloudinaryHighlight('/'+focusData.bg)}
                alt={focusData.titre}
              />
            ) : (
              <Skeleton variant="rounded" width={40} height={40} />
            )}
          </div>
          <div className="FooterFocus_left_dec">
            {focusData ? (
              <Marquee direction="left" speed={50} gradient={false}>
                <h4>{focusData.titre}</h4>
              </Marquee>
            ) : (
              <Skeleton variant="rounded" width={40} height={40} />
            )}
            <span>{formatTime(progress)} min</span>
          </div>
        </div>
        <div className="FooterFocus_center">
          <div className="FooterFocus_center_card">
            <ShuffleOutlinedIcon
              onClick={handleAleatoirFocus}
              className={
                randomMode
                  ? "active_aleatoire FooterFocus_icon"
                  : "Unactive_aleatoire FooterFocus_icon"
              }
            />
          </div>
          <div className="FooterFocus_center_card">
            <SkipPreviousOutlinedIcon
              onClick={handlePrevFoucs}
              className="FooterFocus_icon"
            />
          </div>
          <div className="FooterFocus_center_card">
            {isPlaying ? (
              <PauseCircleIcon
                onClick={handlePauseFocus}
                className="FooterFocus_icon_pause"
              />
            ) : (
              <PlayCircleFilledWhiteIcon
                onClick={handlePlayFocus}
                className="FooterFocus_icon_pause"
              />
            )}
          </div>
          <div className="FooterFocus_center_card">
            <SkipNextOutlinedIcon
              onClick={handleNextFoucs}
              className={"FooterFocus_icon"}
            />
          </div>
          <div className="FooterFocus_center_card">
            <CachedOutlinedIcon
              onClick={handleReplayFocus}
              className="FooterFocus_icon"
            />
          </div>
        </div>
        <div className="FooterFocus_right">
          <div className="FooterFocus_center_card">
            {Like_Active ? (
              <FavoriteOutlinedIcon
                onClick={handleLikeFocus}
                className="CardFocusHover_bts_icon_value CardFocusHover_bts_icon_value_active FooterFocus_icon"
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                onClick={handleLikeFocus}
                className="CardFocusHover_bts_icon_value FooterFocus_icon"
              />
            )}
          </div>
          <div className="FooterFocus_center_card">
            <ChatBubbleOutlineOutlinedIcon
              onClick={activeModal ? toggleOpenModal : handleNavigateComent}
              className="FooterFocus_icon"
            />
          </div>
          <Box sx={{ width: 200 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                aria-label="Volume"
                min={0}
                step={0.1}
                max={1}
                sx={{
                  color: "rgba(0,0,0,0.87)",
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 15,
                    height: 15,
                    backgroundColor: "rgba(0,0,0,0.87)",
                    "&:before": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                    },
                  },
                }}
                value={volume}
                onChange={(e) => handleVolume(e.target.value)}
              />
              <VolumeUp />
            </Stack>
          </Box>
          {!cancelButtonFocus && (
            <div className="FooterFocus_cancel">
              <Cancel
                className="FooterFocus_cancel_icon"
                onClick={handleActiveCercle}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
