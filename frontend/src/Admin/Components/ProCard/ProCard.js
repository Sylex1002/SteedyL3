import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProCard.css";
import { BaseURL } from "../../../Helpers/ServiceApi";

export default function ProCard({ pro }) {
  return (
    <div id="ProCard">
      <div className="ProCard">
        <div className="ProCard_head">
          <div className="ProCard_head_left">
            <img src={`${BaseURL}${pro.user.image_url}`} alt="pro" />
          </div>
          <div className="ProCard_head_right">
            <h4>
              {pro.user.first_name} {pro.user.last_name}
            </h4>
            <Link to={`/admin-pro/${pro.user.matricule}`}>
              @{pro.user.username}
            </Link>
          </div>
        </div>
        <div className="ProCard_body">
          <p>{pro.user.bio}</p>
        </div>
      </div>
    </div>
  );
}

ProCard.propTypes = {
  pro: PropTypes.object.isRequired,
};
