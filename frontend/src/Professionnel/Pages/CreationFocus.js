import React from "react";
import "./styles/CreationFocus.scss";
import HeaderBlock from "../../Etudiant/components/HeaderBlock";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icons
import AddIcon from "@mui/icons-material/Add";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";

export default function CreationFocus() {
  const navigate = useNavigate();

  return (
    <div className="creationFocus">
      <HeaderBlock redirection="/professionnel/creer" />
      <div className="content">
        <Stack direction="row" spacing="40px">
          <div
            className="new"
            onClick={() =>
              navigate(
                "/professionnel/creation-focus/nouveau-contenu/ajout-audio"
              )
            }
          >
            <Stack direction="column" spacing="40px">
              <div className="icon">
                <div className="myIcon">
                  <AddIcon className="iconSize" />
                </div>
              </div>
              <div className="title">
                <p>Nouveau contenu</p>
              </div>
            </Stack>
          </div>

          <div className="prom">
            <Stack direction="column" spacing="40px">
              <div className="icon">
                <div className="myIcon">
                  <VerticalSplitIcon className="iconSize" />
                </div>
              </div>
              <div className="title">
                <p>Promouvoir un contenu</p>
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
}
