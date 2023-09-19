import React, { useContext, useEffect, useState } from "react";
import "./style/FocusCardCategory.scss";
import { useNavigate } from "react-router-dom";
import { AudioContext } from "../../Context/AudioContext ";
import PropTypes from "prop-types";

import {
  verificationCloudinaryFocus,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";

export default function FocusCardCategory({
  idFocus,
  setIdFocus,
  setActivePlaayCard,
  focus,
}) {
  const {
    setfocusData,
    handleChangeAudio,
  } = useContext(AudioContext);

  const [activeCard, setactiveCard] = useState(false);
  const [activeCardHover, setactiveCardHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (focus && idFocus) {
      if (focus.id === idFocus) {
        setactiveCard(true);
      } else {
        setactiveCard(false);
      }
    }
  }, [focus, idFocus]);

  const handleAddFocus = () => {
    setIdFocus(focus.id);
    setfocusData(focus);
    // const audioLink = `${API_CLOUDINARY}${focus.podcast}`
    const audioLink = verificationCloudinaryFocus(focus.podcast);

    handleChangeAudio(audioLink);
    navigate(`/etudiant/focus/${focus.id}`);
    setActivePlaayCard(true);
  };

  // handle hover card
  const handleHoverCard = () => {
    if (activeCard === false) {
      setactiveCardHover(true);
    } else {
      setactiveCardHover(false);
    }
  };

  // handle leave card
  const handleLeaveCard = () => {
    setactiveCardHover(false);
  };

  return (
    <div
      id="FocusCardCategory"
      onClick={handleAddFocus}
      onMouseOver={handleHoverCard}
      onMouseLeave={handleLeaveCard}
      style={
        activeCard
          ? {
              background: `url(${verificationCloudinaryHighlight(
                focus.bg
              )}) center/cover no-repeat `,
              border: "2px solid #f49030",
            }
          : {
              background: `url(${verificationCloudinaryHighlight(
                focus.bg
              )}) center/cover no-repeat `,
            }
      }
    >
      <div
        id="FocusCardCategory_content"
        className={activeCard && "FocusCardCategory_active"}
        style={
          activeCardHover
            ? {
                backgroundColor: "#00000080",
              }
            : {}
        }
      >
        {/* whene card active */}
        {activeCard ? (
          <p>{focus.titre.slice(0, 120)}</p>
        ) : (
          <>
            {/* whene card hover */}
            {activeCardHover && <p>{focus.titre.slice(0, 120)}</p>}
          </>
        )}
      </div>
    </div>
  );
}

FocusCardCategory.propTypes = {
  idFocus: PropTypes.string.isRequired,
  setIdFocus: PropTypes.string.isRequired,
  setActivePlaayCard: PropTypes.bool.isRequired,
  focus: PropTypes.object.isRequired,
  
};
