import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "./style/CommunityBox.scss";
import React from "react";
import { BaseURL } from "../../Helpers/ServiceApi";
import PropTypes from "prop-types";

export default function CommunityBox({Communitys}) {

  // BaseURL
  return (
    <div className="community">
      <div className="title">
        <p>Communaute</p>
      </div>

      {Communitys?.length > 0 && (
        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          {Communitys.map((group, index) => (
            <div key={index} className="card">
              <Stack direction="row" spacing={1}>
                <div className="image">
                  <img src={BaseURL+group.image} alt="..." />
                </div>
                <div className="words">
                  <p style={{ fontSize: "12px", fontWeight: "700" }}>
                    {group.groupe_name}
                  </p>
                  <p style={{ fontSize: "10px", marginTop: "5px" }}>
                    {group.members.length > 1
                      ? group.members.length + "membres"
                      : group.members.length + "membre"}
                  </p>
                </div>
              </Stack>
            </div>
          ))}
        </Stack>
      )}
      <div className="view">
        <Link to={"/etudiant/community/"}>
          <div className="viewBtn">
            <p>Voir plus</p>
          </div>
        </Link>
      </div>
    </div>
  );
}


CommunityBox.propTypes = {
  Communitys: PropTypes.array.isRequired,
  
};
