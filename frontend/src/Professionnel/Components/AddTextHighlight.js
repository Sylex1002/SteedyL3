import React from "react";
import "./styles/AddTextHighlight.scss";
import PropTypes from "prop-types";

export default function AddTextHighlight({ setText }) {
  return (
    <div className="addTextHighlight">
      <div className="cardHighlight">
        <textarea
          rows={8}
          placeholder="Mettre le texte ici"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
AddTextHighlight.propTypes = {
    setText: PropTypes.string.isRequired,
  
  };
  
