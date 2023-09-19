import { Stack } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import "./style/HighlightSmall.scss";

export default function HighlightSmall(props) {
  return (
    <div className="HighlightSmall">
      <Stack direction="column" spacing={1}>
        <div className="image">
          <img src={props.img} alt="..." />
        </div>
        <div className="username">
          <p>{props.name}</p>
        </div>
      </Stack>
    </div>
  );
}

HighlightSmall.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };
  