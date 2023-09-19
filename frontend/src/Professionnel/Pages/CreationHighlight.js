import React from "react";
import HeaderBlock from "../../Etudiant/components/HeaderBlock";
import "./styles/CreationHighlight.scss";
import { Stack } from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import { useNavigate } from "react-router-dom";

export default function CreationHighlight() {
  const navigate = useNavigate();

  return (
    <div className="creationHighlight">
      <HeaderBlock redirection="/professionnel/creer" />
      <div className="content">
        <Stack direction="row" spacing="40px">
          <div
            className="new"
            onClick={() =>
              navigate(
                "/professionnel/creation-highlight/nouveau-contenu/ajout-image"
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
