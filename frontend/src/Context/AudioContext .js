import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import PropTypes from "prop-types";

// create context
export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mutedFocus, setMutedFocus] = useState(false);
  const [ActiveFootFocus, setActiveFootFocus] = useState(false);
  const [ActiveCircleFocus, setActiveCircleFocus] = useState(false);
  const [cancelButtonFocus, setCancelButtonFocus] = useState(false);

  // =====================STATE FOR FOCUS======================
  const wavesurfer = useRef(null);
  const [audio, setAudio] = useState(null);
  const [DataNext, setDataNext] = useState(null);
  const [focusData, setfocusData] = useState(null);
  const [randomMode, setRandomMode] = useState(false);
  const [nextActive, setnextActive] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeAutoPlay, setActiveAutoPlay] = useState(false);
  const [wavesurferLoade, setWavesurferLoad] = useState(false);

  //   duration
  useEffect(() => {
    if (audio && audio.duration > 0) {
      setDuration(audio.duration);
    }
  }, [audio]);

  
  // vita
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("audioPosition", audio.currentTime);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [audio]);

  // vita
  useEffect(() => {
    const savedPosition = localStorage.getItem("audioPosition");
    const currentPosition = parseFloat(savedPosition);
    if (savedPosition && audio && audio.duration > 0) {
      audio.currentTime = currentPosition;
      setDuration(audio.duration);
    }
  }, [audio]);

  // update progeressed
  useEffect(() => {
    const updateProgress = () => {
      const percentage = audio.currentTime;
      setProgress(percentage);
      // duration
      setDuration(audio.duration);
      //
      if (wavesurfer.current && wavesurferLoade) {
        wavesurfer.current.setCurrentTime(percentage);
      }
    };
    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audio, wavesurferLoade]);

  // handle audio play focus
  const handlePlayFocus = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
      setMutedFocus(false);
    }
  };

  // handle play focus auto audio
  const handlePlayFocusAutoAudio = () => {
    audio.play();
    setIsPlaying(true);
  };

  // handle pause audio focus
  const handlePauseFocus = () => {
    audio.pause();
    setIsPlaying(false);
    setMutedFocus(true);
  };

  // handle pause audio focus auto
  const handlePauseFocusAutoAudio = () => {
    audio.pause();
    setIsPlaying(false);
  };

  // handle seekto audio focus
  const handleSeekTo = (value) => {
    if (audio.duration > 0) {
      audio.currentTime = value;
      setProgress(value);
      setDuration(audio.duration);
    }
  };

  const handleChangeAudio = useCallback(
    (audioFile) => {
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
      setAudio(new Audio(audioFile));
      setProgress(0);
    },
    [audio]
  );


  // handle volume
  const handleVolume = (value) => {
    setVolume(value);
    audio.volume = value;
  };

  // handle replay focus
  const handleReplayFocus = () => {
    audio.currentTime = 0;
  };

  // ===========ACTIVE FOOTER FOCUS================
  const handleActiveFooterFocus = async () => {
    audio.pause();
    setActiveFootFocus(!ActiveFootFocus);
    setIsPlaying(false);
  };

  const handleActiveCercle=()=>{
     setActiveCircleFocus(!ActiveCircleFocus);
  };

  // handle active random focus
  const handleActiverRandomFocus = async () => {
    setRandomMode(!randomMode);
  };

  const handleNextAudioFocus = () => {
    audio.pause();
    setIsPlaying(false);
  };

  // handle stop
  const handleStopFocus = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
      audio.currentTime = 0; // Remettre la lecture au début
    }
  };

  const audioContextValue = {
    ActiveCircleFocus,
    setActiveCircleFocus,
    nextActive,
    setnextActive,
    wavesurferLoade,
    setWavesurferLoad,
    activeAutoPlay,
    setActiveAutoPlay,
    activeModal,
    setActiveModal,
    wavesurfer,
    cancelButtonFocus,
    setCancelButtonFocus,
    randomMode,
    setRandomMode,
    focusData,
    setfocusData,
    DataNext,
    setDataNext,
    audio,
    isPlaying,
    progress,
    setProgress,
    duration,
    setAudio,
    setIsPlaying,
    volume,
    mutedFocus,
    setMutedFocus,
    ActiveFootFocus,
    setActiveFootFocus,
    handleVolume,
    handleReplayFocus,
    handleChangeAudio,
    handleSeekTo,
    handleActiveFooterFocus,
    handlePlayFocus,
    handlePauseFocus,
    handleActiverRandomFocus,
    handlePauseFocusAutoAudio,
    handlePlayFocusAutoAudio,
    handleNextAudioFocus,
    handleStopFocus,
    handleActiveCercle
  };

  return (
    <AudioContext.Provider value={audioContextValue}>
      {children}
    </AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
