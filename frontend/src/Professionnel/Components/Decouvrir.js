import { Grid, Stack } from "@mui/material";
import "./styles/Decouvrir.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import CardFocus from "../../Etudiant/components/CardFocus";
import { AppContext } from "../../Context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_FOCUS_FOLLOW_PROF,
  GET_FOCUS_FOLLOW_PROF_ACTIVE,
} from "../../Reducers/ReducerFocus";
import { get_focus_ofProf_followByPro } from "../../Actions/ActionFocus";

// Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Keyboard, Navigation } from "swiper";
import {
  GET_HIGHLIGHTFOLLOW_LIST,
  GET_HIGHLIGHTFOLLOW_LIST_ACTIVE,
} from "../../Reducers/ReducerHighlight";
import { get_highlight_ofProf_followByPro } from "../../Actions/ActionHighlight";
import {
  BaseURL,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";
import { get_prof_similaire_prof_action } from "../../Actions/ActionProf";
import {
  GET_SAMACATEGORY_PROF_LIST,
  GET_SAMECATEGORY_PROF_LIST_ACTIVE,
} from "../../Reducers/ReduceProfesssionnel";
import CardProfUnFollow from "./CardProfUnFollow";

export default function Decouvrir() {
  // States
  const swiperRef = useRef(null);
  const { Uuid } = useContext(AppContext);
  const dispatch = useDispatch();
  // State information highlight active
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [like, setLike] = useState(0);
  const [vu, setVu] = useState(0);
  // State show highlight
  const [showHigh, setShowHigh] = useState(false);
  // get index highlight showing
  const [indexShow, setIndexShow] = useState(0);

  // highlight
  const highligh_active = useSelector(GET_HIGHLIGHTFOLLOW_LIST_ACTIVE);
  const highlight = useSelector(GET_HIGHLIGHTFOLLOW_LIST);

  // focus
  const focus_list_active = useSelector(GET_FOCUS_FOLLOW_PROF_ACTIVE);
  const focus_list = useSelector(GET_FOCUS_FOLLOW_PROF);

  // prof
  const prof_smilaire_active = useSelector(GET_SAMECATEGORY_PROF_LIST_ACTIVE);
  const prof_smilaire_list = useSelector(GET_SAMACATEGORY_PROF_LIST);

  // get all highlight of prof
  useEffect(() => {
    if (Uuid) {
      if (highligh_active === false) {
        dispatch(get_highlight_ofProf_followByPro(Uuid));
      }
    }
  }, [dispatch, Uuid, highligh_active]);

  // get all focus of prof
  useEffect(() => {
    if (Uuid) {
      if (focus_list_active === false) {
        dispatch(get_focus_ofProf_followByPro(Uuid));
      }
    }
  }, [dispatch, Uuid, focus_list_active]);

  // get all prof similAi
  useEffect(() => {
    if (Uuid) {
      if (prof_smilaire_active === false) {
        dispatch(get_prof_similaire_prof_action(Uuid));
      }
    }
  }, []);

  const params = {
    slidesPerView: 1,
    ref: swiperRef,
    modules: [Keyboard, Navigation],
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    className: "mySwiper",
    initialSlide: indexShow,
  };

  // Fonction de gestion pour le changement de slide
  const handleSlideChange = (index) => {
    // Accéder aux informations de la slide active en utilisant focus_list[index]
    setIndexShow(parseInt(index));
    setFile(highlight[index].professionnel.user.image_url);
    setFirstName(highlight[index].professionnel.user.first_name);
    setLastName(highlight[index].professionnel.user.last_name);
    setDescription(highlight[index].description);
    setLike(highlight[index].like.length);
    setVu(highlight[index].view.length);
  };

  // Vue Mini HIghlight
  const MiniHighlight = (name, img, y, index) => {
    return (
      <SwiperSlide>
        <motion.div
          initial={{ translateY: y }}
          animate={{ translateY: 0 }}
          transition={{ duration: 0.9 }}
          className="content"
          onClick={() => {
            setShowHigh(true);
            setIndexShow(index);
          }}
        >
          <Stack direction="column" spacing="4px">
            <div className="image">
              <img
                src={verificationCloudinaryHighlight(img)}
                alt="steedy_highlight"
              />
            </div>
            <div className="pseudo">
              <p>{name.length > 7 ? name.slice(0, 7) + "..." : name}</p>
            </div>
          </Stack>
        </motion.div>
      </SwiperSlide>
    );
  };

  // Swiper slide Highlight
  const ShowHighlightMini = highlight.map((high, index) => {
    return (
      <SwiperSlide key={index}>
        <div className="highlight-content" style={{ background: "#FFF" }}>
          <img
            src={verificationCloudinaryHighlight(high.file)}
            width="100%"
            height="100%"
          />
        </div>
      </SwiperSlide>
    );
  });

  // Vue Focus
  const VueFocus = focus_list.map((focus, index) => {
    return (
      <SwiperSlide key={index} className="vue-focus">
        <motion.div
          initial={{ width: "0", height: "0" }}
          animate={{ width: "100%", height: "100%" }}
          transition={{ duration: 0.6 }}
        >
          <CardFocus focus={focus} key={index} maximWidth={"286px"} />
        </motion.div>
      </SwiperSlide>
    );
  });

  // Show sliding Highlight
  const ShowHighlight = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        className="show-mini-highlight"
      >
        <Grid container className="container-showing">
          <div className="closed" onClick={() => setShowHigh(false)}>
            <CloseIcon sx={{ color: "#FFF", width: "30px", height: "30px" }} />
          </div>
          <Grid item md={5} className="part-info">
            <div className="info-perso">
              <motion.div
                initial={{ translateX: "-100px" }}
                animate={{ translateX: 0 }}
                transition={{ duration: 0.6 }}
                exit={{ translateX: "-100px" }}
              >
                <Stack direction="row" spacing="8px">
                  <div className="profil">
                    <img src={BaseURL + file} alt="steedy-profil" />
                  </div>
                  <div className="info-createur">
                    <Stack direction="column" spacing="6px">
                      <p className="nom">
                        {firstName} {lastName}
                      </p>
                      <p className="fonction">Developpement web</p>
                    </Stack>
                  </div>
                </Stack>
              </motion.div>
            </div>
            <div className="about-highlight">
              <Stack direction="row" spacing="24px">
                <motion.div
                  initial={{ translateX: "-100px" }}
                  animate={{ translateX: 0 }}
                  transition={{ duration: 0.6 }}
                  className="like"
                >
                  <Stack direction="row" spacing="12px">
                    <div className="icon">
                      <FavoriteIcon sx={{ width: "18px", height: "18px" }} />
                    </div>
                    <p className="nbr-like">{like}</p>
                  </Stack>
                </motion.div>
                <motion.div
                  initial={{ translateX: "100px" }}
                  animate={{ translateX: 0 }}
                  transition={{ duration: 0.6 }}
                  className="view"
                >
                  <Stack direction="row" spacing="12px">
                    <div className="icon">
                      <VisibilityIcon sx={{ width: "18px", height: "18px" }} />
                    </div>
                    <p className="nbr-view">{vu}</p>
                  </Stack>
                </motion.div>
              </Stack>
            </div>
            <div className="highlight-description">
              <motion.div
                initial={{ translateY: "100px" }}
                animate={{ translateY: 0 }}
                transition={{ duration: 0.6 }}
                className="box-description"
              >
                <p>
                  {description === ""
                    ? "Pas de description disponible"
                    : description}
                </p>
              </motion.div>
            </div>
          </Grid>
          <Grid item md={7} className="part-show">
            <Swiper
              {...params}
              onSlideChange={(swiper) => {
                handleSlideChange(swiper.realIndex);
                setIndexShow(swiper.realIndex);
              }}
            >
              {ShowHighlightMini}
            </Swiper>

            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </Grid>
        </Grid>
      </motion.div>
    );
  };

  console.log("highlight==>", highlight);

  return (
    <div className="decouvrir">
      <motion.div
        initial={{ translateX: "-100px" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        <Stack direction="column" spacing="8px">
          <p>Parcourir d{"'"}autres horizons</p>
          <div className="trait"></div>
        </Stack>
      </motion.div>

      <div className="contenu-decouvrir">
        <Stack direction="column" spacing="45px">
          {/* Mini Highlights */}
          {highlight.length > 0 && (
            <div className="mini-highlight">
              <Swiper slidesPerView={"auto"} spaceBetween={12}>
                {highlight.map((high, index) => {
                  return MiniHighlight(
                    high.professionnel.user.username,
                    high.file,
                    `90+${index}px`,
                    index
                  );
                })}
              </Swiper>

              {showHigh && ShowHighlight()}
            </div>
          )}

          {/* Some Focus */}
          <div className="some-focus">
            <Stack direction="column" spacing="24px">
              <motion.div
                initial={{ translateX: "-100px" }}
                animate={{ translateX: 0 }}
                transition={{ duration: 0.6 }}
                className="small-title"
              >
                <p>Focus</p>
              </motion.div>

              <Swiper slidesPerView={"auto"} spaceBetween={12}>
                {VueFocus}
              </Swiper>
            </Stack>
          </div>

          {/* Some Createurs */}
          {prof_smilaire_list.length > 0 && (
            <div className="some-createur">
              <Stack direction="column" spacing="24px">
                <motion.div
                  initial={{ translateX: "-100px" }}
                  animate={{ translateX: 0 }}
                  transition={{ duration: 0.6 }}
                  className="small-title"
                >
                  <p>Createurs</p>
                </motion.div>

                <Swiper slidesPerView={"auto"} spaceBetween={12}>
                  {prof_smilaire_list.map((prof, index) => (
                    <SwiperSlide key={index}>
                      <CardProfUnFollow prof={prof} key={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Stack>
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
}
