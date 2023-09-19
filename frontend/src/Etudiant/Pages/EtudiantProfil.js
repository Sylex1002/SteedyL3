import React, { useContext, useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import CardFocus from "../components/CardFocus";
import { AppContext } from "../../Context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import SlideItems from "../components/SwiperHighlight";
import SlideItemsFocus from "../components/SwiperFocus";
import CardHighlightPro from "../components/CardHighlightPro";
import { GET_HIGHLIGHT_UNVIEWED } from "../../Reducers/ReducerHighlight";
import SkeletonHighlightSlide from "../../Global/Components/SkeletonHighlightSlide";
import { getAllHighLightUnViewedfAction } from "../../Actions/ActionHighlight";
import { get_followed_prof_focusesAction } from "../../Actions/ActionFocus";
import { verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import HeaderBlock from "../components/HeaderBlock";
import SideBarPro from "../components/SideBarPro";
import HeaderPro from "../components/HeaderPro";
import FocusNone from "../components/FocusNone";
import PropTypes from "prop-types";
import "./style/EtudiantProfil.scss";
import {
  GET_FOCUS_FOLLOW_PROF,
  GET_FOCUS_FOLLOW_PROF_ACTIVE,
} from "../../Reducers/ReducerFocus";

export default function EtudiantProfil() {
  const { setInitialSliding, Uuid } = useContext(AppContext);
  const [navigatePart, setnavigatePart] = useState("publication");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // focus follow
  const focus_follow_active = useSelector(GET_FOCUS_FOLLOW_PROF_ACTIVE);
  const focus_follow = useSelector(GET_FOCUS_FOLLOW_PROF);

  // highlight
  const highlight_unviewed = useSelector(GET_HIGHLIGHT_UNVIEWED);

  // get followed prof focuses
  useEffect(() => {
    if (Uuid) {
      if (focus_follow_active === false) {
        dispatch(get_followed_prof_focusesAction(Uuid));
      }
    }
  }, [dispatch, Uuid, focus_follow_active]);

  // get all HIGHLIGHT
  useEffect(() => {
    if (Uuid !== null) {
      // ========HIGHLIGHT=======
      dispatch(getAllHighLightUnViewedfAction(Uuid));
    }
  }, [dispatch, Uuid]);

  return (
    <div id="EtudiantProfil">
      <div className="LayoutProfilPro">
        <HeaderBlock />
        <HeaderPro />
        <div className="scaffold">
          <div className="sideBar">
            <SideBarPro />
          </div>
          <div className="contentView">
            <div className="menuPro">
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <button
                    onClick={() => setnavigatePart("publication")}
                    className={
                      navigatePart === "publication" ? "links active" : "links"
                    }
                  >
                    Publications
                  </button>
                </Grid>
                <Grid item md={4}>
                  <button
                    onClick={() => setnavigatePart("highlight")}
                    className={
                      navigatePart === "highlight" ? "links active" : "links"
                    }
                  >
                    Highlight
                  </button>
                </Grid>
                <Grid item md={4}>
                  <button
                    onClick={() => setnavigatePart("focus")}
                    className={
                      navigatePart === "focus" ? "links active" : "links"
                    }
                  >
                    Focus
                  </button>
                </Grid>
              </Grid>
            </div>
            <div className="EtudiantProfil_publication">
              {navigatePart === "publication" && (
                <PublicationPro
                  setInitialSliding={setInitialSliding}
                  highlight_list={highlight_unviewed}
                  focusListFollow={focus_follow}
                  navigate={navigate}
                />
              )}
              {navigatePart === "highlight" && (
                <HighlightMurEtudiant highlightList={highlight_unviewed} />
              )}
              {navigatePart === "focus" && (
                <FocusMurEtudiant focusListFollow={focus_follow} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FocusMurEtudiant
const FocusMurEtudiant = ({ focusListFollow }) => (
  <div className="focusMurEtudiant">
    <Grid container spacing={2}>
      {focusListFollow.length > 0 ? (
        focusListFollow.map((focus, index) => {
          return (
            <Grid key={index} item>
              <CardFocus focus={focus} />
            </Grid>
          );
        })
      ) : (
        <FocusNone />
      )}
    </Grid>
  </div>
);


FocusMurEtudiant.propTypes = {
    focusListFollow: PropTypes.array.isRequired,
};


// publication pro
const PublicationPro = ({
  highlight_list,
  focusListFollow,
  setInitialSliding,
  navigate,
}) => (
  <div id="PublicationPro">
    <div className="highlightSwipe">
      <div className="swiper">
        {highlight_list.length > 0 ? (
          <SlideItems className="SlideItemsActualite">
            {highlight_list.map((high, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="swiperItem"
                  onClick={() => {
                    setInitialSliding(index);
                    navigate(`/etudiant/Highlights/${high.id}`);
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
            })}
            <SwiperSlide />
            <SwiperSlide />
          </SlideItems>
        ) : (
          <SkeletonHighlightSlide />
        )}
      </div>
    </div>
    <div className="focus">
      <div className="title">
        <p>Focus</p>
      </div>
      <div className="FocusContent">
        {focusListFollow.length > 0 ? (
          <SlideItemsFocus>
            {focusListFollow.map((focus, index) => (
              <SwiperSlide key={index}>
                <CardFocus focus={focus} />
              </SwiperSlide>
            ))}
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
          </SlideItemsFocus>
        ) : (
          <FocusNone />
        )}
      </div>
    </div>
  </div>
);


PublicationPro.propTypes = {
    highlight_list: PropTypes.array.isRequired,
    focusListFollow: PropTypes.array.isRequired,
    setInitialSliding: PropTypes.number.isRequired,
    navigate: PropTypes.string.isRequired,
};



// HighlightMurEtudiant
const HighlightMurEtudiant = ({ highlightList }) => (
  <div className="highlightPro">
    <Grid container spacing={2}>
      {highlightList.map((highlight, index) => {
        return (
          <Grid item md={3} key={index}>
            <CardHighlightPro highlight={highlight} />
          </Grid>
        );
      })}
    </Grid>
  </div>
);


HighlightMurEtudiant.propTypes = {
    highlightList: PropTypes.array.isRequired,
};
