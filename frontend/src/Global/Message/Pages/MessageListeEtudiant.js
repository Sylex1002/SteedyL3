import { AppContext } from "../../../Context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import { BoxUserMessage } from "../../../Etudiant/components/BoxUserMessage";
import { get_all_my_conversation_action } from "../../../Actions/ActionMessage";
import { useDispatch, useSelector } from "react-redux";
import { BaseURL } from "../../../Helpers/ServiceApi";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Stack } from "@mui/material";
import "./style/MessageListUser.scss";

export default function MessageListEtudiant() {
  const [searchQuery, setSearchQuery] = useState("");
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const { openDrawer } = useContext(AppContext);
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
            {conversations.length > 0 && (
              <Grid container spacing={2} direction="row">
                {conversations
                  .filter((item) =>
                    `${item?.other_user.first_name} ${item?.other_user.last_name}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((chat, index) => (
                    <Grid item md={!openDrawer ? 2.4 : 3} key={index}>
                      <BoxUserMessage
                        image={`${BaseURL}${chat.other_user.image_url}`}
                        username={`${chat.other_user.first_name} ${chat.other_user.last_name}`}
                        status={chat.last_message?.content}
                        link={`/etudiant/messages/${chat.other_user.matricule}`}
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
    </LayoutEtudiant>
  );
}
