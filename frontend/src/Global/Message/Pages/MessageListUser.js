import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/MessageListUser.scss";
import { Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import LayoutDashboard from "../../../Professionnel/Layout/LayoutDashboard";
import { BoxUserMessage } from "../../../Etudiant/components/BoxUserMessage";
import { AppContext } from "../../../Context/AppContext";
import { BaseURL } from "../../../Helpers/ServiceApi";
import {
  Notif_message_action_etudiant,
  Notif_message_action_prof,
} from "../../../Actions/ActionMessage";
import {
  GET_ETTUDIANT_MESSAGE_LISTS,
  GET_PROFESSIONNEL_MESSAGE_LISTS,
} from "../../../Reducers/ReducerMessage";

export default function MessageListUser() {
  const [searchQuery, setSearchQuery] = useState("");
  const userID = useSelector(GET_USER_INFO_CONNECT);
  const message_listes_etudiant = useSelector(
    GET_ETTUDIANT_MESSAGE_LISTS
  ).filter((etudiant) =>
    `${etudiant?.user.username} ${etudiant?.user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const message_listes_prof = useSelector(GET_PROFESSIONNEL_MESSAGE_LISTS);
  const userDetected = userID.fonction === "Professionnel";
  const { openDrawer, Uuid } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNOtification = async () => {
      if (userDetected && Uuid !== null) {
        await dispatch(Notif_message_action_prof(Uuid));
      } else if (!userDetected && Uuid !== null) {
        await dispatch(Notif_message_action_etudiant(Uuid));
      }
    };
    fetchNOtification();
  }, [dispatch, Uuid]);

  return (
    <>
      {userID?.fonction === "Professionnel" ? (
        <LayoutDashboard>
          <div className="messagePage">
            <div className="searchBarBox">
              <div className="searchWithFilter">
                <Stack direction="row" spacing={1}>
                  <SearchIcon id="searchIcon" />
                  <input
                    type="search"
                    placeholder="Rechercher"
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </Stack>
              </div>
            </div>

            <>
              <div className="listUsers">
                {message_listes_prof.length > 0 && (
                  <Grid container spacing="12px" direction="row">
                    {message_listes_prof.map((etudiant, index) => (
                      <Grid item key={index} md={3} sm={4}>
                        <BoxUserMessage
                          image={`${BaseURL}${etudiant?.user.image_url}`}
                          username={`${etudiant.user.first_name} ${etudiant.user.last_name}`}
                          status={etudiant.user.fonction}
                          link={`/professionnel/messages/${etudiant.user.matricule}`}
                          maxWidth="100%"
                          notifcount={etudiant.message.length}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            </>
          </div>
        </LayoutDashboard>
      ) : (
        <LayoutEtudiant showSearch={false}>
          <div className="messagePage">
            <div className="searchBarBox">
              <div className="searchWithFilter">
                <Stack direction="row" spacing={1}>
                  <SearchIcon id="searchIcon" />
                  <input
                    type="search"
                    placeholder="Rechercher"
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </Stack>
              </div>
            </div>

            <>
              <div className="listUsers">
                {message_listes_etudiant.length > 0 && (
                  <Grid container spacing="12px" direction="row">
                    {message_listes_etudiant.map((prof, index) => (
                      <Grid item md={!openDrawer ? 2.4 : 3} key={index}>
                        <BoxUserMessage
                          image={`${BaseURL}${prof.user.image_url}`}
                          username={`${prof.user.first_name} ${prof.user.last_name}`}
                          status={prof.user.fonction}
                          link={`/etudiant/messages/${prof.user.matricule}`}
                          maxWidth="100%"
                          notifcount={prof.message.length}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            </>
          </div>
        </LayoutEtudiant>
      )}
    </>
  );
}
