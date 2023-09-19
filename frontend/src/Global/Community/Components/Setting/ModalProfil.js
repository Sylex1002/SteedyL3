import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import cameraIcon from "../../../../Images/icons/camera.svg";
import "./styles/ModalProfil.scss";
import userProfil from "../../../../Images/user.png";
import { Stack } from "@mui/system";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { BaseURL } from "../../../../Helpers/ServiceApi";

const ModalProfil = ({ onClose, group }) => {
  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    // formData.append('user_id', user.id)
    formData.append("file", file);

    // try {
    //     await dispatch(uploadImageAction(formData))
    // } catch (error) {
    //     console.log(error)
    // }
    // dispatch(updateImage(formData))
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="profil-community"
    >
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="profil-content"
      >
        <div className="profil-head">
          <h3 className="title"></h3>
          <button className="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="community-image">
          <Stack direction="column" spacing={2}>
            <div className="photo">
              <div className="image">
                <img
                  src={
                    group[0].image !== undefined
                      ? `${BaseURL}${group[0].image}`
                      : userProfil
                  }
                  alt="..."
                  width="100%"
                  height="100%"
                />
                <div className="uploadImage">
                  <label htmlFor="upload">
                    <img src={cameraIcon} alt="steedy-upload" />
                  </label>
                  <input
                    type="file"
                    id="upload"
                    onChange={handleUpload}
                    hidden
                  />
                </div>
              </div>
            </div>
            <div className="nom-group">
              <p>{group[0].groupe_name}</p>
            </div>
          </Stack>
        </div>
      </motion.div>
    </motion.div>
  );
};

ModalProfil.propTypes = {
  onClose: PropTypes.func.isRequired,
  group: PropTypes.array.isRequired,  
};


export default ModalProfil;
