import React, { useContext, useEffect, useState } from "react";
import LayoutDashboard from "../Layout/LayoutDashboard";
import "./styles/Dashboard.scss";
import { Box, Grid, Modal, Stack } from "@mui/material";
import CardCount from "../Components/CardCount";
import cover from "../../Images/coverDash.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MY_HIGHLIGHT,
  GET_MY_HIGHLIGHT_ACTIVE,
} from "../../Reducers/ReducerHighlight";
import SkeletonHighlightSlide from "../../Global/Components/SkeletonHighlightSlide";
import { GET_MY_FOCUS_ACTIVE, GET_MY_FOCUS } from "../../Reducers/ReducerFocus";
import { getAllHighLightProfAction } from "../../Actions/ActionHighlight";
import { verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import SwiperHighlightDash from "../Components/SwiperHighlightDash";
import { getAllFocusProfAction } from "../../Actions/ActionFocus";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { get_my_ntotification } from "../../Actions/ActionNotificate";
import { GET_NOTIFICATE_ACTIVE } from "../../Reducers/ReducerNotification";

export default function Dashboard() {
  // highlight
  const highligh_active = useSelector(GET_MY_HIGHLIGHT_ACTIVE);
  const highlight = useSelector(GET_MY_HIGHLIGHT);

  // focus
  const focus_list_active = useSelector(GET_MY_FOCUS_ACTIVE);
  const focus_list = useSelector(GET_MY_FOCUS);

  // user get
  const user = useSelector(GET_USER_INFO_CONNECT);
  // noti
  const active_notificate = useSelector(GET_NOTIFICATE_ACTIVE);
  const { Uuid } = useContext(AppContext);

  // state
  const [openHighlight, setOpenHighlight] = useState(false);
  const [indexHigh, setIndexHigh] = useState(0);
  const [viewer, setViewer] = useState(false);
  const { getIdPro } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // notification fetch
  useEffect(() => {
    if (Uuid && active_notificate === false) {
      dispatch(get_my_ntotification(Uuid));
    }
  }, [dispatch, Uuid]);


  // get all highlight of prof
  useEffect(() => {
    if (getIdPro !== null) {
      if (highligh_active === false) {
        dispatch(getAllHighLightProfAction(getIdPro));
      }
    }
  }, [dispatch, getIdPro, highligh_active]);

  // get all focus of prof
  useEffect(() => {
    if (getIdPro !== null) {
      if (focus_list_active === false) {
        dispatch(getAllFocusProfAction(getIdPro));
      }
    }
  }, [dispatch, getIdPro, focus_list_active]);



  // HightLightPub
  const HightLightPub = ({ highlight }) => (
    <div className="highlightPub">
      <div className="highlightPubContent" style={{ border: '1px solid var(--grey)', borderRadius: '12px', overflow: 'hidden', padding: '5px' }}>
        {highlight.length > 0 ? (
          <>
            <Stack className="SlideItems" direction="row" spacing="12px">
              {highlight.slice(-3).map((high, index) => {
                return (
                  <div
                    key={index}
                    className="swiperItem"
                    onClick={() => {
                      setIndexHigh(index);
                      setViewer(false);
                    }}
                  >
                    <Stack
                      direction="column"
                      spacing="8px"
                      onClick={() => setOpenHighlight(!openHighlight)}
                    >
                      {
                        <img
                          src={`${verificationCloudinaryHighlight(high.file)}`}
                          className="imgHihglight"
                          alt="story"
                          width="100%"
                          height="100%"
                        />
                      }
                    </Stack>
                  </div>
                );
              })}
            </Stack>
            <div className="all" onClick={() => {setOpenHighlight(!openHighlight); setViewer(true);}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M7.125 4.5L11.625 9L7.125 13.5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </>
        ) : (
          <SkeletonHighlightSlide />
        )}
      </div>
    </div>
  );

  HightLightPub.propTypes = {
    highlight: PropTypes.array.isRequired,
  };

  return (
    <LayoutDashboard>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="headBlock"
      >
        <div className="paragraphe">
          <div className="title">
            <p>{user.domain && user.domain}</p>
          </div>
          <div className="texte">
            <p>
              {
                user.bio && user.bio
              }
            </p>
          </div>
          <div className="btn">
            <button
              onClick={() =>
                navigate(
                  "/professionnel/creation-focus/nouveau-contenu/ajout-audio"
                )
              }
            >
              Créer un focus
            </button>
          </div>
        </div>

        <div className="image">
          <div className="img">
            <img src={cover} alt="..." />
          </div>
        </div>
      </motion.div>

      <div className="cardStats">
        <Grid container spacing="20px">
          <Grid item md={6} sm={12} xs={12}>
            <CardCount title="Highlight" number={highlight?.length}>
              {/* HightLight */}
              <HightLightPub highlight={highlight} navigate={""} />
            </CardCount>
            <Modal
              open={openHighlight}
              onClose={() => setOpenHighlight(!openHighlight)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleDelete}>
                <SwiperHighlightDash
                  highlightPub={highlight}
                  initial={indexHigh}
                  viewer={viewer}
                  setOpenHighlight={setOpenHighlight}
                />
              </Box>
            </Modal>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <CardCount title="Focus" number={focus_list?.length} />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <CardCount title="Communauté" number="4" />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <CardCount title="Tags" number={user?.categories?.length} />
          </Grid>
        </Grid>
      </div>
    </LayoutDashboard>
  );
}

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80%",
  height: "80vh",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  borderRadius: "12px",
  outline: "none",
  border: "1px solid #FFF",
  boxShadow: 24,
  p: 2,
};
