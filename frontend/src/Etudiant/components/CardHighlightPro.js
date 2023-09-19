import { BaseURL, verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import { Visibility } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./style/CardHighlightPro.scss";
import PropTypes from "prop-types";

export default function CardHighlightPro({ highlight, clicked }) {
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleMouseOver = () => {
    setMuted(false);
    setPlaying(true);
    // playerRef.current?.play();
  };

  const handleMouseLeave = () => {
    setMuted(true);
    setPlaying(false);
    // playerRef.current?.pause();
  };

  return (
    <div
      className="cardHighlightPro"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={clicked}
    >
      <div className="cardHighlightPro_content">
        {highlight.type ? (
          <ReactPlayer
            ref={playerRef}
            url={`${BaseURL + highlight.file}`}
            playing={playing}
            controls={false}
            className="cardHighlightPro_video"
            loop
            muted={muted}
            height={300}
            width={250}
            light={`${BaseURL + highlight.professionnel.user.image_url}`}
          />
        ) : (
          <img
            src={verificationCloudinaryHighlight(highlight.file)}
            className="cardHighlightPro_img"
            alt="..."
            width="100%"
            height="100%"
          />
        )}
        <div className="cardHighlightPro_views">
          <Visibility />
          <p>{highlight.view.length}</p>
        </div>
      </div>
    </div>
  );
}

CardHighlightPro.propTypes = {
    highlight: PropTypes.object.isRequired,
    clicked: PropTypes.func.isRequired,
  
};