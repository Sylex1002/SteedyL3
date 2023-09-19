import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Link } from "react-router-dom";

// import "./style/CardZoneAvenir.scss"

const GroupAvatarsZone = () => {
  return (
    <AvatarGroup max={3}>
      <Avatar alt="Remy Sharp" sx={{ width: 24, height: 24 }} />
      <Avatar alt="Cindy Baker" sx={{ width: 24, height: 24 }} />
    </AvatarGroup>
  );
};

export default function CardZoneAvenir() {
  return (
    <div id="CardZoneAvenir">
      <div className="CardZoneAvenir_content">
        <div className="CardZoneAvenir_head">
          <p>Vendredi 18 Mars 2025 a 07:00 AM</p>
          <span></span>
        </div>
        <div className="CardZoneAvenir_body">
          <div className="CardZoneAvenir_body_center">
            <Avatar
              alt="Remy Sharp"
              className="CardZoneAvenir_body_icon"
              sx={{ width: 50, height: 50 }}
            />
          </div>
          <div className="CardZoneAvenir_body_bottom">
            <span>Jacques jean Lodphin</span>
          </div>
          <div className="CardZoneAvenir_body_dec">
            <p>
              Lorem publishing and graphic design, Lorem ipsum design graphic.
            </p>
            <span></span>
          </div>
        </div>
        <div className="CardZoneAvenir_foot">
          <div className="CardZoneAvenir_foot_left">
            <GroupAvatarsZone />
            <div className="CardZoneAvenir_foot_left_dec">
              <p>Plus de 606 participents</p>
            </div>
          </div>
          <div className="CardZoneAvenir_foot_right">
            <Link to="/etudiant/play-zone">
              <button className="CardZoneAvenir_bnt">Rejoignez</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
