import React from "react";
import { Email, Phone, LocationOn, Work, Dataset } from "@mui/icons-material";
import { dataParser } from "../../../Helpers/Utils";
import PropTypes from "prop-types";
import "./ProfAbout.css";

const Card = ({ Icon, value }) => (
  <div className="ProfAbout_card">
    <Icon />
    <span className="ProfAbout_card_value1">{value ? value : "null"}</span>
  </div>
);

Card.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  value: PropTypes.string.isRequired,
};


export default function ProfAbout({ seturlChange, user_new }) {
  return (
    <div id="ProfAbout">
      <div className="ProfAbout_content">
        <div className="ProfAbout_left">
          <Card Icon={Email} value={user_new.email} />
          <Card Icon={Phone} value={user_new.phone_number} />
          <Card Icon={LocationOn} value={user_new.address} />
          <Card Icon={Work} value={user_new.domain} />
          <Card Icon={Email} value={user_new.fonction} />
          <Card Icon={Dataset} value={dataParser(user_new.createdAt)} />
        </div>
        <div className="ProfAbout_right">
          <button
            onClick={() => seturlChange("ProfUpdate")}
            className="ProfAbout_right_btn"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

ProfAbout.propTypes = {
  user_new: PropTypes.object.isRequired,
  seturlChange: PropTypes.string.isRequired,
};
