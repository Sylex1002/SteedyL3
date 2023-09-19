import React from "react";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import "./style/FonctionUser.scss";
import PropTypes from "prop-types";

export default function FonctionUser(props) {
  const {
    Regex,
    fonction,
    setEmailSocio,
    setstatus,
    emailExist,
    error_email,
    setfonction,
    handleValideSocio,
  } = props;

  return (
    <div id="FonctionUser">
      <div className="FonctionUser_container">
        <div className="FonctionUser_content">
          {/* if email doest exist */}
          {emailExist && (
            <div>
              <TextField
                id="email"
                label="Votre email"
                margin="normal"
                onChange={(e) => setEmailSocio(e.currentTarget.value)}
                onClick={() => setstatus("email")}
                onBlur={() => {
                  Regex();
                  setstatus("");
                }}
                color={
                  error_email === "no"
                    ? "error"
                    : error_email === "yes"
                    ? "success"
                    : ""
                }
                sx={
                  error_email === "no"
                    ? {
                        background: "rgba(255, 0, 0, 0.281)",
                        backdropFilter: "blur(10px)",
                      }
                    : error_email === "yes"
                    ? {
                        background: "rgba(0, 128, 0, 0.295)",
                        backdropFilter: "blur(10px)",
                      }
                    : null
                }
                size="small"
                fullWidth
              />
            </div>
          )}
          {/* fonction of user */}
          {/* <div className='FonctionUser_header'>
                    <h1>Fonction</h1>
                </div> */}
          <div className="FonctionUser_card">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              style={{
                marginLeft: "10px",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
              }}
              defaultValue="Etudiant"
            >
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormControlLabel
                    className="radioEtudiant"
                    style={
                      fonction === "Etudiant"
                        ? { background: "#f48f308c" }
                        : { background: "none" }
                    }
                    value="Etudiant"
                    control={<Radio style={{ color: "#f49030" }} />}
                    onChange={(e) => setfonction(e.currentTarget.value)}
                    label="Etudiant"
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControlLabel
                    className="radioProfessionnel"
                    style={
                      fonction === "Professionnel"
                        ? { background: "#f48f308c" }
                        : { background: "none" }
                    }
                    value="Professionnel"
                    control={<Radio style={{ color: "#f49030" }} />}
                    onChange={(e) => setfonction(e.currentTarget.value)}
                    label="Professionnelle"
                  />
                </Grid>
              </Grid>
            </RadioGroup>

            <div className="FonctionUser">
              <button type="button" onClick={handleValideSocio}>
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

FonctionUser.propTypes = {
    Regex: PropTypes.string.isRequired,
    fonction: PropTypes.string.isRequired,
    setEmailSocio: PropTypes.string.isRequired,
    setstatus: PropTypes.string.isRequired,
    emailExist: PropTypes.bool.isRequired,
    error_email: PropTypes.string.isRequired,
    setfonction: PropTypes.string.isRequired,
    handleValideSocio: PropTypes.func.isRequired,
  };