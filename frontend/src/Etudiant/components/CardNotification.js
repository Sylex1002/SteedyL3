import { Stack } from "@mui/material";
import "./style/CardNotification.scss";
import PropTypes from "prop-types";
import React from "react";

export default function CardNotification(props) {
  const { read, navigates, image, userName, time, message } = props;

  return (
    <div
      onClick={navigates}
      className="cardNotification"
      style={
        read
          ? {
              backgroundColor: "var(--grey)",
            }
          : null
      }
    >
      <div className="cardImage">
        <div className="smallImage">
          <img src={image} alt="..." width="100%" height="100%" />
        </div>
      </div>
      <div className="context">
        <Stack direction="column" spacing={1}>
          <div className="subject">
            {/* Nom de la communaute ou de la personne qui a envoyer la notification */}
            <p>{userName}</p>
            {/* Heure de la notification */}
            <span>{time}</span>
          </div>
          <div className="msge">
            <p>
              {message.length > 200 ? message.slice(0, 200) + "..." : message}
            </p>
          </div>
        </Stack>
      </div>
    </div>
  );
}

CardNotification.propTypes = {
  read: PropTypes.bool.isRequired,
  navigates: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
