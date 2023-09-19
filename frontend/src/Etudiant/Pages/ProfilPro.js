import "./style/profilPro.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Skeleton, Stack } from "@mui/material";
import CardFocus from "../components/CardFocus";
import { SwiperSlide } from "swiper/react";
import bagIcon from "../../Images/bagIcon.png";
import cardIcon from "../../Images/cardIcon.png";
import mailIcon from "../../Images/mailIcon.png";
import userIcon from "../../Images/userName.png";
import SwiperFocus from "../components/SwiperFocus";
import HeaderBlock from "../components/HeaderBlock";
import FocusProfilPro from "../components/FocusProfilPro";
import SlideItems from "../components/SwiperHighlight";
import { useNavigate, useMatch } from "react-router-dom";
import { motion } from "framer-motion";

import chatLogo from "../../Images/chat_bubble.png";
import CommunityBox from "../components/CommunityBox";
import { getOneProfAction } from "../../Actions/ActionProf";
import { getAllFocusProfAction } from "../../Actions/ActionFocus";
import { getAllHighLightProfAction } from "../../Actions/ActionHighlight";
import {
  userFollowerAction,
  userUnFollowerAction,
} from "../../Actions/actionAuth";
import {
  GET_USER_ACTIVE,
  GET_USER_INFO_CONNECT,
} from "../../Reducers/ReducerUser";
import SkeletonHighlightSlide from "../../Global/Components/SkeletonHighlightSlide";
import {
  GET_ONE_PROF,
  GET_ONE_PROF_ACTIVE,
} from "../../Reducers/ReduceProfesssionnel";
import { GET_MY_FOCUS } from "../../Reducers/ReducerFocus";
import { BaseURL, verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import { GET_MY_HIGHLIGHT } from "../../Reducers/ReducerHighlight";
import { AudioContext } from "../../Context/AudioContext ";
import { AppContext } from "../../Context/AppContext";
import ReactPlayer from "react-player";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { GET_ALL_COMMUNITY_CONTAINER_USER } from "../../Reducers/ReducerCommunity";
import { GET_ACTIVE_ALL_SERIE_FOCUS_PROF, GET_ALL_SERIE_FOCUS_PROF_LIST } from "../../Reducers/ReduceSerieFocus";
import { getAllFocusSerieProfAction } from "../../Actions/ActionSerieFocus";

export default function ProfilPro() {
  // audio context
  const { mutedFocus, setIsPlaying, setMutedFocus, ActiveFootFocus } =
    useContext(AudioContext);
  const { Uuid, setInitialSliding } = useContext(AppContext);
  const allGroupContainerUser = useSelector(GET_ALL_COMMUNITY_CONTAINER_USER);
  const match = useMatch("/:fonction/createur/:id");
  const id = match?.params?.id;
  // prof selector
  const prof = useSelector(GET_ONE_PROF);
  const prof_active = useSelector(GET_ONE_PROF_ACTIVE);

  // highlightList
  const highlight_List = useSelector(GET_MY_HIGHLIGHT);
  // focus
  // const my_focus_active = useSelector(GET_MY_FOCUS_ACTIVE);
  const my_focus = useSelector(GET_MY_FOCUS);

  // Série professionnel
  const serie = useSelector(GET_ALL_SERIE_FOCUS_PROF_LIST);
  const serie_active = useSelector(GET_ACTIVE_ALL_SERIE_FOCUS_PROF);

  // filtre focus gratuis and payant
  const focus_gratuit = my_focus.filter((item) => item.payant === false);
  const focus_payants = my_focus.filter((item) => item.payant === true);
  // USER
  const user = useSelector(GET_USER_INFO_CONNECT);
  const user_active = useSelector(GET_USER_ACTIVE);
  // audio
  const [playing, setPlaying] = useState(false);
  const AudioRef = useRef(null);

  // all
  const date = new Date(prof.user?.createdAt);
  const pdp = `url(${BaseURL + prof.user?.image_url})`;
  const [activeMenu, setactiveMenu] = useState("highlight");
  const [abonne, setAbonne] = useState(false);
  const [playActive, setPlayActive] = useState(null);
  const [pageHeightPro, setPageHeightPro] = useState(0);
  const pageProRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get série professionnel
  useEffect(() => {
    if (!serie_active) {
      dispatch(getAllFocusSerieProfAction(id));
    }
  }, [serie_active]);

  // get prof folloed
  useEffect(() => {
    if (id !== null && id !== undefined) {
      // get prof folloed
      dispatch(getOneProfAction(id));
    }
  }, [id, dispatch]);

  // get prof folloed
  useEffect(() => {
    if (id !== null && id !== undefined) {
      // get prof Focus fAction
      dispatch(getAllFocusProfAction(id));
    }
  }, [id, dispatch]);

  // get All HighLight Prof Action
  useEffect(() => {
    if (id !== null && id !== undefined) {
      //getAllHighLightProfAction
      dispatch(getAllHighLightProfAction(id));
    }
  }, [id, dispatch]);

  // setAbonne
  useEffect(() => {
    if (user_active) {
      if (prof_active) {
        const isAbonne = prof.user.following.some(
          (follower) => follower.id === Uuid
        );
        setAbonne(isAbonne);
      }
    }
  }, [prof_active, user, prof, user_active]);

  const handleFollow = () => {
    const user_id = user?.id;
    const following_id = prof?.user.id;
    const formdata = { follower: user_id, user: following_id };
    dispatch(userFollowerAction(formdata));
  };

  const handleUnFollow = () => {
    const user_id = user?.id;
    const following_id = prof?.user.id;
    const formdata = { follower: user_id, user: following_id };
    dispatch(userUnFollowerAction(formdata));
  };

  const showHighlight = highlight_List?.map((high, index) => {
    return (
      <SwiperSlide
        key={index}
        className="swiperItem"
        onClick={() => {
          setInitialSliding(index);
          navigate("/etudiant/showhighlight");
        }}
      >
        <Stack direction="column" spacing={1}>
          <img
            src={verificationCloudinaryHighlight(high.file)}
            className="imgHihglight"
            alt="story"
            width="100%"
            height="100%"
          />
          {high.professionnel && (
            <p>{high.professionnel.user.first_name.slice(0, 7)}</p>
          )}
        </Stack>
      </SwiperSlide>
    );
  });

  const changeBar = (n) => {
    document.querySelector(".bar_active").style.transform = `translateX(${n})`;
  };

  // Recuperer les Focus qui sont gratuits
  const showFocusPubliccation = () => {
    return (
      <div className="focusPub">
        <p className="title">Features Focus</p>
        {focus_payants?.length > 0 ? (
          <div className="ShowFocusFree_content">
            {console.log(focus_payants)}
            {focus_payants?.map((focus, i) => (
              <FocusProfilPro
                key={i}
                img={verificationCloudinaryHighlight('/' + focus.bg)}
                name={prof.user?.first_name}
                title={focus.titre}
                listen={focus.number_listen_count}
                focus={focus}
                playActive={playActive}
                setPlayActive={setPlayActive}
              />
            ))}
          </div>
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
    );
  };

  const ShowFocusFree = () => {
    return (
      <div className="FocusContent">
        <p className="title">Focus gratuit</p>
        {focus_gratuit?.length > 0 ? (
          <div className="ShowFocusFree_content">
            {focus_gratuit?.map((focus, i) => (
              <FocusProfilPro
                img={verificationCloudinaryHighlight('/' + focus.bg)}
                listen={focus.number_listen_count}
                setPlayActive={setPlayActive}
                name={prof.user?.first_name}
                playActive={playActive}
                title={focus.titre}
                focus={focus}
                key={i}
              />
            ))}
          </div>
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
                        {prof.user?.first_name} {prof.user?.last_name}
                      </p>
                    </Stack>
                  </div>
                  <div className="adresse">
                    <Stack direction="row" spacing={2}>
                      <img src={mailIcon} alt="..." />
                      <p>{prof.user?.email}</p>
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
                    {prof.user?.domain ? (
                      <Stack direction="row" spacing={2}>
                        <img src={bagIcon} alt="..." />
                        <p>{prof.user?.domain}</p>
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
              <div style={{ marginTop: '12px' }}>
                <CommunityBox Communitys={allGroupContainerUser} />
              </div>
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
                    {prof.user?.categories.map((category, i) => (
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

  // handlePlayOver
  const handlePlayOver = () => {
    AudioRef.current?.seekTo(0);
    setPlaying(true);
    if (ActiveFootFocus) {
      setIsPlaying(false);
    }
  };

  // handlePauseOut
  const handlePauseOut = () => {
    if (ActiveFootFocus) {
      if (mutedFocus) {
        setIsPlaying(false);
      } else {
        setMutedFocus(false);
        setIsPlaying(true);
      }
    }

    setPlaying(false);
  };

  // handle return
  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div
      className="profilPro"
      ref={pageProRef}
      onScroll={() => setPageHeightPro(pageProRef.current.scrollTop)}
    >
      <div
        className="menuFixed"
        style={
          pageHeightPro < 100
            ? { height: 0, zIndex: "0" }
            : { height: "auto", zIndex: "999" }
        }
      >
        <HeaderBlock />
      </div>
      <div className="profil" id="profil" style={{ background: pdp }}>
        <div className="boxProfil">
          {/* bar return */}
          <div id="profil_return" onClick={handleReturn}>
            <Stack direction='row' spacing='8px' style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowLeftIcon style={{ width: '35px', height: '35px', color: 'white' }} />
              <p>Retour</p>
            </Stack>
          </div>
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
                    {prof.user?.image_url ? (
                      <>
                        {/* audio of prof */}
                        <ReactPlayer
                          ref={AudioRef}
                          url={`${BaseURL + prof.podcast}`}
                          controls={false}
                          playing={playing}
                          height={1}
                          width={1}
                        />

                        {/* image of prof */}
                        <img
                          src={`${BaseURL + prof.user?.image_url}`}
                          alt="..."
                          onMouseOver={handlePlayOver}
                          onMouseLeave={handlePauseOut}
                        />

                        {/* bar de audio */}
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
                    {prof.user?.bio ? (
                      <p>{prof.user?.bio}</p>
                    ) : (
                      <p>Pas de biographie</p>
                    )}
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
                      {prof.user !== undefined ? (
                        <>
                          <p>
                            {prof.user.first_name} {prof.user.last_name}
                          </p>
                          <span>
                            {prof.user.following.length} abonnée
                            {prof.user.following.length > 1 && "s"}
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
                      onClick={() => setAbonne(!abonne)}
                    >
                      {abonne ? (
                        <button className="desabonner" onClick={handleUnFollow}>
                          Deja abonne
                        </button>
                      ) : (
                        <button className="abonner" onClick={handleFollow}>
                          S`abonner
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="btnMsge">
                    <button onClick={() => navigate(`/etudiant/messages/${prof.user.matricule}`)} style={{ cursor: "pointer" }}>
                      <div className="icon">
                        <img src={chatLogo} alt="..." />
                      </div>
                      <p>Envoyer un message</p>
                    </button>
                  </div>
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
                    ? showFocusPubliccation()
                    : activeMenu === "focus"
                      ? ShowFocusFree()
                      : activeMenu === "about" && showAbout()}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {abonne && (
        <div className="ifAbonne">
          <div className="allPaid">
            <div className="highlightPro">
              {highlight_List.length > 0 ? (
                <SlideItems>
                  {showHighlight}
                  <SwiperSlide />
                  <SwiperSlide />
                </SlideItems>
              ) : (
                <SkeletonHighlightSlide />
              )}
            </div>

            {serie.length > 0 && (
              <>
                {serie.map((myserie, index) => (
                  <div key={index} className="focusSerie">
                    <Stack direction='column' spacing='12px'>
                      <div className="title">
                        <p>{myserie.titre}</p>
                        <div className="view-all"
                          onClick={() =>
                            navigate(`/etudiant/createur/${id}/${myserie.id}`)
                          }
                        >
                          <Stack direction='row' spacing='8px' style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
                            <p>Voir tout</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 7 12" fill="none">
                              <path d="M1.125 1.5L5.625 6L1.125 10.5" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Stack>
                        </div>
                      </div>
                      <div className="description">
                        <p>{myserie.description}</p>
                      </div>
                    </Stack>
                    <div className="showFocus">
                      {myserie?.focuses?.length > 0 ?
                        <SwiperFocus>
                          {myserie.focuses.map((focus, i) => (
                            <SwiperSlide key={i}>
                              <CardFocus focus={focus} />
                            </SwiperSlide>
                          ))}
                          <SwiperSlide />
                          <SwiperSlide />
                          <SwiperSlide />
                        </SwiperFocus>
                        :
                        <div className='empty'>
                          <p>Pas de focus dans cette série</p>
                        </div>
                      }
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
