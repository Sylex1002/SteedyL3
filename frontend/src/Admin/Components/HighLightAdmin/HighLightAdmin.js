import React from "react";
import { GET_ALL_HIGHLIGHT_ADMIN } from "../../../Reducers/Admin/AdminHighlightSlice";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./HighLightAdmin.css";
import { BaseURL } from "../../../Helpers/ServiceApi";

// controls
const HightLightCard = ({ highlight }) => (
  <div className="HightLightCard">
    {highlight.type ? (
      <div>
        <video
          className="HightLightCard_video"
          controls
          loop
          autoPlay
          muted
          src={`${BaseURL}${highlight.file}`}
        ></video>
      </div>
    ) : (
      <div>
        <img
          className="HightLightCard_img"
          src={`${BaseURL}${highlight.file}`}
          alt="highlight"
        />
      </div>
    )}
  </div>
);


export default function HighLightAdmin() {
  const highlights = useSelector(GET_ALL_HIGHLIGHT_ADMIN);

  return (
    <div id="HighLightAdmin">
      <div className="HighLightAdmin_content">
        {highlights &&
          highlights.map((highlight, index) => (
            <HightLightCard key={index} highlight={highlight} />
          ))}
      </div>
    </div>
  );
}

HightLightCard.propTypes = {
  highlight: PropTypes.object.isRequired,
  type: PropTypes.bool.isRequired,
  file: PropTypes.string.isRequired,
};

