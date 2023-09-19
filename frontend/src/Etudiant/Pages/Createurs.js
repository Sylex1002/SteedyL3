import "./style/createurs.scss";
import LayoutEtudiant from "../Layout/LayoutEtudiant";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardAllProfessionnel from "../components/CardAllProfessionnel";
import {
  getAllProfAction,
  getFollowProfAction,
  getPro_search_Action,
} from "../../Actions/ActionProf";
import {
  post_follower_user_all_Action,
  post_unfollower_user_all_Action,
} from "../../Actions/actionAuth";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { AppContext } from "../../Context/AppContext";
import { Grid } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  GET_ALL_PROF_LIST,
  GET_FOLLOW_PROF_LIST,
  GET_ALL_PROF_LIST_ACTIVE,
  GET_FOLLOW_PROF_LIST_ACTIVE,
} from "../../Reducers/ReduceProfesssionnel";

export default function Createurs() {
  const [value, setValue] = useState("one");
  const { searchInput, Uuid, openDrawer} = useContext(AppContext);
  const professionnelData = useSelector(GET_ALL_PROF_LIST).filter((item) =>
    item.user?.first_name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  const prof_Follow = useSelector(GET_FOLLOW_PROF_LIST).filter((item) =>
    item.user?.first_name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  const professionnelData_active = useSelector(GET_ALL_PROF_LIST_ACTIVE);
  const [highlightDataSearch, setHighlightDataSearch] = useState([]);
  const prof_Follow_active = useSelector(GET_FOLLOW_PROF_LIST_ACTIVE);
  const user_conect = useSelector(GET_USER_INFO_CONNECT);
  const dispatch = useDispatch();

  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            "& .Mui-selected": {
              color: "#f49030",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#f49030",
            },
          },
        },
      },
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get all prof
  useEffect(() => {
    if (professionnelData_active === false) {
      // get all prof
      dispatch(getAllProfAction());
    }
  }, [professionnelData_active, dispatch]);

  // get prof folloed
  useEffect(() => {
    if (Uuid !== null) {
      if (prof_Follow_active === false) {
        // get prof folloed
        dispatch(getFollowProfAction(Uuid));
      }
    }
  }, [Uuid, dispatch, prof_Follow_active]);

  // ================FONCTION=========================
  const handleFollower = (id_user_of_prof) => {
    const formdata = { follower: user_conect.id, user: id_user_of_prof };
    dispatch(post_follower_user_all_Action(formdata));
  };

  const handleUnFollower = (id_user_of_prof) => {
    const formdata = { follower: user_conect.id, user: id_user_of_prof };
    dispatch(post_unfollower_user_all_Action(formdata));
  };

  const handleSearch = async () => {
    await dispatch(getPro_search_Action(searchInput)).then((res) => {
      setHighlightDataSearch(res.data);
    });
  };

  return (
    <LayoutEtudiant showSearch={true} handleSearch={handleSearch}>
      <Box className="createurs" sx={{ width: "100%", height: "100%" }}>
        <div className="tabMenu">
          <ThemeProvider theme={theme}>
            <Tabs
              value={value}
              onChange={handleChange}
              style={{ color: "#f49030", fontFamily: 'var(--font)' }}
              aria-label="secondary tabs"
            >
              <Tab
                value="one"
                style={value === "one" ? { color: "#f49030", fontFamily: 'MontSerrat' } : { fontFamily: 'MontSerrat' }}
                label="Tous les createurs"
              />
              <Tab
                value="two"
                style={value === "two" ? { color: "#f49030", fontFamily: 'MontSerrat' } : { fontFamily: 'MontSerrat' }}
                label="Abonnes"
              />
            </Tabs>
          </ThemeProvider>
        </div>
        <div className="showing">
          <div className="Createurs_liste">
            {highlightDataSearch.length > 0 ? (
              <Grid container spacing={2}>
                {highlightDataSearch.map((pro, index) => (
                  <Grid key={index} md={!openDrawer ? 2.4 : 3} item>
                    <CardAllProfessionnel
                      handleUnFollower={handleUnFollower}
                      handleFollower={handleFollower}
                      pro={pro}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                {value === "one" &&
                  professionnelData.map((pro, index) => (
                    <Grid key={index} md={!openDrawer ? 2.4 : 3} item>
                      <CardAllProfessionnel
                        handleUnFollower={handleUnFollower}
                        handleFollower={handleFollower}
                        pro={pro}
                      />
                    </Grid>
                  ))}
                {value === "two" &&
                  prof_Follow.map((pro, index) => (
                    <Grid key={index} item md={!openDrawer ? 2.4 : 3}>
                      <CardAllProfessionnel
                        handleUnFollower={handleUnFollower}
                        handleFollower={handleFollower}
                        duree={index}
                        pro={pro}
                      />
                    </Grid>
                  ))}
              </Grid>
            )}
          </div>
        </div>
      </Box>
    </LayoutEtudiant>
  );
}
