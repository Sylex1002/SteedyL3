import { Stack } from "@mui/material";
import React, { useState } from "react";
import "./style/BoxUserGroupe.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import NestedModal from "../../Global/Community/Components/ModalCommunitySuggestion";
import PropTypes from "prop-types";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";

export const BoxUserGroupe = (props) => {
  const {
    image,
    username,
    status,
    description,
    link,
    showStatut,
    mark,
    backgroundColor,
    modal,
    group_id,
    IsEnattent,
  } = props;
  const [isFirstModalOpen, setIsFristModalOpen] = useState(false);

  const handleOpenFirstModal = () => {
    setIsFristModalOpen(true);
  };

  const handleCloseFirstModal = () => {
    setIsFristModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="boxUserGroupe"
      style={{ width: props.maxwidth }}
    >
      <div className="boxImageGroup">
        <div className="img">
          <img src={image} alt="..." width="100%" height="100%" />
        </div>
      </div>

      <div className="GroupInfo">
        <Stack direction="column" spacing={1}>
          {username.length > 12 ? (
            <Marquee direction="left" speed={40} gradient={false}>
              <p style={{ paddingInline: "8px" }}>{username}</p>
            </Marquee>
          ) : (
            <p>{username}</p>
          )}
          <span>{description}</span>
          <div style={{ fontSize: "12px" }}>{status}</div>
        </Stack>
      </div>
      <div className="actions">
        {IsEnattent ? (
          <>
            {showStatut && (
              <div className="attent-Icon ">
                <HourglassEmptyIcon className="shake-animation" />
              </div>
            )}
            <div className="boxIconGroupe">
              <div className="iconGroupe" style={{ width: '100%' }}>
                <p style={{ color: "black", fontSize: "12px" }}>En attent</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {showStatut && (
              <div className="success-Icon">
                <CheckCircleOutlineIcon />
              </div>
            )}
            {!modal ? (
              <Link to={link} className="boxIconGroupe">
                <div className="iconGroupe">
                  <MapsUgcOutlinedIcon
                    sx={{ width: "23px", height: "23px", color: "#000" }}
                  />
                </div>
              </Link>
            ) : (
              <div className="boxIconGroupe">
                <div
                  onClick={() => handleOpenFirstModal()}
                  className="iconGroupe"
                  style={{ background: backgroundColor }}
                >
                  {mark}
                </div>
                <NestedModal
                  open={isFirstModalOpen}
                  handleCloseFirstModal={handleCloseFirstModal}
                  image={image}
                  group_name={username}
                  description={description}
                  group_id={group_id}
                />
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

BoxUserGroupe.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  showStatut: PropTypes.bool.isRequired,
  mark: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  maxwidth: PropTypes.string.isRequired,
  group_id: PropTypes.string.isRequired,
  IsEnattent: PropTypes.bool.isRequired,
};
