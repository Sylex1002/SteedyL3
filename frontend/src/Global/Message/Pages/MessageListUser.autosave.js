import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PROF_LIST } from "../../../Reducers/ReduceProfesssionnel";
import "./style/MessageListUser.scss";

import { BaseURL } from "../../../Helpers/InstanceAxionsAdmin";
import { getAllProfAction } from "../../../Actions/ActionProf";
import { Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BoxUserMessage from "../../../Etudiant/components/BoxUserMessage";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { getConversationsAction } from "../../../Actions/ActionMessage";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";

export default function MessageListUser() {
  const profs = useSelector(GET_ALL_PROF_LIST);
  const userID = useSelector(GET_USER_INFO_CONNECT);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setactiveMenu] = useState("all");

  useEffect(
    (userDetMessage) => {
      return async () => {
        await dispatch(getAllProfAction());
        if (userDetMessage) {
          await dispatch(
            getConversationsAction(userDetMessage?.id, userID?.id)
          );
        }
      };
    },
    [dispatch]
  );

  return (
    <LayoutEtudiant handleSearch={false}>
      <div className="messagePage">
        {/* <HeaderBlock /> */}
        <div className="menus">
          <div className="menuBar">
            {/* <Stack direction='row'> */}
            <div
              className={activeMenu === "all" ? "menu active" : "menu"}
              onClick={() => setactiveMenu("all")}
            >
              <div className="icon"></div>
              <div className="text">
                <p>Tous</p>
              </div>
            </div>
            <div
              className={activeMenu === "student" ? "menu active" : "menu"}
              onClick={() => setactiveMenu("student")}
            >
              <div className="icon"></div>
              <div className="text">
                <p>Etudiants</p>
              </div>
            </div>
            <div
              className={activeMenu === "pro" ? "menu active" : "menu"}
              onClick={() => setactiveMenu("pro")}
            >
              <div className="icon"></div>
              <div className="text">
                <p>Professionnels</p>
              </div>
            </div>
            {/* </Stack> */}
          </div>
        </div>

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
            <Grid container spacing={2} direction="row">
              {profs
                .filter((prof) =>
                  `${prof.user.username} ${prof.user.first_name}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((prof, index) => (
                  <Grid item key={index}>
                    <BoxUserMessage
                      image={`${BaseURL}${prof.user.image_url}`}
                      username={`${prof.user.username}`}
                      status={prof.user.fonction}
                      link={`/etudiant/messages/${prof.user.matricule}`}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
        </>
      </div>
    </LayoutEtudiant>
  );
}
