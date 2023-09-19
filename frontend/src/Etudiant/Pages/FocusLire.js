import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFocusByCategory,
  getAllFocusProfAction,
  getOneFocusAction,
  focusLikeAction,
} from "../../Actions/ActionFocus";
import {
  BaseURL,
  verificationCloudinaryFocus,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { GET_FOCUS_ONE_CATEGORY } from "../../Reducers/ReducerFocus";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FocusCardCategory from "../components/FocusCardCategory";
import ModalCommentaire from "../components/ModalCommentaire";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { AudioContext } from "../../Context/AudioContext ";
import SlideItemsFocus from "../components/SwiperFocus";
import { useNavigate, useMatch } from "react-router-dom";
import HeaderBlock from "../components/HeaderBlock";
import FooterFocus from "../components/FooterFocus";
import { dataParser } from "../../Helpers/Utils";
import Skeleton from "@mui/material/Skeleton";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import WaveSurfer from "wavesurfer.js";
import PropTypes from "prop-types";
import "./style/FocusLire.scss";
import "swiper/css";

export default function FocusLire() {
  const {
    setProgress,
    audio,
    isPlaying,
    focusData,
    wavesurfer,
    setDataNext,
    setfocusData,
    setActiveModal,
    setWavesurferLoad,
    setActiveFootFocus,
    setCancelButtonFocus,
    handlePlayFocus,
    handlePauseFocus,
    handleChangeAudio,
    handlePlayFocusAutoAudio,
  } = useContext(AudioContext);

  const { id } = useMatch("/etudiant/Focus/:id").params;
  const Focus_By_category = useSelector(GET_FOCUS_ONE_CATEGORY);
  const [FocusCategoryData, setFocusCategoryData] = useState([
    ...Focus_By_category,
  ]);
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);
  const [CommentData, setCommentData] = useState(null);
  const [Like_Active, setLike_Active] = useState(false);
  const [annullDouble, setAnnullDouble] = useState(false);
  const [activePlaayCard, setActivePlaayCard] = useState(false);
  const [idFocus, setIdFocus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // add data comment in state
  useEffect(() => {
    if (focusData) {
      setCommentData(focusData.comments);
    }
  }, [focusData]);

  // add id focus in state
  useEffect(() => {
    if (idFocus === null || idFocus !== id) {
      setIdFocus(id);
    }
  }, [id, idFocus]);

  // active next play
  useEffect(() => {
    if (activePlaayCard) {
      handlePlayFocusAutoAudio();
      setActivePlaayCard(false);
    }
  }, [activePlaayCard, handlePlayFocusAutoAudio, setActivePlaayCard]);

  // wave audio
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#fff",
      progressColor: "#f49030",
      height: 30,
      responsive: true,
      cursorWidth: 0,
      barHeight: 0.5,
      barWidth: 3,
      cursorColor: "red",
      autoCenter: true,
    });

    // Charger l'audio dans Wavesurfer
    if (audio) {
      wavesurfer.current.load(audio.src);
    }
    // Nettoyer Wavesurfer lors du démontage du composant
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audio, wavesurfer]);

  // update progeressed
  useEffect(() => {
    const updateProgress = () => {
      const currentTime = audio.currentTime;
      setProgress(currentTime);
      wavesurfer.current.setCurrentTime(currentTime);
    };
    // update progress bar
    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
    }
    // remove event timeupdate listener
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audio, wavesurfer, setProgress]);

  // play auto
  useEffect(() => {
    if (wavesurfer.current && !annullDouble) {
      // Mettre à jour la progression de Wavesurfer avec la progression de l'audio
      wavesurfer.current.on("ready", () => {
        handlePlayFocusAutoAudio();
        setAnnullDouble(true);
      });
    }
  }, [handlePlayFocusAutoAudio, wavesurfer, annullDouble]);

  // active like
  useEffect(() => {
    if (focusData) {
      if (focusData.liked_by.includes(user_connect.id)) {
        setLike_Active(true);
      } else {
        setLike_Active(false);
      }
    }
  }, [focusData, setLike_Active, user_connect]);

  // get one focus
  useEffect(() => {
    if (isPageRefreshed) {
      if ((focusData && focusData.id !== id) || (id && focusData === null)) {
        // get info focus
        dispatch(getOneFocusAction(id))
          .then((res) => {
            // commet len
            setCommentData(res.comments);
            // add data of focus
            setfocusData({ ...res });
            // const audioLink = `${API_CLOUDINARY}${res.podcast}`
            const audioLink = verificationCloudinaryFocus('/'+res.podcast);
            handleChangeAudio(audioLink);
          })
          .catch(() => {
            setActiveFootFocus(false);
            navigate("/etudiant/decouvrir");
          });
      }
    } else {
      setIsPageRefreshed(true);
    }
  }, [
    dispatch,
    isPageRefreshed,
    setfocusData,
    focusData,
    id,
    navigate,
    handleChangeAudio,
    setActiveFootFocus,
  ]);

  // fetch category information
  useEffect(() => {
    async function fetchFocusCategory() {
      if (focusData && FocusCategoryData.length === 0) {
        if (focusData.categorie) {
          await dispatch(getFocusByCategory(focusData.categorie.id)).then(
            (res) => {
              setFocusCategoryData([...res]);
              // ajoute next data
              setDataNext([...res]);
            }
          );
        } else {
          await dispatch(
            getAllFocusProfAction(focusData.professionnel.id)
          ).then((res) => {
            setFocusCategoryData([...res]);
            // ajoute next data
            setDataNext([...res]);
          });
        }
      }
    }
    fetchFocusCategory();
  }, [
    dispatch,
    FocusCategoryData,
    setFocusCategoryData,
    focusData,
    setDataNext,
  ]);

  // ajoute next data
  useEffect(() => {
    if (FocusCategoryData) {
      setDataNext([...FocusCategoryData]);
    }
  }, [FocusCategoryData, setDataNext]);

  // active modal focus
  useEffect(() => {
    setActiveModal(true);
    setCancelButtonFocus(true);
    setWavesurferLoad(true);
    return () => {
      setWavesurferLoad(false);
      setActiveModal(false);
    };
  }, [id, setCancelButtonFocus, setActiveModal, setWavesurferLoad]);

  // active footer
  useEffect(() => {
    if (focusData) {
      setActiveFootFocus(true);
    }
  }, [focusData, setActiveFootFocus]);

  // handle like
  const handleLikeFocus = async () => {
    const user_id = user_connect.id;
    const focus_id = focusData.id;
    const formdata = { user_id, focus_id };

    await dispatch(focusLikeAction(formdata)).then((res) => {
      // add data
      setfocusData({ ...res });
      setCommentData(res.comments);
      //  if user like
      if (res.liked_by.includes(user_connect.id)) {
        setLike_Active(true);
      } else {
        setLike_Active(false);
      }
    });
  };

  // add comment lenght
  useEffect(() => {
    return () => {
      if (focusData) {
        setCommentData(focusData.comments);
      }
    };
  }, [focusData]);

  const handleNavigateComment = () => {
    // navigate into comment focus
    navigate(`/etudiant/focus/${focusData.id}/listen`);
  };

  const handleWaveClick = (event) => {
    if (audio && audio.duration > 0) {
      const waveWidth = event.target.clientWidth;
      const clickPosition = event.nativeEvent.offsetX;
      const percentage = (clickPosition / waveWidth) * 100;
      const currentTime = (percentage / 100) * audio.duration;
      audio.currentTime = currentTime;
    }
  };

  const handleNavigateProf = () => {
    navigate(`/etudiant/createur/${focusData.professionnel.id}`);
  };

  return (
    <div id="FocusLire">
      <div className="FocusLire_container">
        <HeaderBlock />
        <div
          className="FocusLire_content"
          style={{
            background: `url(${
              focusData && verificationCloudinaryHighlight('/'+focusData.bg)
            }) center/cover no-repeat `,
          }}
        >
          <FocusBanner
            Like_Active={Like_Active}
            focusData={focusData}
            handlePlayFocus={handlePlayFocus}
            isPlaying={isPlaying}
            FocusCategoryData={FocusCategoryData}
            Navigation={handleNavigateComment}
            handleLikeFocus={handleLikeFocus}
            CommentData={CommentData}
            handleWaveClick={handleWaveClick}
            handlePauseFocus={handlePauseFocus}
            handleNavigateProf={handleNavigateProf}
          />
          <FocusByCategory
            setActivePlaayCard={setActivePlaayCard}
            FocusCategoryData={FocusCategoryData}
            idFocus={idFocus}
            setIdFocus={setIdFocus}
          />
        </div>
        <div className="FocusLire_content_footer">
          <FooterFocus />
          <ModalCommentaire
            focus={focusData}
            CommentData={CommentData}
            setCommentData={setCommentData}
          />
        </div>
      </div>
    </div>
  );
}

// focus by category show
const FocusByCategory = ({
  idFocus,
  setIdFocus,
  FocusCategoryData,
  setActivePlaayCard,
}) => (
  <div className="FocusBanner_category_list">
    {FocusCategoryData[0] !== undefined ? (
      <Swiper slidesPerView={"auto"} spaceBetween={15}>
        {FocusCategoryData.map((focus, index) => (
          <SwiperSlide className="swiper_category" key={index}>
            <FocusCardCategory
              idFocus={idFocus}
              setIdFocus={setIdFocus}
              setActivePlaayCard={setActivePlaayCard}
              focus={focus}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide />
        <SwiperSlide />
        <SwiperSlide />
        <SwiperSlide />
      </Swiper>
    ) : (
      <SlideItemsFocus>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Skeleton variant="rounded" width={200} height={100} />
        </SwiperSlide>
      </SlideItemsFocus>
    )}
  </div>
);

FocusByCategory.propTypes = {
  idFocus: PropTypes.string.isRequired,
  setIdFocus: PropTypes.string.isRequired,
  FocusCategoryData: PropTypes.array.isRequired,
  setActivePlaayCard: PropTypes.bool.isRequired,
};

// wave audio components
const WaveAudio = ({
  isPlaying,
  handlePlayFocus,
  handleWaveClick,
  handlePauseFocus,
}) => (
  <div id="WaveAudio">
    <div className="WaveAudio_pause">
      {isPlaying ? (
        <PauseCircleIcon
          onClick={handlePauseFocus}
          className="WaveAudio_pause_icon"
        />
      ) : (
        <PlayCircleFilledWhiteIcon
          onClick={handlePlayFocus}
          className="WaveAudio_pause_icon"
        />
      )}
    </div>
    <div id="waveform" onClick={handleWaveClick}></div>
  </div>
);

WaveAudio.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  handlePlayFocus: PropTypes.func.isRequired,
  handleWaveClick: PropTypes.func.isRequired,
  handlePauseFocus: PropTypes.func.isRequired,
};

// focus banner
const FocusBanner = (props) => {
  const {
    focusData,
    handlePlayFocus,
    isPlaying,
    Navigation,
    Like_Active,
    handleLikeFocus,
    CommentData,
    handleWaveClick,
    handlePauseFocus,
    handleNavigateProf,
  } = props;

  return (
    <div id="FocusBanner">
      <div className="FocusBanner_content">
        <div className="FocusBanner_left">
          <div className="FocusBanner_top_vide"></div>
          <div className="FocusBanner_header">
            <div className="FocusBanner_header_left">
              {focusData ? (
                <img
                  onClick={handleNavigateProf}
                  src={`${BaseURL + focusData.professionnel.user.image_url}`}
                  alt="profil"
                />
              ) : (
                <Skeleton variant="rounded" width={40} height={40} />
              )}
            </div>
            <div className="FocusBanner_header_right">
              {focusData && (
                <h4>
                  {focusData.professionnel.user.first_name}{" "}
                  {focusData.professionnel.user.last_name}
                </h4>
              )}
              {focusData && (
                <p>
                  {focusData.professionnel.user.domain}{" "}
                  {dataParser(focusData.professionnel.user.createdAt)}{" "}
                </p>
              )}
            </div>
          </div>
          <div className="FocusBanner_title">
            {focusData && <h2>{focusData.titre.slice(0, 70)}</h2>}
          </div>
          <div className="FocusBanner_dec">
            {focusData && <p>{focusData.description.slice(0, 200)}</p>}
          </div>
          <div className="FocusBanner_btns">
            <div className="FocusBanner_btn_card">
              <div className="FocusBanner_btn_icons">
                {Like_Active ? (
                  <FavoriteOutlinedIcon
                    className="like_active FocusBanner_btn_icon"
                    onClick={handleLikeFocus}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    className="FocusBanner_btn_icon unlike_active"
                    onClick={handleLikeFocus}
                  />
                )}
              </div>
              {focusData ? (
                <span>{focusData.liked_by_count}</span>
              ) : (
                <Skeleton variant="rounded" width={20} height={20} />
              )}
            </div>
            <div className="FocusBanner_btn_card">
              <div className="FocusBanner_btn_icons">
                <ChatBubbleOutlinedIcon
                  onClick={Navigation}
                  className="FocusBanner_btn_icon"
                />
              </div>
              <span>{CommentData ? CommentData.length : 0}</span>
            </div>
            <div className="FocusBanner_btn_card">
              <div className="FocusBanner_btn_icons">
                <ShareOutlinedIcon className="FocusBanner_btn_icon" />
              </div>
              <span>0</span>
            </div>
          </div>
          <WaveAudio
            handlePlayFocus={handlePlayFocus}
            isPlaying={isPlaying}
            handleWaveClick={handleWaveClick}
            handlePauseFocus={handlePauseFocus}
          />
        </div>
        <div className="FocusBanner_right"></div>
      </div>
    </div>
  );
};

FocusBanner.propTypes = {
  focusData: PropTypes.object.isRequired,
  handlePlayFocus: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  Navigation: PropTypes.func.isRequired,
  Like_Active: PropTypes.bool.isRequired,
  handleLikeFocus: PropTypes.func.isRequired,
  handlePauseFocus: PropTypes.func.isRequired,
  CommentData: PropTypes.array.isRequired,
  handleWaveClick: PropTypes.func.isRequired,
  handleNavigateProf: PropTypes.func.isRequired,
};

