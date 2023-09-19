import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./styles/Highlight.scss";
import { Grid, Stack } from "@mui/material";
import { AppContext } from "../../Context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_HIGHLIGHTFOLLOW_LIST,
  GET_HIGHLIGHTFOLLOW_LIST_ACTIVE,
} from "../../Reducers/ReducerHighlight";
import { get_highlight_ofProf_followByPro } from "../../Actions/ActionHighlight";
import { Swiper, SwiperSlide } from "swiper/react";

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
  BaseURL,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";

export default function Highlight() {
  const { Uuid} = useContext(AppContext);
  // States
  const swiperRef = useRef(null);
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

  // get all highlight of prof
  useEffect(() => {
    if (Uuid) {
      if (highligh_active === false) {
        dispatch(get_highlight_ofProf_followByPro(Uuid));
      }
    }
  }, [dispatch, Uuid, highligh_active]);

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

  const CardHighlight = (bg, vu, like, index) => {
    const bag = `url(${verificationCloudinaryHighlight(bg)})`;
    return (
      <Grid item md={4}>
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

          <div className="on-hover">
            <button
              onClick={() => {
                setShowHigh(true);
                setIndexShow(index);
              }}
            >
              <Stack direction="row" spacing="8px">
                <VisibilityIcon sx={{ width: "16px", height: "16px" }} />
                <p>Voir</p>
              </Stack>
            </button>
          </div>
        </div>
      </Grid>
    );
  };

  // Swiper slide Highlight
  const ShowHighlightMini = highlight.map((high,index) => {
    return (
      <SwiperSlide key={index}>
        <div className="bg-font"></div>
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

  // Show sliding Highlight
  const ShowHighlight = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="highlight-page"
    >
      {/* <Stack direction='column' spacing='45px'> */}
      <motion.div
        initial={{ translateX: "-100px" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        <Stack direction="column" spacing="8px">
          <p>Mes highlights</p>
          <div className="trait"></div>
        </Stack>
      </motion.div>

      <motion.div
        initial={{ translateY: "100px" }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.6 }}
        className="highlight-content"
      >
        <Grid container spacing="24px">
          {highlight.map((high, index) => {
            return CardHighlight(
              high.file,
              high.view.length,
              high.like.length,
              index
            );
          })}
        </Grid>
      </motion.div>

      {showHigh && ShowHighlight()}
      {/* </Stack> */}
    </motion.div>
  );
}
