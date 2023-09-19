import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/MessageListUser.scss";
import { Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import LayoutDashboard from "../../../Professionnel/Layout/LayoutDashboard";
import { BoxUserMessage } from "../../../Etudiant/components/BoxUserMessage";
import { get_all_my_conversation_action } from "../../../Actions/ActionMessage";
import { BaseURL } from "../../../Helpers/ServiceApi";

export default function MessageListeProfessionnel() {
  const [searchQuery, setSearchQuery] = useState("");
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();

  
  // get all of my conversation
  useEffect(() => {
    if (user_connect.id) {
      dispatch(get_all_my_conversation_action(user_connect.id)).then((res) => {
        setConversations(res);
      });
    }
  }, [dispatch, user_connect]);

  return (
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
            {conversations.length > 0 && (
              <Grid container spacing={2} direction="row">
                {conversations
                  .filter((item) =>
                    `${item.other_user.first_name} ${item.other_user.last_name}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((chat, index) => (
                    <Grid item md={3} key={index}>
                      <BoxUserMessage
                        image={`${BaseURL}${chat.other_user.image_url}`}
                        username={`${chat.other_user.first_name} ${chat.other_user.last_name}`}
                        status={chat.last_message?.content}
                        link={`/professionnel/messages/${chat.other_user.matricule}`}
                        maxWidth="100%"
                        chat={chat}
                      />
                    </Grid>
                  ))}
              </Grid>
            )}
          </div>
        </>
      </div>
    </LayoutDashboard>
  );
}
