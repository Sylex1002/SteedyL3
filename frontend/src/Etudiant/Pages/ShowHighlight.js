import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import HeaderBlock from "../components/HeaderBlock";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwiperHighlightShow from "../components/SwiperHighlightShow";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import {
  GET_HIGHLIGHT_UNVIEWED,
  GET_HIGHLIGHT_UNVIEWED_ACTIVE,
} from "../../Reducers/ReducerHighlight";
import { AppContext } from "../../Context/AppContext";
import ReactPlayer from "react-player";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BaseURL, verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";

import {
  getAllHighLightUnViewedfAction,
  like_filter_highlight_action,
  likeHighlightAction,
} from "../../Actions/ActionHighlight";

import "./style/ShowHighlight.scss";

export default function ShowHighlight() {
  const [progress, setProgress] = useState(0);
  const [pauseStory, setpauseStory] = useState(false);
  const { TimingSlide, toggleSliding } = useContext(AppContext);
  const [viewDescription, setViewDescription] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  // Recuperer les highlight
  const user = useSelector(GET_USER_INFO_CONNECT);
  const highlight_unviewed = useSelector(GET_HIGHLIGHT_UNVIEWED);
  const highlight_unviewed_ACTIVE = useSelector(GET_HIGHLIGHT_UNVIEWED_ACTIVE);
  const { Uuid } = useContext(AppContext);
  const dispatch = useDispatch();

  // get all HIGHLIGHT
  useEffect(() => {
    if (Uuid !== null) {
      // ========HIGHLIGHT=======
      if (highlight_unviewed_ACTIVE === false) {
        dispatch(getAllHighLightUnViewedfAction(Uuid));
      }
    }
  }, [dispatch, Uuid, highlight_unviewed_ACTIVE]);

  useEffect(() => {
    if (TimingSlide) {
      setProgress(0);
      toggleSliding();
    }
  }, [TimingSlide, toggleSliding]);

  useEffect(() => {
    // if (TimingSlide) {
    //     setProgress(0)
    //     toggleSliding()
    // }

    if (highlight_unviewed.length > 0) {
      const pause = document.querySelector(
        ".swiper-slide-active .showing .affichage_actif"
      );

      pause.addEventListener("mouseover", () => {
        setpauseStory(true);
      });

      pause.addEventListener("mouseout", () => {
        setpauseStory(false);
      });
    }

    if (!pauseStory) {
      setTimeout(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            return 0;
          } else {
            return (oldProgress += 1);
          }
        });
      }, 40);
    }

    if (progress === 100) {
      const swiper = document.querySelector(".mySwiper").swiper;
      if (swiper.isEnd) {
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    }
  }, [progress, pauseStory, highlight_unviewed]);

  let linkIndex = (text) => {
    return text.search(/http(s)?:\/\/[^\s]+/);
  };

  const showDescription = (text) => {
    const urlRegex = /(http(s)?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    const modifiedText = parts.map((part, index) => {
      return urlRegex.test(part) ? (
        <Link key={index} className="link" to={part} target="_blank">
          {part}
        </Link>
      ) : (
        part
      );
    });
    return modifiedText;
  };

  const verifyIsLike = (id) => {
    const highlightId = highlight_unviewed.filter((item) => item.id === id);

    const ifIsHere = () => {
      const myLike = highlightId[0].like.filter(
        (item) => item === user.id
      ).length;
      if (myLike !== 0) {
        return (
          <FavoriteIcon
            sx={{ width: "20px", height: "20px", color: "var(--bg)" }}
          />
        );
      } else {
        return (
          <FavoriteBorderIcon
            sx={{ width: "20px", height: "20px", color: "var(--bg)" }}
          />
        );
      }
    };
    return ifIsHere();
  };

  const handleLike = async (highlight, index) => {
    const filter_high_length = highlight.like.filter(
      (item) => item === user.id
    ).length;

    if (filter_high_length === 0) {
      const newhighlight = {
        ...highlight,
        like: [...highlight.like, user.id],
      };
      let new_hight = [...highlight_unviewed];
      new_hight[index] = newhighlight;
      // dispatch like
      await dispatch(like_filter_highlight_action(new_hight));

      // post action
      await dispatch(
        likeHighlightAction({
          user_id: user.id,
          highlight_id: highlight.id,
        })
      );
    }
  };

  return (
    <div className="showHighlight">
      <HeaderBlock redirection={-1} />
      <SwiperHighlightShow>
        {highlight_unviewed.map((high, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="showing">
                {high.type ? (
                  <ReactPlayer
                    url={`${BaseURL + high.file}`}
                    playing={true}
                    controls={false}
                    className="Hi_show_video"
                    loop
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <img
                    src={verificationCloudinaryHighlight(high.file)}
                    className="Hi_show_img"
                    alt="..."
                    width="100%"
                    height="100%"
                  />
                )}

                <div className="affichage_actif">
                  <div className="topHeader">
                    <div className="durationLine">
                      <progress
                        value={progress}
                        max="100"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="header">
                      <div className="pdp">
                        <img
                          src={`http://127.0.0.1:8000${high.professionnel.user.image_url}`}
                          alt="..."
                        />
                      </div>
                      <div className="infoUser">
                        <Stack direction="column" spacing={0.3}>
                          <p>{high.professionnel.user.first_name}</p>
                          <span>I don`t know what</span>
                        </Stack>
                      </div>
                      <div className="threePoint">
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>
                  <div className="textPublish">
                    <div
                      className="description"
                      style={
                        viewDescription
                          ? { height: "auto" }
                          : { height: "12px" }
                      }
                    >
                      <div
                        className="arrow"
                        onClick={() => setViewDescription(!viewDescription)}
                        style={
                          viewDescription
                            ? { transform: "rotate(0deg)" }
                            : { transform: "rotate(180deg)" }
                        }
                      >
                        <ArrowDropDownCircleIcon />
                      </div>

                      {viewDescription ? (
                        linkIndex(high.description) >= 0 ? (
                          <p>{showDescription(high.description)}</p>
                        ) : high.description.length > 100 ? (
                          <p>
                            {!viewAll ? (
                              high.description.slice(0, 100) + "... "
                            ) : (
                              <>
                                {high.description}
                                <span
                                  style={
                                    viewAll
                                      ? {
                                          textDecoration: "underline",
                                          display: "block",
                                          cursor: "pointer",
                                          fontWeight: 700,
                                        }
                                      : {
                                          textDecoration: "underline",
                                          display: "none",
                                        }
                                  }
                                  onClick={() => setViewAll(false)}
                                >
                                  Voir moins
                                </span>
                              </>
                            )}
                            <span
                              style={
                                viewAll
                                  ? {
                                      textDecoration: "underline",
                                      display: "none",
                                    }
                                  : {
                                      textDecoration: "underline",
                                      display: "block",
                                      cursor: "pointer",
                                      fontWeight: 700,
                                    }
                              }
                              onClick={() => setViewAll(true)}
                            >
                              Voir plus
                            </span>
                          </p>
                        ) : (
                          <p>{high.description}</p>
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="actions">
                    <Grid container spacing="12px">
                      <Grid item md={3}>
                        <Stack direction="row" spacing="8px">
                          <VisibilityIcon
                            sx={{ width: "20px", height: "20px" }}
                          />
                          <p>{high.view.length}</p>
                        </Stack>
                      </Grid>
                      <Grid item md={9} className="about-this">
                        <div
                          onClick={() => handleLike(high, index)}
                          style={{ cursor: "pointer" }}
                        >
                          <Stack direction="row" spacing="8px">
                            {verifyIsLike(high.id)}
                            <p>{high.like.length}</p>
                          </Stack>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  {/* <div className='bottom'>
                                        <Stack direction='column'>
                                            <div className='response'>
                                                <input type='search' placeholder='Envoyer un message' />
                                                <div className='sendIconBox'>
                                                    <SendIcon className='sendIcon' />
                                                </div>
                                            </div>
                                        </Stack>
                                    </div> */}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </div>
                <div className="affichage_inactif">
                  <div className="profil">
                    <div className="box">
                      <Stack direction="column" spacing={1}>
                        <div className="image">
                          <img
                            src={`http://127.0.0.1:8000${high.professionnel.user.image_url}`}
                            alt="..."
                          />
                        </div>
                        <div
                          className="infoUser"
                          style={{ textAlign: "center" }}
                        >
                          <p>{high.professionnel.user.first_name}</p>
                          <span>I don`t know what</span>
                        </div>
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </SwiperHighlightShow>
    </div>
  );
}
