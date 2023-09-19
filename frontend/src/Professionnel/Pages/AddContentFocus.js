import React, { useContext, useEffect, useState } from "react";
import "./styles/AddContentFocus.scss";
import { useMatch, useNavigate } from "react-router-dom";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

// Stepper
import Button from "@mui/material/Button";
import CategoryIcon from "@mui/icons-material/Category";

import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER_ACTIVE,
  GET_USER_INFO_CONNECT,
} from "../../Reducers/ReducerUser";
import { GET_ONE_PROF } from "../../Reducers/ReduceProfesssionnel";
import { UploadImageHighlight } from "../Components/UploadImageHighlight";
import AddDescriptionFocus from "../Components/AddDescriptionFocus";
import { UploadAudioFocus } from "../Components/UploadAudioFocus";
import { createFocusAction } from "../../Actions/ActionFocus";
import { getProfIdAction } from "../../Actions/ActionProf";
import ViewFocusFinal from "../Components/ViewFocusFinal";
import { getAllCategoryAction } from "../../Actions/ActionCategory";
import {
  GET_ALL_CATEGORY_ACTIVE,
  GET_ALL_CATEGORY_LIST,
} from "../../Reducers/ReducerCategory";
import { AppContext } from "../../Context/AppContext";
import CreationSerie from "../Components/CreationSerie";
import SelectSerieFocus from "../Components/SelectSerieFocus";
import { addFocusOnSerieAction } from "../../Actions/ActionSerieFocus";
import { PUSH_MY_FOCUS_REDUCER } from "../../Reducers/ReducerFocus";

const steps = [
  "Ajouter son",
  "Ajouter une photo",
  "Ajouter titre & description",
  "Ajouter category",
  "Voir le resultat",
];

export default function AddContentFocus() {
  const match = useMatch(
    "/professionnel/creation-focus/nouveau-contenu/:element"
  );
  const menuUrl = match?.params?.element;
  const user = useSelector(GET_USER_INFO_CONNECT);
  const profId = useSelector(GET_ONE_PROF);

  // Context
  const { serieFocus, setSerieFocus } = useContext(AppContext);

  // States about serie
  const [createSerie, setCreateSerie] = useState(false);
  const [openMySérie, setOpenMySérie] = useState(false);
  const [openSerie, setOpenSerie] = useState(false);

  useEffect(() => {
    if (serieFocus === "") {
      setOpenSerie(true);
      if (openMySérie || createSerie) {
        setOpenSerie(false);
      }
    } else {
      setOpenSerie(false);
      setCreateSerie(false);
      setOpenMySérie(false);
    }
  }, [openMySérie, createSerie, serieFocus]);

  const [image, setImage] = useState([]);
  const [audio, setAudio] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [addSucces, setAddSuccess] = useState(false);
  const [state, setState] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  // Stepper Function
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [idCateg, setIdCateg] = useState(null);
  const [letterSearch, setLetterSearch] = useState("");

  // category
  const user_active = useSelector(GET_USER_ACTIVE);
  const categoryList_active = useSelector(GET_ALL_CATEGORY_ACTIVE);
  const category = useSelector(GET_ALL_CATEGORY_LIST);
  const categoryList = category.filter((item) =>
    item.name.toLowerCase().includes(letterSearch.toLowerCase())
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get all category
  useEffect(() => {
    if (user_active) {
      if (categoryList_active === false) {
        dispatch(getAllCategoryAction());
      }
    }
  }, [dispatch, user_active, categoryList_active]);

  useEffect(() => {
    dispatch(getProfIdAction(user.id));
  }, [dispatch]);

  const stepPoint = () => {
    if (menuUrl === "ajout-audio") {
      setActiveStep(0);
    } else if (menuUrl === "ajout-photo") {
      setActiveStep(1);
    } else if (menuUrl === "ajout-titre-et-description") {
      setActiveStep(2);
    } else if (menuUrl === "add-category") {
      setActiveStep(3);
    } else if (menuUrl === "voir-resultat") {
      setActiveStep(4);
    }
  };

  useEffect(() => {
    if (audio === "") {
      setActiveStep(0);
      navigate("/professionnel/creation-focus/nouveau-contenu/ajout-audio");
    }
    stepPoint();
  }, [navigate, activeStep]);

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

  const thumbs = image.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
    </div>
  ));

  const addFocus = async (e) => {
    e.preventDefault();
    if (image[0] !== undefined) {
      setOpenBackdrop(true);
      try {
        const formData = new FormData();
        formData.append("prof_id", profId.id);
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("bg", image[0]);
        formData.append("audio", audio);
        formData.append("categorie", idCateg);

        const res = await dispatch(createFocusAction(formData));
        if (res.status === 200) {
          // form data of serie
          const formdata = {
            serie_id: serieFocus,
            focus_id: res.data.id,
          };
          await dispatch(addFocusOnSerieAction(formdata));
          await dispatch(PUSH_MY_FOCUS_REDUCER(res.data));
          setAddSuccess(true);
          setOpenBackdrop(false);
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

  const NextText = () => {
    if (titre !== "") {
      if (description !== "") {
        return handleNext;
      }
    }
  };

  const NavigateText = () => {
    if (titre !== "") {
      if (description !== "") {
        return navigate(
          "/professionnel/creation-focus/nouveau-contenu/add-category"
        );
      }
    }
  };

  return (
    <div className="addContentFocus">
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
        <div className="stepper-name">
          <p>{steps[activeStep]}</p>
        </div>
        <Stack direction="row" spacing={2}>
          {menuUrl === "ajout-audio" && (
            <div
              onClick={() =>
                audio !== ""
                  ? navigate(
                      "/professionnel/creation-focus/nouveau-contenu/ajout-photo"
                    )
                  : null
              }
            >
              <button
                className="terminer"
                style={
                  audio === ""
                    ? {
                        background: "var(--bg1)",
                        border: "1px solid var(--bg1)",
                        cursor: "not-allowed",
                      }
                    : null
                }
                onClick={audio !== "" ? handleNext : null}
              >
                {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </button>
            </div>
          )}
          {menuUrl === "ajout-photo" && (
            <div
              onClick={() =>
                image.length !== 0
                  ? navigate(
                      "/professionnel/creation-focus/nouveau-contenu/ajout-titre-et-description"
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
          {menuUrl === "ajout-titre-et-description" && (
            // <div onClick={() => image.length !== 0 ? navigate('/professionnel/creation-focus/nouveau-contenu/ajout-titre-et-description') : null}>
            <div onClick={() => NavigateText()}>
              <button
                className="terminer"
                style={
                  titre === ""
                    ? {
                        background: "var(--bg1)",
                        border: "1px solid var(--bg1)",
                        cursor: "not-allowed",
                      }
                    : description === ""
                    ? {
                        background: "var(--bg1)",
                        border: "1px solid var(--bg1)",
                        cursor: "not-allowed",
                      }
                    : null
                }
                onClick={() => NextText()}
              >
                {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </button>
            </div>
          )}
          {/* category */}
          {menuUrl === "add-category" && (
            <div
              onClick={() =>
                image.length !== 0
                  ? navigate(
                      "/professionnel/creation-focus/nouveau-contenu/voir-resultat"
                    )
                  : null
              }
            >
              <button
                className="terminer"
                style={
                  idCateg === null
                    ? {
                        background: "var(--bg1)",
                        border: "1px solid var(--bg1)",
                        cursor: "not-allowed",
                      }
                    : null
                }
              >
                {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </button>
            </div>
          )}
          {menuUrl === "voir-resultat" && (
            <div onClick={addFocus}>
              <button className="terminer">
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
          Creation Focus
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
            onClick={() => {
              navigate("/professionnel/creer");
              setSerieFocus("");
            }}
          >
            Quitter
          </button>
        </DialogActions>
      </Dialog>

      {/* Demander serie si y'a pas dans le context */}
      <Dialog
        open={openSerie}
        onClose={() => setOpen(!openSerie)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Choisir une série"}</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing="12px">
            <div
              style={selected}
              onClick={() => navigate("/professionnel/creation-focus")}
            >
              Créer focus libre
            </div>
            <div
              style={selected}
              onClick={() => {
                setCreateSerie(!createSerie);
                setOpen(!openSerie);
              }}
            >
              Créer une série
            </div>
            <div
              style={selected}
              onClick={() => {
                setOpenMySérie(true);
                setOpen(!openSerie);
              }}
            >
              Ajouter dans une série existante
            </div>
          </Stack>
        </DialogContent>
      </Dialog>

      {createSerie && (
        <CreationSerie setOpen={setCreateSerie} direction="create-focus" />
      )}
      <Backdrop
        sx={{ zIndex: "999 !important" }}
        open={openMySérie}
        // onClick={() => setOpenMySérie(false)}
      >
        <SelectSerieFocus
          setOpenMySérie={setOpenMySérie}
          setOpen={setOpenSerie}
          direction=""
        />
      </Backdrop>

      {/* Upload Audio */}
      <div
        className="uploadImage"
        style={
          menuUrl !== "ajout-audio" ? { display: "none" } : { display: "block" }
        }
      >
        <UploadAudioFocus setAudio={setAudio} audio={audio} />
      </div>

      {/* Upload Photo */}
      <div
        className="uploadImage"
        style={
          menuUrl !== "ajout-photo" ? { display: "none" } : { display: "block" }
        }
      >
        <UploadImageHighlight
          setImage={setImage}
          image={image}
          bg="var(--grey)"
        >
          {thumbs}
        </UploadImageHighlight>
      </div>

      {/* Add Text and Description */}
      <div
        className="uploadImage"
        style={
          menuUrl !== "ajout-titre-et-description"
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <AddDescriptionFocus
          titre={titre}
          setTitre={setTitre}
          description={description}
          setDescription={setDescription}
        />
      </div>

      {/* category */}
      <div
        className="uploadImage addCategory"
        style={
          menuUrl !== "add-category"
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <AddCategory
          categoryList={categoryList}
          idCateg={idCateg}
          setIdCateg={setIdCateg}
          letterSearch={letterSearch}
          setLetterSearch={setLetterSearch}
        />
        {/* <AddDescriptionFocus titre={titre} setTitre={setTitre} description={description} setDescription={setDescription} /> */}
      </div>

      {/* Voir resultat */}
      <div
        className="uploadImage"
        style={
          menuUrl !== "voir-resultat"
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <ViewFocusFinal titre={titre} description={description}>
          <div className="img">{thumbs}</div>
        </ViewFocusFinal>
      </div>

      {/* After success */}
      <Backdrop
        sx={{
          color: "#fff",
          background: `${addSucces ? "rgba(29, 209, 161,0.8)" : null}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
        // onClick={() => setOpenBackdrop(!openBackdrop)}
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

const AddCategory = (props) => {
  const { categoryList, setIdCateg, letterSearch, setLetterSearch, idCateg } =
    props;

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
                <Grid item md={12} key={index}>
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

AddCategory.propTypes = {
  categoryList: PropTypes.array.isRequired,
  setIdCateg: PropTypes.string.isRequired,
  letterSearch: PropTypes.string.isRequired,
  setLetterSearch: PropTypes.string.isRequired,
  idCateg: PropTypes.string.isRequired,
};

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

const selected = {
  border: "1px solid var(--grey)",
  height: "45px",
  width: "320px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  paddingInline: "12px",
  fontSize: "14px",
  cursor: "pointer",
};
