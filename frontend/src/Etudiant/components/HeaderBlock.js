import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./style/HeaderBlock.scss";
import PropTypes from "prop-types";

export default function HeaderBlock({ redirection }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (redirection) {
      navigate(redirection);
    } else {
      navigate(-1);
    }
  };

  return (
    <div id="HeaderBlock">
      <div className="HeaderBlock_content">
        <div className="Logo">
          <Logo />
        </div>
        <div className="HeaderBlock_right">
          <div onClick={handleNavigate}>
            <CloseIcon className="HeaderBlock_close" />
          </div>
        </div>
      </div>
    </div>
  );
}

HeaderBlock.propTypes = {
  redirection: PropTypes.string.isRequired,
};
