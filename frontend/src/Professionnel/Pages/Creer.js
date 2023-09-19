import React, { useState } from "react";
import LayoutDashboard from "../Layout/LayoutDashboard";
import "./styles/Creer.scss";
import { Backdrop, Dialog, DialogContent, DialogTitle, Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CreationSerie from "../Components/CreationSerie";
import SelectSerieFocus from "../Components/SelectSerieFocus";

export default function Creer() {

  const [open, setOpen] = useState(false);
  const [createSerie, setCreateSerie] = useState(false);
  const navigate = useNavigate();
  const [openMySérie, setOpenMySérie] = useState(false);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const createCard = (title, titre, texte, init, anime, duration, url) => {
    return (
      <motion.div
        initial={{ translateX: init }}
        animate={{ translateX: anime }}
        transition={{ duration: duration }}
        className={`boxCreate`}
        onClick={() => navigate(url)}
      >
        <div className="titre">
          <p>{title}</p>
        </div>
        <div className="paragraphe">
          <Stack direction="column" spacing={2}>
            <p className="small_title">{titre}</p>
            <p>{texte}</p>
          </Stack>
        </div>
      </motion.div>
    );
  };

  return (
    <LayoutDashboard>
      <motion.div
        initial={{ translateX: "-100px" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        Creer un contenu
      </motion.div>
      <div className="boxs">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            {createCard(
              "Highlight",
              "Créer un highlight",
              lorem,
              "-100px",
              0,
              0.3,
              "/professionnel/creation-highlight/nouveau-contenu/ajout-image"
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div onClick={() => { setOpen(!open); setOpenMySérie(false); }}>
              {createCard(
                "Focus",
                "Créer un focus",
                lorem,
                "100px",
                0,
                0.6,
                ""
              )}
            </div>

            <Dialog
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Choisir une série"}
              </DialogTitle>
              <DialogContent>
                <Stack direction='column' spacing='12px'>
                  <div style={selected} onClick={() => navigate('/professionnel/creation-focus')}>Créer focus libre</div>
                  <div style={selected} onClick={() => { setCreateSerie(!createSerie); setOpen(!open); }}>Créer une série</div>
                  <div style={selected} onClick={() => {setOpenMySérie(true); setOpen(!open);}}>Ajouter dans une série existante</div>
                </Stack>
              </DialogContent>
            </Dialog>
            {createSerie && <CreationSerie setOpen={setCreateSerie} direction="create-focus" />}
              <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openMySérie}
                // onClick={() => setOpenMySérie(false)}
              >
                <SelectSerieFocus setOpenMySérie={setOpenMySérie} setOpen={setOpen} direction="/professionnel/creation-focus" />
              </Backdrop>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: "12px" }}>
          <Grid item xs={12} sm={12} md={12}>
            {createCard(
              "Communauté",
              "Créer une communauté",
              lorem,
              "-100px",
              0,
              0.3,
              `/professionnel/community/creer/`
            )}
          </Grid>
        </Grid>
      </div>
    </LayoutDashboard>
  );
}

const selected = {
  border: '1px solid var(--grey)',
  height: '45px',
  width: '320px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  paddingInline: '12px',
  fontSize: '14px',
  cursor: 'pointer',
};