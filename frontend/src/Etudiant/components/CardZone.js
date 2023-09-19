import React from "react";
import "./style/CardZone.scss";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/*import image1 from '../../Images/pexels-jéshoots-4831.jpg'
import image2 from '../../Images/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg'
import image3 from '../../Images/picture_subscribe.png' */

export default function CardZone({ zone }) {
  return (
    <div id="CardZone">
      <div className="CardZone_content">
        <div className="CardZone_head">
          <p>{zone.description}</p>
          <span></span>
        </div>
        <div className="CardZone_body">
          <div className="CardZone_body_top">
            <span>Commence il y a 16min</span>
          </div>
          <div className="CardZone_body_center">
            <Avatar
              alt={zone.creator.name}
              src={zone.creator.avatar}
              className="CardZone_body_icon"
              sx={{ width: 50, height: 50 }}
            />
          </div>
          <div className="CardZone_body_bottom">
            <span>Zone par {zone.creator.name}</span>
          </div>
        </div>
        <div className="CardZone_foot">
          <div className="CardZone_foot_left">
            {zone.intervenants.map((intervenant,i) => (
              <AvatarGroup key={i} max={3}>
                <Avatar
                  alt={intervenant.name}
                  src={intervenant.avatar}
                  sx={{ width: 24, height: 24 }}
                />
              </AvatarGroup>
            ))}
            <div className="CardZone_foot_left_dec">
              <p>{zone.totalPeople}</p>
            </div>
          </div>
          <div className="CardZone_foot_right">
            {zone.status === 1 ? (
              <Link to="/etudiant/play-zone">
                <button className="CardZone_bnt">Rejoignez</button>
              </Link>
            ) : (
              <Link to="/etudiant/">
                <button className="CardZone_end_bnt">Voir</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CardZone.propTypes = {
  zone: PropTypes.object.isRequired,
};
