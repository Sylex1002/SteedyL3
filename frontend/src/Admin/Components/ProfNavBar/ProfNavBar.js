import React from "react";
import PropTypes from "prop-types";
import "./ProfNavBar.css";

export default function ProfNavBar({ seturlChange }) {
  return (
    <div id="ProfNavBar">
      <div className="ProfNavBar_content">
        <ul className="ProfNavBar_ul">
          <li onClick={() => seturlChange("ProfAbout")}>About</li>
          <li onClick={() => seturlChange("CoursAdmin")}>Cours</li>
          <li onClick={() => seturlChange("Experience")}>Experience</li>
          <li onClick={() => seturlChange("HobbieAdmin")}>Hobbies</li>
          <li onClick={() => seturlChange("HighLightAdmin")}>Highlight</li>
          <li onClick={() => seturlChange("ProfFocus")}>Focus</li>
        </ul>
      </div>
    </div>
  );
}

ProfNavBar.propTypes = {
  seturlChange: PropTypes.string.isRequired,
};
