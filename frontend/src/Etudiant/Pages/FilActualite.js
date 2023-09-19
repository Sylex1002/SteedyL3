import React, { useEffect, useContext, useState } from "react";
import SideBarRight from "../components/SideBarRight";
import LayoutEtudiant from "../Layout/LayoutEtudiant";
import SlideItems from "../components/SwiperHighlight";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import CardFocus from "../components/CardFocus";
import SlideItemsFocus from "../components/SwiperFocus";
import CardAllProfessionnel from "../components/CardAllProfessionnel";
import { GET_HIGHLIGHT_UNVIEWED } from "../../Reducers/ReducerHighlight";
import {
  getUnFollowSameCategoryProfAction,
  getProfPopulaireAction,
} from "../../Actions/ActionProf";
import SkeletonHighlightSlide from "../../Global/Components/SkeletonHighlightSlide";
import SkeletonCreateurSlide from "../../Global/Components/SkeletonCreateurSlide";
import { getAllHighLightUnViewedfAction } from "../../Actions/ActionHighlight";
import { verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { useMatch, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import {
  GET_POPULAIRE_PROF_LIST,
  GET_SAMACATEGORY_PROF_LIST,
  GET_SAMECATEGORY_PROF_LIST_ACTIVE,
} from "../../Reducers/ReduceProfesssionnel";
import {
  get_focus_search,
  getFocusPopulaireAction,
  get_focuses_recomande_Action,
  getFocusPopulaireByCategorie,
  get_followed_prof_focusesAction,
} from "../../Actions/ActionFocus";
import {
  GET_FOCUS_RECOMMANDER,
  GET_FOCUS_FOLLOW_PROF,
  GET_FOCUS_POPULAIRE,
  GET_FOCUS_SMILAIRE_CATEGORY,
  GET_FOCUS_FOLLOW_PROF_ACTIVE,
  GET_FOCUS_RECOMMANDER_ACTIVE,
  GET_FOCUS_POPULAIRE_ACTIVE,
  GET_FOCUS_SMILAIRE_CATEGORY_ACTIVE,
} from "../../Reducers/ReducerFocus";
import "./style/filActualite.scss";
import PropTypes from "prop-types";
import { get_my_notification_msg_action, get_my_ntotification } from "../../Actions/ActionNotificate";
import { GET_NOTIFICATE_ACTIVE, GET_NOTIFICATE_MSG_ACTIVE } from "../../Reducers/ReducerNotification";

// Filiactialite
export default function FilActualite() {
  const { searchInput } = useContext(AppContext);
  // professionnel Data
  const prof_recommande = useSelector(GET_SAMACATEGORY_PROF_LIST).filter(
    (item) =>
      item.user.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.user.last_name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const prof_populaire = useSelector(GET_POPULAIRE_PROF_LIST).filter(
    (item) =>
      item.user.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.user.last_name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const prof_recommande_ACTIVE = useSelector(GET_SAMECATEGORY_PROF_LIST_ACTIVE);

  // focus
  const focus_follow = useSelector(GET_FOCUS_FOLLOW_PROF).filter((item) =>
    item.titre.toLowerCase().includes(searchInput.toLowerCase())
  );
  const focus_recomander = useSelector(GET_FOCUS_RECOMMANDER).filter((item) => {
    return item.titre.toLowerCase().includes(searchInput.toLowerCase());
  });
  const focus_populaire = useSelector(GET_FOCUS_POPULAIRE).filter((item) => {
    return item.titre.toLowerCase().includes(searchInput.toLowerCase());
  });
  const focus_smilaire = useSelector(GET_FOCUS_SMILAIRE_CATEGORY).filter(
    (item) => {
      return item.titre.toLowerCase().includes(searchInput.toLowerCase());
    }
  );

  // ACTIVE
  const focus_follow_active = useSelector(GET_FOCUS_FOLLOW_PROF_ACTIVE);
  const focus_populaire_active = useSelector(GET_FOCUS_POPULAIRE_ACTIVE);
  const focus_recomander_active = useSelector(GET_FOCUS_RECOMMANDER_ACTIVE);
  const focus_smilaire_active = useSelector(GET_FOCUS_SMILAIRE_CATEGORY_ACTIVE);

  // highlight
  const highlight_unviewed = useSelector(GET_HIGHLIGHT_UNVIEWED);

  // notification
  const active_notificate = useSelector(GET_NOTIFICATE_ACTIVE);
  const active_notificate_msg = useSelector(GET_NOTIFICATE_MSG_ACTIVE);

  //    alll
  const { Uuid } = useContext(AppContext);
  const user = useSelector(GET_USER_INFO_CONNECT);
  const [focusDataSearch, setFocusDataSearch] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setInitialSliding } = useContext(AppContext);
  const match = useMatch("/:fonction/:menu/");
  const menuUrl = match?.params?.fonction;

  // notification fetch message
  useEffect(() => {
    if (Uuid && active_notificate_msg === false) {
      dispatch(get_my_notification_msg_action(Uuid));
    }
  }, [dispatch, Uuid,active_notificate_msg]);

  // notification fetch
  useEffect(() => {
    if (Uuid && active_notificate === false) {
      dispatch(get_my_ntotification(Uuid));
    }
  }, [dispatch, Uuid]);

  // getUnFollowSameCategoryProfAction
  useEffect(() => {
    if (Uuid !== null) {
      if (prof_recommande_ACTIVE === false) {
        // get UnFollowSame Category ProfAction
        dispatch(getUnFollowSameCategoryProfAction(Uuid));
        dispatch(getProfPopulaireAction());
      }
    }
  }, [dispatch, Uuid, prof_recommande_ACTIVE]);

  // recommande
  useEffect(() => {
    if (Uuid !== null) {
      if (focus_recomander_active === false) {
        // get focus prof recomande
        dispatch(get_focuses_recomande_Action(Uuid));
      }
    }
  }, [dispatch, Uuid, focus_recomander_active]);

  // Populaire Action
  useEffect(() => {
    if (focus_populaire_active === false) {
      // get Focus PopulaireAction
      dispatch(getFocusPopulaireAction());
    }
  }, [dispatch, focus_populaire_active]);

  // PopulaireAction
  useEffect(() => {
    if (Uuid !== null) {
      if (focus_smilaire_active === false) {
        // populaire by category
        dispatch(getFocusPopulaireByCategorie(Uuid));
      }
    }
  }, [dispatch, Uuid, focus_smilaire_active]);

  // get followed prof focuses
  useEffect(() => {
    if (Uuid !== null) {
      if (focus_follow_active === false) {
        // get followed prof focuses
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

  const viewHighlight = async (highlightId) => {
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("highlight_id", highlightId);
    // await dispatch(viewHighlightAction(formData))
  };

  const redirectionHighlight = () => {
    if (menuUrl === "etudiant") {
      return "etudiant";
    } else if (menuUrl === "professionnel") {
      return "professionnel";
    }
  };

  // FilActualite Focus
  const FilActualiteFocus = ({ focus, title }) => (
    <div className="FilActualiteFocus">
      <div className="title">
        <p className="FilActualite_title">{title}</p>
      </div>
      <div className="FocusContent" style={{ marginTop: "15px" }}>
        {focus[0] !== undefined ? (
          <SlideItemsFocus>
            {focus.map((focus, index) => (
              <SwiperSlide key={index}>
                <CardFocus focus={focus} key={index} maximWidth={"285px"} />
              </SwiperSlide>
            ))}
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
          </SlideItemsFocus>
        ) : (
          <SlideItemsFocus>
            <SwiperSlide>
              <Skeleton variant="rounded" width={250} height={310} />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton variant="rounded" width={250} height={310} />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton variant="rounded" width={250} height={310} />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton variant="rounded" width={250} height={310} />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton variant="rounded" width={250} height={310} />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton variant="rounded" width={250} height={310} />
            </SwiperSlide>
          </SlideItemsFocus>
        )}
      </div>
    </div>
  );

  FilActualiteFocus.propTypes = {
    focus: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  };

  // highlight fild'actialite
  const FilActualiteHightLight = ({
    highlightList,
    setInitialSliding,
    fonction,
    navigate,
    view,
  }) => (
    <div className="FilActualite_highlight">
      <div className="highlightContent">
        {highlightList[0] !== undefined ? (
          <SlideItems className="SlideItemsActualite">
            {highlightList.map((high, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="swiperItem"
                  onClick={() => {
                    setInitialSliding(index);
                    navigate(`/${fonction}/Highlights/${high.id}`);
                  }}
                >
                  <Stack
                    direction="column"
                    spacing="8px"
                    onClick={() => view(high.id)}
                  >
                    {
                      <img
                        src={verificationCloudinaryHighlight(high.file)}
                        className="imgHihglight"
                        alt="story"
                        width="100%"
                        height="100%"
                      />
                    }
                    {high.professionnel && (
                      <p>{high.professionnel.user.first_name.slice(0, 7)}</p>
                    )}
                  </Stack>
                </SwiperSlide>
              );
            })}
          </SlideItems>
        ) : (
          <SkeletonHighlightSlide />
        )}
      </div>
    </div>
  );

  FilActualiteHightLight.propTypes = {
    highlightList: PropTypes.array.isRequired,
    setInitialSliding: PropTypes.func.isRequired,
    fonction: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
  };

  // FilActualite Createurs
  const FilActualiteCreateur = ({ title, profData }) => (
    <div className="proRec">
      <div className="title">
        <p className="FilActualite_title">{title}</p>
      </div>
      <div className="ProContent" style={{ marginTop: "15px" }}>
        {profData[0] !== undefined ? (
          <SlideItemsFocus>
            {profData.map((pro, index) => (
              <SwiperSlide key={index}>
                <CardAllProfessionnel duree={index} pro={pro} />
              </SwiperSlide>
            ))}
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
          </SlideItemsFocus>
        ) : (
          <SlideItemsFocus>
            <SwiperSlide>
              <SkeletonCreateurSlide />
              <SkeletonCreateurSlide />
              <SkeletonCreateurSlide />
              <SkeletonCreateurSlide />
              <SkeletonCreateurSlide />
            </SwiperSlide>
          </SlideItemsFocus>
        )}
      </div>
    </div>
  );

  FilActualiteCreateur.propTypes = {
    profData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  };

  // focus list search
  const FocusSearchPage = ({ focusDataSearch }) => (
    <div className="FocusSearchPage">
      {focusDataSearch.map((focus, index) => (
        <CardFocus key={index} focus={focus} />
      ))}
    </div>
  );

  FocusSearchPage.propTypes = {
    focusDataSearch: PropTypes.array.isRequired,
  };

  const handleSearch = async () => {
    await dispatch(get_focus_search(searchInput)).then((res) => {
      setFocusDataSearch(res.data);
    });
  };

  return (
    <LayoutEtudiant showSearch={true} handleSearch={handleSearch}>
      <div id="FilActualite">
        <div
          className="FilActualite_content"
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {/* HightLight */}
          <FilActualiteHightLight
            highlightList={highlight_unviewed}
            setInitialSliding={setInitialSliding}
            fonction={redirectionHighlight()}
            view={viewHighlight}
            navigate={navigate}
          />
          {focusDataSearch.length > 0 ? (
            <>
              <FocusSearchPage focusDataSearch={focusDataSearch} />
            </>
          ) : (
            <>
              {/* focus les plus populaire */}
              <FilActualiteFocus
                title="Les plus populaire"
                focus={focus_populaire}
              />
              {/* focus */}
              <FilActualiteFocus title="Focus" focus={focus_follow} />
              {/* Recommandation createur */}
              {prof_recommande[0] !== undefined && (
                <FilActualiteCreateur
                  title={"Recommandation créateurs"}
                  profData={prof_recommande}
                />
              )}
              {/* focus similaire */}
              {focus_smilaire[0] !== undefined && (
                <FilActualiteFocus
                  title="Focus similaire"
                  focus={focus_smilaire}
                />
              )}
              {/* focus Recomandations du jours */}
              {focus_recomander[0] !== undefined && (
                <FilActualiteFocus
                  title="Recomandations du jours"
                  focus={focus_recomander}
                />
              )}
              {/* populaire createur */}
              {prof_populaire[0] !== undefined && (
                <FilActualiteCreateur
                  title={"Créateurs Populaires"}
                  profData={prof_populaire}
                />
              )}
            </>
          )}
        </div>
        <div className="sideBar">
          <SideBarRight />
        </div>
      </div>
    </LayoutEtudiant>
  );
}
