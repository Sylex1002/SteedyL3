import React from "react";
import PropTypes from "prop-types";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Widget.css";

export default function Widget(props) {
  const { len, title, Icon, linkValue, link, style } = props;
  const diff = 20;

  return (
    <div className="Widget">
      <div className="Widget-left">
        <span className="Widget_title">{title}</span>
        <span className="Widget_counter">{len}</span>
        <span className="Widget_link">
          <Link to={link}>{linkValue}</Link>
        </span>
      </div>
      <div className="Widget-right">
        <div className="Widget_pecentage Widget_positive">
          <KeyboardArrowUp />
          {diff} %
        </div>
        <Icon style={style} className="Widget_icon" />
      </div>
    </div>
  );
}

Widget.propTypes = {
  len: PropTypes.number.isRequired, // Validation pour la prop 'len'
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  linkValue: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};