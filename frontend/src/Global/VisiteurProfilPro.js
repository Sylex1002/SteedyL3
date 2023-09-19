import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { motion } from "framer-motion";
import { Grid, Skeleton, Stack } from "@mui/material";
import { API_BASE_URL } from "../Helpers/InstanceAxios";
import CommunityBox from "../Etudiant/components/CommunityBox";
import FocusProfilPro from "../Etudiant/components/FocusProfilPro";
import "./styles/VisiteurProfilPro.scss";

// Icon
import bagIcon from "../Images/bagIcon.png";
import cardIcon from "../Images/cardIcon.png";
import mailIcon from "../Images/mailIcon.png";
import userIcon from "../Images/userName.png";
import axios from "axios";
import { BaseURL, verificationCloudinaryHighlight } from "../Helpers/ServiceApi";

// Importation for Dialog Log IN and Log Out
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

// Transition for Dialog Log In Log Out
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VisiteurProfilPro() {
  // Matcher l'url pour recuperer l'id du professionnel
  const match = useMatch("/visiteur/createur/:id");
  const id = match?.params?.id;

  const navigate = useNavigate();

  // Recuperer les donnees du professionnel
  const [infoPro, setInfoPro] = useState([]);
  // Recuperer les focus
  const [focusPro, setFocusPro] = useState([]);

  // Kwow about click abonner or envoie message
  const [status, setStatus] = useState("");

  // Recuperer les focus professionnel
  const focus_list = focusPro.filter(
    (item) => item.professionnel.user.id === id
  );

  //   const [playActive, setPlayActive] = useState(null);

  const [activeMenu, setactiveMenu] = useState("highlight");

  useEffect(() => {
    const getProf = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/professionnels/user/${String(id)}/`
      );
      setInfoPro(res.data);
    };
    const getFocusPro = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/focus/gratuit/${infoPro.id}/`
      );
      setFocusPro(res.data);
    };
    if (infoPro.length === 0) {
      getProf();
    }
    if (focusPro.length === 0) {
      getFocusPro();
    }

    if (infoPro.id !== undefined) {
      window.localStorage.setItem("connected-demand", infoPro.id);
      window.localStorage.setItem("message-demand", infoPro.user.matricule);
    }
  }, [infoPro]);

  const pdp = () => {
    if (infoPro.length !== 0) {
      return `url(${BaseURL + infoPro.user.image_url})`;
    }
  };

  const changeBar = (n) => {
    document.querySelector(".bar_active").style.transform = `translateX(${n})`;
  };

  const date = new Date(infoPro.user?.createdAt);

  // Open Dialog for Log In and Log Out
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showHighlightFree = () => {
    return (
      <div className="focusPub">
        <p className="title">Features Focus</p>
        <div className="produits">
          {focusPro.length !== 0 ? (
            focus_list.map((focus, i) => (
              <FocusProfilPro
                key={i}
                img={verificationCloudinaryHighlight(focus.bg)}
                name={infoPro.user?.first_name}
                title={focus.titre}
                listen={focus.number_listen_count}
                focus={focus}
                // setPlayActive={setPlayActive}
              />
            ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "8px",
                background: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              <p>Pas de publication disponible</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const showFocusFree = () => {
    return (
      <div className="FocusContent">
        <p className="title">Focus gratuit</p>
        <div className="produits">
          {focusPro.length !== 0 ? (
            focus_list.map((focus, i) => (
              <FocusProfilPro
                key={i}
                img={verificationCloudinaryHighlight(focus.bg)}
                name={infoPro.user?.first_name}
                title={focus.titre}
                listen={focus.number_listen_count}
                focus={focus}
              />
            ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "8px",
                background: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              <p>Pas de focus gratuit disponible</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const showAbout = () => {
    return (
      <div className="aboutMe">
        <Stack direction="column">
          <Grid container spacing={2} style={{ minHeight: "45%" }}>
            <Grid item md={6}>
              <div className="infoPerso">
                <Stack direction="column" spacing={2}>
                  <div className="title">
                    <p>Informations personnelle</p>
                  </div>
                  <div className="nom">
                    <Stack direction="row" spacing={2}>
                      <img src={userIcon} alt="..." />
                      <p>
                        {infoPro.user?.first_name} {infoPro.user?.last_name}
                      </p>
                    </Stack>
                  </div>
                  <div className="adresse">
                    <Stack direction="row" spacing={2}>
                      <img src={mailIcon} alt="..." />
                      <p>{infoPro.user?.email}</p>
                    </Stack>
                  </div>
                </Stack>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="infoProf">
                <Stack direction="column" spacing={2}>
                  <div className="title">
                    <p>Informations professionnelle</p>
                  </div>

                  <div className="nom">
                    {infoPro.user?.domain ? (
                      <Stack direction="row" spacing={2}>
                        <img src={bagIcon} alt="..." />
                        <p>{infoPro.user?.domain}</p>
                      </Stack>
                    ) : null}
                  </div>
                  <div className="adresse">
                    <Stack direction="row" spacing={2}>
                      <img src={cardIcon} alt="..." />
                      <p>Membre depuis le {date.toLocaleDateString()}</p>
                    </Stack>
                  </div>
                </Stack>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ minHeight: "45%" }}>
            <Grid item md={6}>
              <CommunityBox />
            </Grid>

            <Grid item md={6}>
              <div className="tags">
                <div className="title">
                  <p>Tags</p>
                </div>

                <div
                  className="tag"
                  style={{
                    marginTop: "15px",
                    fontSize: "12px",
                    maxWidth: "100%",
                  }}
                >
                  <Grid container>
                    {infoPro.user?.categories.map((category, i) => (
                      <Grid key={i} item className="item">
                        <p>{category?.name}</p>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </Stack>
      </div>
    );
  };

  return (
    <div className="profilPro">
      <div className="profil" id="profil" style={{ background: pdp() }}>
        <div className="boxProfil">
          {/* Barre de menu profil pro */}
          <div className="middleAll">
            <Grid container spacing={2} className="all">
              <Grid item md={4} className="profilInfo">
                <div className="image">
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                    className="pdp"
                  >
                    {infoPro.length !== 0 ? (
                      <>
                        <img
                          src={`${BaseURL + infoPro.user.image_url}`}
                          alt="..."
                        />
                        <div className="hoveringAction">
                          <Bars
                            height="40"
                            width="40"
                            color="#f49030"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        </div>
                      </>
                    ) : (
                      <Skeleton
                        variant="rounded"
                        width="100%"
                        height="100%"
                        animation="wave"
                      />
                    )}
                  </motion.div>
                </div>
                <motion.div
                  className="biographie"
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="title">
                    <p>Biographie</p>
                  </div>
                  <div className="paragraphe">
                    {infoPro.length !== 0 ? (
                      infoPro.user.bio !== null ? (
                        <p>{infoPro.user.bio}</p>
                      ) : (
                        <p>Pas de biographie</p>
                      )
                    ) : null}
                  </div>
                </motion.div>
              </Grid>

              <Grid item md={8} className="freeInfo">
                <div className="infoPerso">
                  <motion.div
                    className="name"
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <Stack direction="column">
                      {infoPro.user !== undefined ? (
                        <>
                          <p>
                            {infoPro.user.first_name} {infoPro.user.last_name}
                          </p>
                          <span>
                            {infoPro.user.following.length} abonnée
                            {infoPro.user.following.length > 1 && "s"}
                          </span>
                        </>
                      ) : (
                        <>
                          <p>
                            <Skeleton
                              width="200px"
                              height="20px"
                              variant="rounded"
                              animation="wave"
                            />
                          </p>
                          <span>
                            <Skeleton
                              width="100px"
                              height="8px"
                              variant="rounded"
                              animation="wave"
                            />
                          </span>
                        </>
                      )}
                    </Stack>
                  </motion.div>
                </div>

                <div className="follow">
                  <div className="btn">
                    <div
                      className="followBtn"
                      onClick={() => {
                        setStatus("abonner");
                        window.localStorage.setItem(
                          "status-demand",
                          "Abonnement"
                        );
                      }}
                    >
                      <button className="abonner" onClick={handleClickOpen}>
                        S`abonner
                      </button>
                    </div>
                  </div>
                  <div
                    className="btnMsge"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setStatus("message");
                      window.localStorage.setItem("status-demand", "Message");
                    }}
                  >
                    <button onClick={handleClickOpen}>
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          viewBox="0 0 58 59"
                          fill="none"
                        >
                          <rect
                            y="0.5"
                            width="58"
                            height="58"
                            rx="8"
                            fill="none"
                          />
                          <path
                            d="M19.2834 34.6784L19.1992 34.9743L18.2185 38.4243L18.2173 38.4285C18.1623 38.6178 18.1588 38.8183 18.2072 39.0094C18.2554 39.2 18.3535 39.3743 18.4914 39.5145C18.6279 39.6512 18.7987 39.7485 18.9859 39.7962C19.1736 39.844 19.3708 39.8401 19.5565 39.7849L19.5657 39.7822L19.5657 39.7822L23.0272 38.8015L23.3228 38.7177L23.5922 38.8654C25.0961 39.6897 26.7685 40.1592 28.4817 40.2381C30.1949 40.317 31.9034 40.0032 33.4767 39.3206C35.05 38.638 36.4465 37.6048 37.5593 36.2999C38.6721 34.995 39.4719 33.4529 39.8974 31.7915C40.323 30.1302 40.363 28.3935 40.0146 26.7143C39.6662 25.0351 38.9384 23.4578 37.887 22.1029C36.8356 20.748 35.4883 19.6514 33.9482 18.897C32.408 18.1426 30.7158 17.7502 29.0009 17.75L19.2834 34.6784ZM19.2834 34.6784L19.1355 34.4087M19.2834 34.6784L19.1355 34.4087M19.1355 34.4087C18.1961 32.6955 17.7192 30.7672 17.7515 28.8136C17.7839 26.8601 18.3245 24.9486 19.3201 23.2675C20.3157 21.5863 21.7319 20.1935 23.4294 19.226C25.1269 18.2586 27.047 17.7499 29.0008 17.75L19.1355 34.4087ZM32.4458 28.5836L33.1676 28.7271L32.4458 28.5836C32.3634 28.9976 32.4057 29.4268 32.5672 29.8169C32.7288 30.2069 33.0024 30.5403 33.3534 30.7749C33.7045 31.0094 34.1172 31.1346 34.5394 31.1346C35.1055 31.1346 35.6485 30.9097 36.0488 30.5094L35.5184 29.9791L36.0488 30.5094C36.4491 30.1091 36.674 29.5661 36.674 29C36.674 28.5778 36.5488 28.1651 36.3142 27.8141C36.0797 27.463 35.7463 27.1894 35.3563 27.0279C34.9662 26.8663 34.537 26.824 34.1229 26.9064C33.7089 26.9888 33.3285 27.1921 33.03 27.4906C32.7314 27.7891 32.5281 28.1695 32.4458 28.5836ZM22.2765 30.7749C22.6276 31.0094 23.0403 31.1346 23.4624 31.1346C24.0286 31.1346 24.5715 30.9097 24.9718 30.5094C25.3722 30.1091 25.5971 29.5661 25.5971 29C25.5971 28.5778 25.4719 28.1651 25.2373 27.8141C25.0028 27.463 24.6694 27.1894 24.2793 27.0279C23.8893 26.8663 23.4601 26.824 23.046 26.9064C22.6319 26.9888 22.2516 27.1921 21.953 27.4906C21.6545 27.7891 21.4512 28.1695 21.3688 28.5836C21.2865 28.9976 21.3288 29.4268 21.4903 29.8169C21.6519 30.2069 21.9255 30.5403 22.2765 30.7749ZM27.815 30.7749C28.166 31.0094 28.5787 31.1346 29.0009 31.1346C29.567 31.1346 30.11 30.9097 30.5103 30.5094C30.9106 30.1091 31.1355 29.5661 31.1355 29C31.1355 28.5778 31.0103 28.1651 30.7758 27.8141C30.5412 27.463 30.2078 27.1894 29.8178 27.0279C29.4277 26.8663 28.9985 26.824 28.5845 26.9064C28.1704 26.9888 27.79 27.1921 27.4915 27.4906C27.193 27.7891 26.9897 28.1695 26.9073 28.5836C26.8249 28.9976 26.8672 29.4268 27.0288 29.8169C27.1903 30.2069 27.4639 30.5403 27.815 30.7749Z"
                            stroke="#FFF"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <p>Envoyer un message</p>
                    </button>
                  </div>

                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    {status === "abonner" && (
                      <DialogTitle>S`abonner</DialogTitle>
                    )}
                    {status === "message" && (
                      <DialogTitle>Envoyer un message</DialogTitle>
                    )}
                    <DialogContent>
                      {status === "abonner" && (
                        <DialogContentText id="alert-dialog-slide-description">
                          Vous devez vous inscrir ou vous connecter pour pouvoir
                          vous abonner
                        </DialogContentText>
                      )}

                      {status === "message" && (
                        <DialogContentText id="alert-dialog-slide-description">
                          Vous devez vous inscrir ou vous connecter pour pouvoir
                          envoyer un message
                        </DialogContentText>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <button
                        style={connectedDemad}
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Se connecter
                      </button>
                      <button
                        style={messageDemad}
                        onClick={() => {
                          navigate("/inscription");
                        }}
                      >
                        S`inscrir
                      </button>
                    </DialogActions>
                  </Dialog>
                </div>

                <div className="menuPaginationFree">
                  <div
                    className={
                      activeMenu === "highlight"
                        ? "highlight active"
                        : "highlight"
                    }
                    onClick={() => {
                      changeBar("0");
                      setactiveMenu("highlight");
                    }}
                  >
                    <p>Publications</p>
                  </div>
                  <div
                    className={
                      activeMenu === "focus" ? "focus active" : "focus"
                    }
                    onClick={() => {
                      changeBar("10rem");
                      setactiveMenu("focus");
                    }}
                  >
                    <p>Focus</p>
                  </div>
                  <div
                    className={
                      activeMenu === "about" ? "about active" : "about"
                    }
                    onClick={() => {
                      changeBar("20rem");
                      setactiveMenu("about");
                    }}
                  >
                    <p>A propos</p>
                  </div>

                  <div className="bar_active"></div>
                </div>

                <div className="showFreeProduct">
                  {activeMenu === "highlight"
                    ? showHighlightFree()
                    : activeMenu === "focus"
                    ? showFocusFree()
                    : activeMenu === "about" && showAbout()}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

const connectedDemad = {
  height: "35px",
  background: "var(--bg)",
  color: "#FFF",
  border: "1px solid var(--bg)",
  outline: "none",
  fontSize: "14px",
  padding: "12px 24px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const messageDemad = {
  height: "35px",
  background: "transparent",
  color: "var(--bg)",
  border: "none",
  outline: "none",
  fontSize: "14px",
  padding: "12px 24px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};
