import React, { useContext, useEffect, useState } from "react";
import "./styles/NbrViewHighlight.scss";
import { Box, Grid, Modal, Stack } from "@mui/material";
import ViewHighlightFinal from "./ViewHighlightFinal";
import {
  listViewHighlight,
  name,
  profil,
} from "./StyleListViewHighlight";
import { AppContext } from "../../Context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MY_HIGHLIGHT,
  GET_MY_HIGHLIGHT_ACTIVE,
} from "../../Reducers/ReducerHighlight";
import { getAllHighLightProfAction } from "../../Actions/ActionHighlight";
import {
  GET_ALL_USERS,
  GET_USER_INFO_CONNECT,
} from "../../Reducers/ReducerUser";
import { getAllUserInfoAction } from "../../Actions/actionAuth";
import { BaseURL, verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import PropTypes from "prop-types";

export default function NbrViewHighlight({ setOpenViewHighlight }) {
  const { getIdPro } = useContext(AppContext);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(false);
  const user = useSelector(GET_USER_INFO_CONNECT);
  const users = useSelector(GET_ALL_USERS);
  const [idHigh, setIdHigh] = useState(0);
  const [nbrView, setNbrView] = useState(0);

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

  // get all users
  useEffect(() => {
    dispatch(getAllUserInfoAction());
  }, []);

  const styleDelete = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60%",
    height: "60vh",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFF",
    borderRadius: "12px",
    border: "1px solid #FFF",
    boxShadow: "none",
    p: 5,
  };

  const ShowDetail = (id) => {
    const highlightId = highlight.filter((item) => item.id === id);

    const listUserView = highlightId[0].view.map((items, index) => {
      const getter = users.filter((item) => item.id === items);
      return (
        <Stack
          key={index}
          direction="row"
          spacing="12px"
          style={listViewHighlight}
        >
          <div className="profil" style={profil}>
            <img
              src={`${BaseURL}${getter[0].image_url}`}
              alt="steedy_profil"
              width="100%"
              height="100%"
            />
          </div>
          <div className="name" style={name}>
            <p>
              {items === user.id
                ? "Moi"
                : getter[0].first_name + " " + getter[0].last_name}
            </p>
          </div>
        </Stack>
      );
    });

    return (
      <Grid container spacing="12px" style={{ height: "100%" }}>
        <Grid item md={4} style={{ height: "100%" }}>
          {highlightId[0].description !== undefined && (
            <ViewHighlightFinal text={highlightId[0].description} height="100%">
              <div className="img">
                <img
                  src={verificationCloudinaryHighlight(highlightId[0].file)}
                  alt="steedy"
                />
              </div>
            </ViewHighlightFinal>
          )}
        </Grid>
        <Grid item md={8} style={{ height: "100%" }}>
          <p style={{ fontSize: "17px", fontWeight: "600" }}>
            Vues par {nbrView}
          </p>
          <Stack direction="column" spacing="8px" style={{ padding: "10px 0" }}>
            {listUserView}
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const CardHighlightViews = highlight.map((highlight,index) => {
    const bg = `url(${verificationCloudinaryHighlight(highlight.file)})`;
    return (
      <Grid key={index} item md={3}>
        <div className="cardHighlightViews" style={{ background: bg }}>
          <div className="description">
            <div className="sentence">
              <Stack
                direction="row"
                spacing="12px"
                style={{
                  minHeight: "100px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "600",
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  {highlight.view.length}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  vue{highlight.view.length > 1 && "s"}
                </p>
              </Stack>
            </div>
          </div>
          <div className="viewAll">
            <button
              onClick={() => {
                setIdHigh(highlight.id);
                setNbrView(highlight.view.length);
                setDetail(!detail);
              }}
            >
              Voir details
            </button>

            {/* Modal view detail */}
            <Modal
              open={detail}
              onClose={() => setDetail(!detail)}
              BackdropProps={{
                style: {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleDelete}>{idHigh !== 0 && ShowDetail(idHigh)}</Box>
            </Modal>
          </div>
        </div>
      </Grid>
    );
  });

  return (
    <div className="nbrViewHighlight">
      <div className="title">
        <Stack direction="column" spacing="12px">
          <p>Nombre de vue de chaque highlight</p>
          <div className="trait"></div>
        </Stack>
      </div>

      <div className="highlights">
        <Grid container spacing="12px">
          {CardHighlightViews}
        </Grid>
      </div>
      <div className="footer-close">
        <button onClick={() => setOpenViewHighlight(false)}>Fermer</button>
      </div>
    </div>
  );
}

NbrViewHighlight.propTypes = {
    setOpenViewHighlight: PropTypes.bool.isRequired,
   
  };