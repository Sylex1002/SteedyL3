import "./style/updateProfil.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import instanceAxios from "../../Helpers/InstanceAxios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UpdateProfil(props) {
  const [openModal, setopenModal] = useState(false);
  const [newBio, setnewBio] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("user_id", props.userId);
    formData.append("file", file);

    try {
      await instanceAxios.post(`/user-image/`, formData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBio = async (e) => {
    e.preventDefault();
    try {
      await instanceAxios.put(`/users/${props.userId}/`, {
        bio: newBio,
      });
      setopenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="updateProfil"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: "999",
      }}
    >
      <Grid container>
        <Grid item md={3}>
          <div className="boxBtn">
            <IconButton
              style={{ background: "#f49030", color: "#FFF" }}
              onClick={() => navigate(-1)}
            >
              <ChevronLeftOutlinedIcon />
            </IconButton>
          </div>
          <div className="pdp">
            <img src={props.profil} alt="..." />
            <div className="uploadImage">
              <label htmlFor="upload">Upload</label>
              <input type="file" id="upload" onChange={handleUpload} hidden />
            </div>
          </div>
          <div className="fullName">
            <p>
              {props.nom} {props.prenom}
            </p>
            {/* <span>@{props.email}</span> */}
            <div className="textBio">
              {props.bio === null ? (
                <span>Pas de bio</span>
              ) : (
                <span>{props.bio}</span>
              )}
            </div>
          </div>
          <div className="btnUpdate">
            <button onClick={() => setopenModal(true)}>
              Modifier mon profil
            </button>

            <Modal
              open={openModal}
              onClose={() => setopenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <input
                  type="text"
                  onChange={(e) => setnewBio(e.currentTarget.value)}
                />
                <button onClick={updateBio}>Save</button>
              </Box>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
UpdateProfil.propTypes = {
  userId: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  prenom: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  profil: PropTypes.string.isRequired,
};
