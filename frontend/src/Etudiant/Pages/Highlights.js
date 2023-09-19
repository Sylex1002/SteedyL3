import React, { useEffect, useContext, useState } from "react";
import LayoutEtudiant from "../Layout/LayoutEtudiant";
import { useDispatch, useSelector } from "react-redux";
import CardHighlightPro from "../components/CardHighlightPro";
import { GET_HIGHLIGHT_UNVIEWED } from "../../Reducers/ReducerHighlight";
import {
  getAllHighLightUnViewedfAction,
  get_search_highlight_action,
} from "../../Actions/ActionHighlight";
import { AppContext } from "../../Context/AppContext";
import { Grid, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style/Highlights.scss";

export default function Highlights() {
  const { openDrawer, Uuid, searchInput, setInitialSliding } =
    useContext(AppContext);

  const [highlightDataSearch, setHighlightDataSearch] = useState([]);

  // Drawer toggle
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // highlight
  const highlight_unviewed = useSelector(GET_HIGHLIGHT_UNVIEWED).filter(
    (item) => item.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  // get all HIGHLIGHT
  useEffect(() => {
    if (Uuid !== null && Uuid !== undefined) {
      // ========HIGHLIGHT=======
      dispatch(getAllHighLightUnViewedfAction(Uuid));
    }
  }, [dispatch, Uuid]);

  const handleSearch = async () => {
    await dispatch(get_search_highlight_action(searchInput)).then((res) => {
      setHighlightDataSearch(res.data);
    });
  };

  return (
    <LayoutEtudiant showSearch={true} handleSearch={handleSearch}>
      <div id="Highlights">
        {highlightDataSearch.length > 0 ? (
          <Grid
            container
            spacing={2}
            className="Highlights_content"
            direction="row"
          >
            {highlightDataSearch.map((highlight, index) => (
              <Grid key={index} item md={!openDrawer ? 2.4 : 3}>
                <CardHighlightPro
                  highlight={highlight}
                  clicked={() => {
                    setInitialSliding(index);
                    navigate(`/etudiant/Highlights/${highlight.id}`);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {highlight_unviewed.length > 0 ? (
              <Grid
                container
                spacing={2}
                className="Highlights_content"
                direction="row"
              >
                {highlight_unviewed.map((highlight, index) => (
                  <Grid key={index} item md={!openDrawer ? 2.4 : 3}>
                    <CardHighlightPro
                      highlight={highlight}
                      clicked={() => {
                        setInitialSliding(index);
                        navigate(`/etudiant/Highlights/${highlight.id}`);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid
                container
                spacing={2}
                className="Highlights_content"
                direction="row"
              >
                <Grid item>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={250}
                    height={300}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={250}
                    height={300}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={250}
                    height={300}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={250}
                    height={300}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={250}
                    height={300}
                  />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </div>
    </LayoutEtudiant>
  );
}
