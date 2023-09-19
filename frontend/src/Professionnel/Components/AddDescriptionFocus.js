import React from "react";
import "./styles/AddDescriptionFocus.scss";
import { Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function AddDescriptionFocus({
  titre,
  setTitre,
  description,
  setDescription,
}) {
  return (
    <div className="addDescriptionFocus">
      <div className="cardForm">
        <div className="title">
          <Stack direction="column" spacing="4px">
            <p>Ajouter titre & description</p>
            <div className="trait"></div>
          </Stack>
        </div>

        <Stack direction="column" sx={{ mt: 2 }}>
          <div className="inputTitre">
            <TextField
              id="titre"
              label="Entrer le titre"
              margin="normal"
              onChange={(e) => setTitre(e.currentTarget.value)}
              size="small"
              color={titre === "" ? "primary" : "success"}
              style={titre !== "" ? { background: "#2ecc7044" } : null}
              InputLabelProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              fullWidth
              autoComplete="false"
            />
          </div>
          <div className="inputTitre">
            <TextField
              id="description"
              label="Entrer la description"
              margin="normal"
              onChange={(e) => setDescription(e.currentTarget.value)}
              size="small"
              color={description === "" ? "primary" : "success"}
              style={description !== "" ? { background: "#2ecc7044" } : null}
              InputLabelProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              rows={3}
              fullWidth
              autoComplete="false"
            />
          </div>
        </Stack>
      </div>
    </div>
  );
}

AddDescriptionFocus.propTypes = {
    titre: PropTypes.string.isRequired,
    setTitre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    setDescription: PropTypes.string.isRequired,
  };
  