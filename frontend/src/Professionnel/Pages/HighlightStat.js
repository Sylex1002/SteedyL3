import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Box,  Modal, Stack } from "@mui/material";
import LayoutDashboard from "../Layout/LayoutDashboard";
import "./styles/HighlightStat.scss";
import {
  accordion,
  cardStat,
  listLink,
  normalCardStat,
} from "../Components/LinkStats";
// Icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import starLock from "../../Images/icons/solar_medal-star-square-outline.svg";
import addIcon from "../../Images/icons/fluent_add-16-regular.svg";
import carbonDelete from "../../Images/icons/carbon_delete.svg";
import eyeIcon from "../../Images/icons/solar_eye-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MY_HIGHLIGHT_ACTIVE,
  GET_MY_HIGHLIGHT,
} from "../../Reducers/ReducerHighlight";
import { AppContext } from "../../Context/AppContext";
import { getAllHighLightProfAction } from "../../Actions/ActionHighlight";
import NbrViewHighlight from "../Components/NbrViewHighlight";
import DeleteHighlight from "../Components/DeleteHighlight";
import { Swiper, SwiperSlide } from "swiper/react";

// Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";

export default function HighlightStat() {
  const { getIdPro } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDeleteHighlight, setOpenDeleteHighlight] = useState(false);
  const [openViewHighlight, setOpenViewHighlight] = useState(false);

  // highlight
  const highligh_active = useSelector(GET_MY_HIGHLIGHT_ACTIVE);
  const highlight = useSelector(GET_MY_HIGHLIGHT);

  // get all highlight of prof
  useEffect(() => {
    if (getIdPro !== null) {
      if (highligh_active === false) {
        dispatch(getAllHighLightProfAction(getIdPro));
      }
    }
  }, [dispatch, getIdPro, highligh_active]);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const [sommeView, setSommeView] = useState(0);
  const [sommeLike, setSommeLike] = useState(0);

  const nbrViewAllHighlightPro = () => {
    let nbrView = [];

    if (highlight.length !== 0) {
      for (let i = 0; i < highlight.length; i++) {
        nbrView.push(highlight[i].view.length);
      }
      const somme = nbrView.reduce((x, y) => x + y);
      setSommeView(parseInt(somme));
    }
  };

  const nbrLikeAllHighlightPro = () => {
    let nbrView = [];

    if (highlight.length !== 0) {
      for (let i = 0; i < highlight.length; i++) {
        nbrView.push(highlight[i].like.length);
      }
      const somme = nbrView.reduce((x, y) => x + y);
      setSommeLike(parseInt(somme));
    }
  };

  useEffect(() => {
    nbrViewAllHighlightPro();
    nbrLikeAllHighlightPro();
  }, [sommeView, sommeLike, highlight]);

  const CardHighlight = (bg, vu, like, id) => {
    const bag = `url(${verificationCloudinaryHighlight(bg)})`;
    return (
      <SwiperSlide key={id}>
        <div className="highlight">
          <div
            className="cover"
            style={{ background: bag, width: "100%", height: "100%" }}
          >
            <div className="stat">
              <Stack direction="row" spacing="12px" className="content-stat">
                <div className="vu">
                  <Stack direction="row" spacing="4px">
                    <VisibilityIcon sx={{ width: "16px", height: "16px" }} />
                    <p>{vu}</p>
                  </Stack>
                </div>
                <div className="separe"></div>
                <div className="like">
                  <Stack direction="row" spacing="4px">
                    <FavoriteIcon sx={{ width: "16px", height: "16px" }} />
                    <p>{like}</p>
                  </Stack>
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  };

  // Card nombre statistique
  const CardNbre = (nbre, title) => {
    return (
      <div className="card-nbre">
        <Stack direction="column" spacing="12px">
          <p className="nbre">{nbre}</p>
          <p>{title}</p>
        </Stack>
      </div>
    );
  };

  return (
    <LayoutDashboard>
      <motion.div
        initial={{ translateX: "-100px" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        <Stack direction="row" spacing={2}>
          <div className="goBack" onClick={() => navigate(-1)}>
            <KeyboardArrowLeftIcon />
          </div>
          <p>Highlight</p>
        </Stack>
      </motion.div>

      <div className="mes-highlights">
        <Swiper slidesPerView={"auto"} spaceBetween={12}>
          {highlight.map((high, index) => {
            return CardHighlight(
              high.file,
              high.view.length,
              high.like.length,
              index
            );
          })}
        </Swiper>
      </div>
      <div className="stats">
        <motion.p
          className="titre"
          initial={{ translateX: "-100px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stats
        </motion.p>
        <Stack direction="column" spacing={0.5}>
          {/* Vue d'ensemble */}
          {accordion(
            cardStat(true, eyeIcon, listLink("", "Vue d'ensemble", lorem)),
            <Stack direction="row" spacing={2}>
              {CardNbre(
                highlight?.length < 9
                  ? "0" + highlight?.length
                  : highlight?.length,
                "Nombre de highlights"
              )}
              {CardNbre(
                sommeView < 9 ? "0" + sommeView : sommeView,
                "Nombre total de vue"
              )}
              {CardNbre(
                sommeLike < 9 ? "0" + sommeLike : sommeLike,
                "Nombre total de j'aime"
              )}
            </Stack>
          )}

          {/* Vue par highlight */}
          {accordion(
            cardStat(true, eyeIcon, listLink("", "Vue par highlight", lorem)),
            <Stack direction="column" spacing={2}>
              <div onClick={() => setOpenViewHighlight(!openViewHighlight)}>
                {cardStat(
                  false,
                  "",
                  listLink("listLink", "Nombre de vue", lorem)
                )}
              </div>

              {/* Modal view highlight */}
              <Modal
                open={openViewHighlight}
                onClose={() => setOpenViewHighlight(!openViewHighlight)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleDelete}>
                  <NbrViewHighlight
                    setOpenViewHighlight={setOpenViewHighlight}
                  />
                </Box>
              </Modal>

              {cardStat(
                false,
                "",
                listLink("listLink", "Nombre de clique sur lien", lorem)
              )}
            </Stack>
          )}
        </Stack>
      </div>

      <div className="gerer">
        <motion.p
          initial={{ translateX: "-100px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.6 }}
          className="titre"
        >
          Gérer
        </motion.p>

        <Stack direction="column" spacing={0.5}>
          {/* Choisir les tops highlights */}
          {normalCardStat(
            true,
            starLock,
            "Choisir les tops highlights",
            true,
            lorem
          )}

          {/* Supprimer un highlight */}
          <div onClick={() => setOpenDeleteHighlight(!openDeleteHighlight)}>
            {normalCardStat(
              true,
              carbonDelete,
              "Supprimer un highlight",
              true,
              lorem
            )}
          </div>
          <Modal
            open={openDeleteHighlight}
            onClose={() => setOpenDeleteHighlight(!openDeleteHighlight)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleDelete}>
              <DeleteHighlight
                setOpenDeleteHighlight={setOpenDeleteHighlight}
              />
            </Box>
          </Modal>

          {/* Créer un highlight */}
          {normalCardStat(
            true,
            addIcon,
            "Créer un highlight",
            false,
            "",
            "/professionnel/creation-highlight/nouveau-contenu/ajout-image"
          )}
        </Stack>
      </div>
    </LayoutDashboard>
  );
}

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "#FFF",
//   borderRadius: "12px",
//   border: "1px solid #FFF",
//   boxShadow: 24,
//   p: 5,
// };

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80%",
  height: "80vh",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  borderRadius: "12px",
  border: "1px solid #FFF",
  boxShadow: 24,
  p: 5,
};
