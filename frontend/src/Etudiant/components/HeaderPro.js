import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import Skeleton from "@mui/material/Skeleton";

import cameraIcon from "../../Images/icons/camera.svg";
import editIcon from "../../Images/icons/edit.svg";
import {
  uploadImageAction,
  updateUserInfoAction,
} from "../../Actions/actionAuth";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BaseURL } from "../../Helpers/ServiceApi";
import "./style/HeaderPro.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function HeaderPro() {
  const user = useSelector(GET_USER_INFO_CONNECT);
  const pdp = `url(${BaseURL + user.image_url})`;
  const [menuActive, setMenuActive] = useState("iP");

  // Information sur formulaire de mis a jour profil
  const [first_name, setfirst_name] = useState(user.first_name);
  const [last_name, setlast_name] = useState(user.last_name);
  const [email, setemail] = useState(user.email);
  const [phone_number, setphone_number] = useState(user.phone_number);
  const [address, setaddress] = useState(user.address);
  const [domain, setdomain] = useState(user.domain);
  const [bio, setbio] = useState(user.bio);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("file", file);
    await dispatch(uploadImageAction(formData));
  };

  const [state, setState] = useState(false);

  const handleClosed = () => {
    setState(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      domain,
      bio,
    };

    await dispatch(updateUserInfoAction(user.id, formData));
    setState(true);
    setOpen(false);
  };

  return (
    <div className="headerPro">
      <div className="boxProfilPro" style={{ background: pdp }}>
        <Grid className="filter" container>
          <Grid item md={10}>
            <div className="profilPro">
              <Stack direction="row" spacing={2}>
                <div className="imagePro">
                  {user.image_url ? (
                    <>
                      <img
                        src={BaseURL + user.image_url}
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
                    </>
                  ) : (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                {/* <Grid item md={11}> */}
                <div className="infoUser">
                  <Stack direction="column" spacing={1}>
                    <div className="name">
                      <p>
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                    <div className="status">
                      <p>{user.fonction}</p>
                    </div>
                  </Stack>
                  <div className="followersAvatar">
                    {/* <AvatarGroup className='avatarGroup'>
                                                <Avatar alt="Remy Sharp" sx={{ maxHeight: '20px', maxWidth: '20px', fontSize: 12  }} src={image1} />
                                                <Avatar alt="Travis Howard" sx={{ maxHeight: '20px', maxWidth: '20px', fontSize: 12  }} src={image2} />
                                                <Avatar alt="Cindy Baker" sx={{ maxHeight: '20px', maxWidth: '20px', fontSize: 12  }} src={image3} />
                                            </AvatarGroup>
                                            <p>Abonnes</p> */}
                  </div>
                </div>
                {/* </Grid> */}
              </Stack>
            </div>
          </Grid>
          <Grid item md={2}>
            <div className="btnActions">
              <button className="abonne" onClick={handleClickOpen}>
                <Stack direction="row" spacing={1}>
                  <img
                    src={editIcon}
                    alt="steedy_edit_profil"
                    width="17px"
                    height="17px"
                    style={{ filter: "inverse(1)" }}
                  />
                  <p>Modifier mon profil</p>
                </Stack>
              </button>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
                style={{ borderRadius: "8px" }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Stack direction="column" spacing={3} className="modalBox">
                      <div id="responsive-dialog-title">
                        <Stack direction="row" spacing={1}>
                          <img
                            src={editIcon}
                            alt="..."
                            width="20px"
                            height="20px"
                          />
                          <p style={{ fontSize: "18px" }}>
                            {"Mettre a jour mon profil"}
                          </p>
                        </Stack>
                      </div>

                      <div style={menuBar}>
                        <div style={menu} onClick={() => setMenuActive("iP")}>
                          <p
                            style={
                              menuActive === "iP" ? { color: "#f49030" } : null
                            }
                          >
                            Informations personnelle
                          </p>
                        </div>
                        <div style={menu} onClick={() => setMenuActive("iPro")}>
                          <p
                            style={
                              menuActive === "iPro"
                                ? { color: "#f49030" }
                                : null
                            }
                          >
                            Informations professionnelle
                          </p>
                        </div>
                        <div
                          style={menuActive === "iP" ? traitP : traitPro}
                        ></div>
                      </div>

                      <div style={content}>
                        <div
                          style={
                            menuActive === "iP" ? allContentP : allContentPro
                          }
                        >
                          <Stack
                            direction="column"
                            spacing={2}
                            style={contentForm}
                          >
                            <div className="first_name">
                              <Stack direction="column" spacing={0.3}>
                                <p style={{ fontSize: "14px", color: "#000" }}>
                                  Votre nom
                                </p>
                                <input
                                  type="text"
                                  style={inputStyle}
                                  onChange={(e) =>
                                    setfirst_name(e.target.value)
                                  }
                                  defaultValue={user.first_name}
                                />
                              </Stack>
                            </div>

                            <div className="last_name">
                              <Stack direction="column" spacing={0.3}>
                                <p style={{ fontSize: "14px", color: "#000" }}>
                                  Votre prenom
                                </p>
                                <input
                                  type="text"
                                  style={inputStyle}
                                  onChange={(e) => setlast_name(e.target.value)}
                                  defaultValue={user.last_name}
                                />
                              </Stack>
                            </div>

                            <div className="email">
                              <Stack direction="column" spacing={0.3}>
                                <p style={{ fontSize: "14px", color: "#000" }}>
                                  Votre email
                                </p>
                                <input
                                  type="text"
                                  style={inputStyle}
                                  onChange={(e) => setemail(e.target.value)}
                                  defaultValue={user.email}
                                />
                              </Stack>
                            </div>

                            <div className="phone_number">
                              <Stack direction="column" spacing={0.3}>
                                <p style={{ fontSize: "14px", color: "#000" }}>
                                  Votre numero de telephone
                                </p>
                                <input
                                  type="text"
                                  style={inputStyle}
                                  onChange={(e) =>
                                    setphone_number(e.target.value)
                                  }
                                  defaultValue={user.phone_number}
                                />
                              </Stack>
                            </div>

                            <div className="address">
                              <Stack direction="column" spacing={0.3}>
                                <p style={{ fontSize: "14px", color: "#000" }}>
                                  Votre adresse
                                </p>
                                <input
                                  type="text"
                                  style={inputStyle}
                                  onChange={(e) => setaddress(e.target.value)}
                                  defaultValue={user.address}
                                />
                              </Stack>
                            </div>
                          </Stack>

                          <Stack
                            direction="column"
                            spacing={2}
                            style={contentForm}
                          >
                            <div className="domain">
                              <Stack direction="column" spacing={0.3}>
                                <p style={{ fontSize: "14px", color: "#000" }}>
                                  Votre domaine
                                </p>
                                <input
                                  type="text"
                                  style={inputStyle}
                                  onChange={(e) => setdomain(e.target.value)}
                                  defaultValue={user.domain}
                                />
                              </Stack>
                            </div>
                            <div className="bio">
                              <Stack direction="column" spacing={0.3}>
                                <p style={{ fontSize: "14px", color: "#000" }}>
                                  Votre biographie
                                </p>
                                <textarea
                                  type="text"
                                  style={inputStyle}
                                  cols={1}
                                  onChange={(e) => setbio(e.target.value)}
                                  defaultValue={user.bio}
                                ></textarea>
                              </Stack>
                            </div>
                          </Stack>
                        </div>
                      </div>

                      <div
                        className="btnActionsModal"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <button style={btnUpdate} onClick={handleUpdate}>
                          Mettre a jour
                        </button>
                        <button style={btnCancel} onClick={handleClose}>
                          Annuler
                        </button>
                      </div>
                    </Stack>
                  </Box>
                </Fade>
              </Modal>
            </div>
          </Grid>
        </Grid>
      </div>

      <Snackbar open={state} onClose={handleClosed} autoHideDuration={4000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Votre profil a été mise a jour!
        </Alert>
      </Snackbar>
    </div>
  );
}

const btnUpdate = {
  flex: 1,
  border: "1px solid #f49030",
  background: "#f49030",
  color: "#FFF",
  outline: "none",
  borderRadius: "4px",
  height: "35px",
  cursor: "pointer",
};

const btnCancel = {
  flex: 1,
  border: "1px solid #f3f0ee",
  background: "transparent",
  color: "#afafaf",
  outline: "none",
  borderRadius: "4px",
  height: "35px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  height: "35px",
  border: "1px solid #afafaf",
  paddingLeft: "8px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "noe",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const menuBar = {
  display: "flex",
  flexDirection: "row",
  position: "relative",
};
const menu = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  height: "35px",
  cursor: "pointer",
};
const traitP = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "50%",
  height: "2px",
  background: "#f49030",
  border: "1px solid #f49030",
  transition: "ease 0.3s",
};

const traitPro = {
  position: "absolute",
  bottom: 0,
  left: "50%",
  width: "50%",
  height: "2px",
  background: "#f49030",
  border: "1px solid #f49030",
  transition: "ease 0.3s",
};

const content = {
  width: "100%",
  maxWidth: "100%",
  height: "350px",
  position: "relative",
  overflowX: "hidden",
};

const allContentP = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "200%",
  maxWidth: "200%",
  height: "350px",
  display: "inline-flex",
  flexDirection: "row",
  transition: "ease 0.3s",
};

const allContentPro = {
  position: "absolute",
  top: 0,
  left: "-100%",
  width: "200%",
  maxWidth: "200%",
  height: "350px",
  display: "inline-flex",
  flexDirection: "row",
  transition: "ease 0.3s",
};

const contentForm = {
  width: "100%",
  maxWidth: "100%",
  height: "350px",
};
