import React, { useContext, useEffect, useState } from "react";
import "./styles/CardProfUnFollow.scss";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { AppContext } from "../../Context/AppContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { post_follower_prof_action } from "../../Actions/ActionProf";
import { Stack } from "@mui/material";
import { BaseURL } from "../../Helpers/ServiceApi";

export default function CardProfUnFollow({ prof }) {
  const { Uuid } = useContext(AppContext);
  const [abonne, setAbonne] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // abonnes
  useEffect(() => {
    if (prof) {
      const isAbonne = prof.followers.some((follower) => follower.id === Uuid);
      setAbonne(isAbonne);
    }
  }, [prof, Uuid]);

  const handleFollowProf = async (prof) => {
    const formdata = {
      prof_id: prof.id,
      follower_id: Uuid,
    };
    if (Uuid) {
      await dispatch(post_follower_prof_action(formdata));
      setAbonne(true);
    }
  };

  const handleNaviagete = (prof) => {
    navigate(`/professionnel/createur/${prof.id}/`);
  };

  return (
    <div id={"CardProfUnFollow"}>
      <motion.div
        initial={{ translateY: "100px" }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.6 }}
        className="createur-default"
      >
        <Stack direction="column" spacing="24px">
          <div className="profil">
            <img
              onClick={() => handleNaviagete(prof)}
              src={`${BaseURL}${prof.user.image_url}`}
              alt="steedy"
            />
          </div>
          <div className="info-name">
            <Stack direction="column" spacing="4px">
              <p>
                {prof.user.first_name} {prof.user.last_name}
              </p>
              <p className="tag">{prof.user.domain}</p>
            </Stack>
          </div>
          <div className="follow">
            {!abonne && (
              <button onClick={() => handleFollowProf(prof)}>Suivre</button>
            )}
          </div>
        </Stack>
      </motion.div>
    </div>
  );
}

CardProfUnFollow.propTypes = {
  prof: PropTypes.object.isRequired,
};
