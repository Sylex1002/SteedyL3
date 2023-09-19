import React, { useContext, useEffect, useState } from "react";
import "./styles/AddContentHighlight.scss";
import {
  Alert,
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Snackbar,
  Stack,
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

// Icons
import { UploadImageHighlight } from "../Components/UploadImageHighlight";
import { useMatch, useNavigate } from "react-router-dom";

// Stepper
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";

import { addHighlightAction } from "../../Actions/ActionHighlight";
import {
  GET_ALL_CATEGORY_ACTIVE,
  GET_ALL_CATEGORY_LIST,
} from "../../Reducers/ReducerCategory";
import {
  GET_USER_ACTIVE,
  GET_USER_INFO_CONNECT,
} from "../../Reducers/ReducerUser";
import { getUserInfoByTokenAction } from "../../Actions/actionAuth";
import { getAllCategoryAction } from "../../Actions/ActionCategory";
import { GET_ONE_PROF } from "../../Reducers/ReduceProfesssionnel";
import ViewHighlightFinal from "../Components/ViewHighlightFinal";
import AddTextHighlight from "../Components/AddTextHighlight";
import { getProfIdAction } from "../../Actions/ActionProf";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import { useCookies } from "react-cookie";

const steps = [
  "Ajouter une image",
  "Ajouter text",
  "Ajouter category",
  "Voir le resultat",
];

export default function AddContentHighlight() {
  // Capturer l'URL
  const match = useMatch(
    "/professionnel/creation-highlight/nouveau-contenu/:element"
  );
  const menuUrl = match?.params?.element;
  // Context pour ajouter id Pro et information de l'user connecter
  const { setGetIdPro, setUuid } = useContext(AppContext);
  const [cookies] = useCookies(["access_token"]);
  const user_active = useSelector(GET_USER_ACTIVE);
  const [image, setImage] = useState([]);
  const [text, setText] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [state, setState] = useState(false);
  const [addSucces, setAddSuccess] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  // Stepper Function
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const user = useSelector(GET_USER_INFO_CONNECT);
  const profId = useSelector(GET_ONE_PROF);
  const [letterSearch, setLetterSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // About notification
  const [idCateg, setIdCateg] = useState(null);

  // category
  const categoryList_active = useSelector(GET_ALL_CATEGORY_ACTIVE);
  const category = useSelector(GET_ALL_CATEGORY_LIST);
  const categoryList = category.filter((item) =>
    item.name.toLowerCase().includes(letterSearch.toLowerCase())
  );

  // get all category
  useEffect(() => {
    if (user_active) {
      if (categoryList_active === false) {
        dispatch(getAllCategoryAction());
      }
    }
  }, [dispatch, user_active, categoryList_active]);

  // Fonction pour la compression image
  useEffect(() => {
    return () => {
      image.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [image]);

  const thumbs = image.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          onLoad={() => URL.revokeObjectURL(file.preview)}
          alt="steedy"
        />
      </div>
    </div>
  ));

  // Recuperer user connecter
  useEffect(() => {
    const getId = async () => {
      if (user_active === false) {
        if (cookies.access_token) {
          const res = await dispatch(
            getUserInfoByTokenAction({ token: cookies.access_token })
          );
          if (res.data.id) {
            setUuid(res.data.id);
          }
          if (res.data.fonction === "Professionnel") {
            const id_profes = await dispatch(getProfIdAction(res.data.id));
            if (id_profes) {
              setGetIdPro(id_profes.id);
            }
          }
        }
      }
    };
    getId();
  }, [cookies.access_token, dispatch, setGetIdPro, setUuid, user_active]);

  // Recuperer information du professionnel
  useEffect(() => {
    dispatch(getProfIdAction(user.id));
  }, [dispatch, user.id]);

  // Les fonctions concernant le stepper
  useEffect(() => {
    const stepPoint = () => {
      if (menuUrl === "ajout-image") {
        setActiveStep(0);
      } else if (menuUrl === "ajout-texte") {
        setActiveStep(1);
      } else if (menuUrl === "ajout-category") {
        setActiveStep(2);
      } else if (menuUrl === "voir-resultat") {
        setActiveStep(3);
      }
    };
    if (image.length === 0) {
      setActiveStep(0);
      navigate("/professionnel/creation-highlight/nouveau-contenu/ajout-image");
    }

    stepPoint();
  }, [navigate, activeStep, image.length, menuUrl]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    navigate(-1);
  };

  // Box pour ajouter la category
  const AddCategory = () => {
    return (
      <div className="add-category">
        <div className="box-category">
          <div className="title">
            <Stack
              direction="row"
              spacing="12px"
              style={{ height: "35px", display: "flex", alignItems: "center" }}
            >
              <CategoryIcon sx={{ width: "20px", height: "20px" }} />
              <p>Selectionner une categorie</p>
            </Stack>
          </div>
          <div className="box-search">
            <div className="content-search">
              <div className="icon-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="16"
                  viewBox="0 0 21 22"
                  fill="none"
                >
                  <path
                    d="M20.7495 20.1895L15.0855 14.5255C16.4466 12.8915 17.1253 10.7957 16.9805 8.67395C16.8356 6.55225 15.8784 4.56807 14.3079 3.13416C12.7374 1.70026 10.6745 0.927031 8.54844 0.97534C6.42236 1.02365 4.39674 1.88977 2.89298 3.39353C1.38922 4.89729 0.5231 6.92291 0.474791 9.04899C0.426482 11.1751 1.19971 13.2379 2.63361 14.8085C4.06752 16.379 6.0517 17.3362 8.1734 17.481C10.2951 17.6259 12.391 16.9471 14.025 15.586L19.689 21.25L20.7495 20.1895ZM1.99948 9.25003C1.99948 7.915 2.39536 6.60996 3.13706 5.49993C3.87876 4.38989 4.93296 3.52473 6.16636 3.01384C7.39976 2.50295 8.75696 2.36927 10.0663 2.62973C11.3757 2.89018 12.5784 3.53305 13.5224 4.47706C14.4665 5.42106 15.1093 6.62379 15.3698 7.93317C15.6302 9.24254 15.4966 10.5997 14.9857 11.8331C14.4748 13.0665 13.6096 14.1207 12.4996 14.8624C11.3895 15.6041 10.0845 16 8.74948 16C6.95987 15.998 5.24414 15.2862 3.9787 14.0208C2.71326 12.7554 2.00146 11.0396 1.99948 9.25003Z"
                    fill="#AFAFAF"
                  />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Rechercher"
                onChange={(e) => setLetterSearch(e.target.value)}
                value={letterSearch}
              />
            </div>
          </div>
          <div className="list-category">
            <Grid container direction="column" spacing="12px">
              {categoryList.map((categ, index) => {
                return (
                  <Grid key={index} item md={12}>
                    <FormControlLabel
                      
                      control={
                        <Checkbox
                          style={{ color: "var(--bg)" }}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          checked={idCateg === categ.id ? true : false}
                        />
                      }
                      style={{ fontFamily: "var(--font)" }}
                      label={categ.name}
                      className="the-category"
                      onChange={() => setIdCateg(categ.id)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour la creation de highlight
  const addHighlight = async (e) => {
    e.preventDefault();

    if (image[0] !== undefined) {
      setOpenBackdrop(true);
      try {
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("id_pro", String(profId.id));
        formData.append("id_category", idCateg);
        formData.append("description", text);

        const res = await dispatch(addHighlightAction(formData));

        if (res.status === 200) {
          setOpenBackdrop(false);
          setAddSuccess(true);
          // return to creer
          navigate("/professionnel/creer");
        }
      } catch (error) {
        setTimeout(() => {
          setOpenBackdrop(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="addContentHighlight">
      <div className="head-drop">
        {activeStep !== steps.length && (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ fontFamily: "var(--font)", textTransform: "capitalize" }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        )}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                key={label}
                {...stepProps}
                sx={{ ml: 12, paddingInline: "24px" }}
              >
                <StepLabel {...labelProps}>
                  <p style={{ fontSize: "14px" }}>{label}</p>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Stack direction="row" spacing={2}>
          {menuUrl === "ajout-image" && (
            <div
              onClick={() =>
                image.length !== 0
                  ? navigate(
                      "/professionnel/creation-highlight/nouveau-contenu/ajout-texte"
                    )
                  : null
              }
            >
              <button
                className="terminer"
                style={
                  image.length === 0
                    ? {
                        background: "var(--bg1)",
                        border: "1px solid var(--bg1)",
                        cursor: "not-allowed",
                      }
                    : null
                }
                onClick={image.length !== 0 ? handleNext : null}
              >
                {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </button>
            </div>
          )}
          {menuUrl === "ajout-texte" && (
            <div
              onClick={() =>
                navigate(
                  "/professionnel/creation-highlight/nouveau-contenu/ajout-category"
                )
              }
            >
              <button className="terminer" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </button>
            </div>
          )}
          {menuUrl === "ajout-category" && (
            <div
              onClick={() =>
                navigate(
                  "/professionnel/creation-highlight/nouveau-contenu/voir-resultat"
                )
              }
            >
              {idCateg !== null && (
                <button className="terminer" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
                </button>
              )}
            </div>
          )}
          {menuUrl === "voir-resultat" && (
            <div onClick={addHighlight}>
              <button className="terminer" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </button>
            </div>
          )}
          <button className="cancel" onClick={() => setOpen(true)}>
            Annuler
          </button>
        </Stack>
      </div>
      {/* Dialog Confirmation */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={fullScreen}
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title" style={{ paddingIn: "12px 24px" }}>
          Creation highlight
        </DialogTitle>
        <DialogContent style={{ paddingIn: "12px 24px" }}>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous continuer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ paddingIn: "12px 24px" }}>
          <button style={btnContinue} onClick={() => setOpen(false)}>
            Continuer
          </button>
          <button
            style={btnQuit}
            onClick={() => navigate("/professionnel/creer")}
          >
            Quitter
          </button>
        </DialogActions>
      </Dialog>

      {/* Upload Image */}
      <div
        className="uploadImage"
        style={
          menuUrl !== "ajout-image" ? { display: "none" } : { display: "block" }
        }
      >
        <UploadImageHighlight setImage={setImage} image={image}>
          {thumbs}
        </UploadImageHighlight>
      </div>

      {/* Add Text */}
      <div
        className="addText"
        style={
          menuUrl !== "ajout-texte" ? { display: "none" } : { display: "block" }
        }
      >
        <AddTextHighlight setText={setText} />
      </div>

      {/* Add category */}
      <div
        className="addCategory"
        style={
          menuUrl !== "ajout-category"
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <AddCategory />
      </div>

      {/* Voir resultat */}
      <div
        className="addText"
        style={
          menuUrl !== "voir-resultat"
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <ViewHighlightFinal text={text}>
          <div className="img">{thumbs}</div>
        </ViewHighlightFinal>
      </div>

      {/* After success */}
      <Backdrop
        sx={{
          color: "#fff",
          background: `${addSucces ? "rgba(29, 209, 161,0.8)" : null}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
      >
        {!addSucces ? (
          <CircularProgress color="inherit" />
        ) : (
          <h2>Highlight ajouter avec succès !</h2>
        )}
      </Backdrop>

      <Snackbar
        open={state}
        onClose={() => setState(false)}
        autoHideDuration={4000}
        sx={{ zIndex: "999 !important" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Highlight ajouter avec succès !
        </Alert>
      </Snackbar>
    </div>
  );
}

const btnQuit = {
  background: "none",
  border: "1px solid transparent",
  padding: "8px 24px",
  borderRadius: "8px",
  color: "#000",
  cursor: "pointer",
};

const btnContinue = {
  background: "var(--bg)",
  border: "1px solid var(--bg)",
  padding: "8px 24px",
  borderRadius: "8px",
  color: "#FFF",
  cursor: "pointer",
};
