import React from "react";
import "./styles/ModalMembers.scss";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { BaseURL } from "../../../../Helpers/ServiceApi";

const ModalMembers = ({ onClose, membres, createurs }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="membres-modal"
    >
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="modal-content"
      >
        <div className="modal-head">
          <h3 className="titre">Tous les membres</h3>
          <button className="button-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="search-bar">
          <div className="box-search">
            <div className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M21.7495 21.1895L16.0855 15.5255C17.4466 13.8915 18.1253 11.7957 17.9805 9.67395C17.8356 7.55225 16.8784 5.56807 15.3079 4.13416C13.7374 2.70026 11.6745 1.92703 9.54844 1.97534C7.42236 2.02365 5.39674 2.88977 3.89298 4.39353C2.38922 5.89729 1.5231 7.92291 1.47479 10.049C1.42648 12.1751 2.19971 14.2379 3.63361 15.8085C5.06752 17.379 7.0517 18.3362 9.1734 18.481C11.2951 18.6259 13.391 17.9471 15.025 16.586L20.689 22.25L21.7495 21.1895ZM2.99948 10.25C2.99948 8.915 3.39536 7.60996 4.13706 6.49993C4.87876 5.38989 5.93296 4.52473 7.16636 4.01384C8.39976 3.50295 9.75696 3.36927 11.0663 3.62973C12.3757 3.89018 13.5784 4.53305 14.5224 5.47706C15.4665 6.42106 16.1093 7.62379 16.3698 8.93317C16.6302 10.2425 16.4966 11.5997 15.9857 12.8331C15.4748 14.0665 14.6096 15.1207 13.4996 15.8624C12.3895 16.6041 11.0845 17 9.74948 17C7.95987 16.998 6.24414 16.2862 4.9787 15.0208C3.71326 13.7554 3.00146 12.0396 2.99948 10.25Z"
                  fill="#AFAFAF"
                />
              </svg>
            </div>
            <input type="text" placeholder="Faire un recherche…" />
          </div>
          <button className="add-members">
            <GroupAddIcon className="add-icon" />
          </button>
        </div>
        <div className="users">
          {membres.map((membre, index) => {
            return (
              <div className="card-user" key={index}>
                <div className="list-members">
                  <Stack direction="row" spacing="8px">
                    <div className="image-profil">
                      <img src={`${BaseURL}${membre.image_url}`} alt="..." />
                    </div>
                    <div className="user">
                      <span>
                        {membre.last_name} {membre.first_name}
                      </span>
                      <p>
                        {membre.email} {membre.id === createurs.id && "(admin)"}
                      </p>
                    </div>
                  </Stack>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

ModalMembers.propTypes = {
    onClose: PropTypes.func.isRequired,
    membres: PropTypes.array.isRequired,
    createurs: PropTypes.object.isRequired,
    
  };

export default ModalMembers;
