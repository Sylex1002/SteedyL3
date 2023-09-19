import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./styles/UploadAudioFocus.scss";
import { Stack } from "@mui/material";
import { Bars } from "react-loader-spinner";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import StopIcon from "@mui/icons-material/Stop";
import LoopIcon from "@mui/icons-material/Loop";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

// Our app
export function UploadAudioFocus({ setAudio, audio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState("");
  const audioRef = useRef(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // set audio file into state
    acceptedFiles.forEach((audioFile) => {
      setAudio(audioFile);
    });

    const reader = new FileReader();
    reader.onload = () => {
      const audioDataUrl = reader.result;
      setFiles(audioDataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "audio/*",
    onDrop,
  });

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (second) => {
    const minutes = Math.floor(second / 60);
    const remainingSeconds = Math.floor(second % 60);
    const formattedMinute = String(minutes).padStart(2, "00");
    const formattedSeconds = String(remainingSeconds).padStart(2, "00");
    return (
      <p>
        {formattedMinute} : {formattedSeconds}
      </p>
    );
  };

  return (
    <div className="uploadAudioFocus">
      <div className="droping">
        <div className="cardAudio">
          <div className="circle-drop">
            <div {...getRootProps()} className="drop-zone">
              <input {...getInputProps()} />
              {isDragActive ? (
                <Stack
                  direction="column"
                  spacing={2}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className={files[0] !== undefined && "p"}>Relacher</p>
                </Stack>
              ) : (
                <Stack
                  direction="column"
                  spacing={2}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <img src={imageImg} alt='steedy-drop' height='200px' width='200px' /> */}
                  {/* <p className={files[0] !== undefined && 'p'}>Ajouter audio</p> */}
                </Stack>
              )}
              <div className="loader">
                {audio === "" ? (
                  <Stack
                    direction="column"
                    spacing="12px"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AudiotrackIcon
                      sx={{
                        width: "60px",
                        height: "60px",
                        color: "var(--black)",
                      }}
                    />
                    <p>Ajouter un audio</p>
                  </Stack>
                ) : isPlaying ? (
                  <Bars
                    height="80"
                    width="80"
                    color="#f49030"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  <div className="paused"></div>
                )}
              </div>
            </div>
            <div className="time">{formatTime(progress)}</div>
          </div>
          <div className="audio">
            {files && (
              <div>
                <ReactPlayer
                  ref={audioRef}
                  playing={isPlaying}
                  controls={false}
                  url={files}
                  height={1}
                  width={1}
                  loop
                  onProgress={(second) => setProgress(second.playedSeconds)}
                />
              </div>
            )}
            <div className="controlBtn">
              <Stack direction="row" spacing="14px">
                <button
                  className="stop"
                  onClick={() => {
                    audioRef.current.seekTo(0);
                    setIsPlaying(false);
                  }}
                >
                  <StopIcon
                    sx={{ width: "28px", height: "28px", color: "#FFF" }}
                  />
                </button>
                <button className="play" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseIcon
                      sx={{
                        width: "40px",
                        height: "40px",
                        color: "var(--black)",
                      }}
                    />
                  ) : (
                    <PlayArrowIcon
                      sx={{ width: "40px", height: "40px", color: "var(--bg)" }}
                    />
                  )}
                </button>
                <button
                  className="stop"
                  onClick={() => {
                    audioRef.current.seekTo(0);
                  }}
                >
                  <LoopIcon
                    sx={{ width: "28px", height: "28px", color: "#FFF" }}
                  />
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UploadAudioFocus.propTypes = {
    setAudio: PropTypes.object.isRequired,
    audio: PropTypes.object.isRequired,
    
  };
  