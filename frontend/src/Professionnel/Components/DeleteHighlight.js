import React, { useContext, useEffect, useState } from "react";
import "./styles/DeleteHighlight.scss";
import { Button, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import {
  deleteHighlightAction,
  getAllHighLightProfAction,
} from "../../Actions/ActionHighlight";
import {
  GET_MY_HIGHLIGHT,
  GET_MY_HIGHLIGHT_ACTIVE,
} from "../../Reducers/ReducerHighlight";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import PropTypes from "prop-types";

export default function DeleteHighlight({ setOpenDeleteHighlight }) {
  const { getIdPro } = useContext(AppContext);
  const [idHighlight, setIdHighlight] = useState(0);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

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

  const handleClose = () => {
    setOpen(false);
  };

  const allHighlight = async () => {
    return await dispatch(getAllHighLightProfAction(getIdPro));
  };

  const handleDelete = async (id) => {
    await dispatch(deleteHighlightAction(id));
    allHighlight();
    setOpen(false);
  };

  const CardHighlightDeleted = highlight.map((high,index) => {
    const bg = `url(${verificationCloudinaryHighlight(high.file)})`;
    return (
      <Grid key={index} item md={3}>
        <div className="cardHighlightDelete" style={{ background: bg }}>
          <div className="header">
            <div
              className="icon"
              onClick={() => {
                setIdHighlight(high.id);
                setOpen(true);
              }}
            >
              <DeleteForeverIcon
                sx={{ width: "20px", height: "20px", color: "#FFF" }}
              />
            </div>

            <Dialog
              open={open}
              onClose={handleClose}
              BackdropProps={{
                style: {
                  backgroundColor: "rgba(0,0,0,0.02)",
                },
              }}
              PaperProps={{
                style: {
                  boxShadow: "none",
                  borderRadius: "8px",
                },
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Suppression"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Etes-vous sur de vouloir supprimer ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(idHighlight)}
                >
                  Confirmer
                </Button>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                  color="inherit"
                  onClick={handleClose}
                  autoFocus
                >
                  Annuler
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="description">
            <div className="sentence">
              <p>{high.description}</p>
            </div>
          </div>
        </div>
      </Grid>
    );
  });

  return (
    <div className="deleteHighlight">
      <div className="title">
        <Stack direction="column" spacing="12px">
          <p>Supprimer highlight</p>
          <div className="trait"></div>
        </Stack>
      </div>
      <div className="highlights">
        <Grid container spacing="12px">
          {CardHighlightDeleted}
        </Grid>
      </div>
      <div className="footer-close">
        <button onClick={() => setOpenDeleteHighlight(false)}>Fermer</button>
      </div>
    </div>
  );
}


DeleteHighlight.propTypes = {
    setOpenDeleteHighlight: PropTypes.bool.isRequired,
    
  };
  