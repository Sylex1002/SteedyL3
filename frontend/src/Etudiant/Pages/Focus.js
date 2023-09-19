import React, { useEffect, useContext, useState } from "react";
import CardFocus from "../components/CardFocus";
import LayoutEtudiant from "../Layout/LayoutEtudiant";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_FOCUS_FOLLOW_PROF_ACTIVE,
  GET_FOCUS_FOLLOW_PROF,
} from "../../Reducers/ReducerFocus";
import {
  get_focus_search,
  get_followed_prof_focusesAction,
} from "../../Actions/ActionFocus";
import { AppContext } from "../../Context/AppContext";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import "./style/Focus.scss";

export default function Focus() {
  const { searchInput, Uuid } = useContext(AppContext);
  const focus_follow = useSelector(GET_FOCUS_FOLLOW_PROF).filter((item) =>
    item.titre.toLowerCase().includes(searchInput.toLowerCase())
  );
  const focus_follow_active = useSelector(GET_FOCUS_FOLLOW_PROF_ACTIVE);
  const [focusDataSearch, setFocusDataSearch] = useState([]);
  const { openDrawer } = useContext(AppContext);

  const dispatch = useDispatch();

  // get followed prof focuses
  useEffect(() => {
    if (Uuid !== null) {
      if (focus_follow_active === false) {
        // get followed prof focuses
        dispatch(get_followed_prof_focusesAction(Uuid));
      }
    }
  }, [dispatch, Uuid, focus_follow_active]);

  const handleSearch = async () => {
    await dispatch(get_focus_search(searchInput)).then((res) => {
      setFocusDataSearch(res.data);
    });
  };

  // FocusList
  const FocusList = ({ focus_list, openDrawer }) => (
    <>
      {focus_list ? (
          <Grid container spacing={1} className="Focus_content">
            {focus_list.map((focus, index) => (
              <Grid item md={!openDrawer ? 2.4 : 3} key={index}>
                <CardFocus focus={focus} maxWidth="100%" />
              </Grid>
            ))}
          </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={!openDrawer ? 2.4 : 3}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={250}
              height={300}
            />
          </Grid>
          <Grid item md={!openDrawer ? 2.4 : 3}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={250}
              height={300}
            />
          </Grid>
          <Grid item md={!openDrawer ? 2.4 : 3}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={250}
              height={300}
            />
          </Grid>
          <Grid item md={!openDrawer ? 2.4 : 3}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={250}
              height={300}
            />
          </Grid>
          <Grid item md={!openDrawer ? 2.4 : 3}>
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
  );

  FocusList.propTypes = {
    focus_list: PropTypes.array.isRequired,
    openDrawer: PropTypes.bool.isRequired,
  };

  return (
    <LayoutEtudiant showSearch={true} handleSearch={handleSearch}>
      <div id="Focus">
        {focusDataSearch.length > 0 ? (
          <FocusList focus_list={focusDataSearch} openDrawer={openDrawer} />
        ) : (
          <>
            {focus_follow.length > 0 ? (
              <FocusList focus_list={focus_follow} openDrawer={openDrawer} />
            ) : (
              <div id="FocustNone">
                <div className="FocustNone_container">
                  <div className="FocustNone_title">
                    <h1>Focus None</h1>
                    <span>refresh page</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </LayoutEtudiant>
  );
}
