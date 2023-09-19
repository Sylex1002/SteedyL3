import React, { useContext, useEffect } from "react";
import { Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Logo from "./Logo";
import "./style/header.scss";
import { useWebsocketNotification } from "../../Context/WebsocketContext";
import { update_notification_action } from "../../Actions/ActionNotificate";
import { BaseURL } from "../../Helpers/ServiceApi";
import { PUSH_NOTIFICATE_MESSAGE_REDUCER } from "../../Reducers/ReducerNotification";

export default function Header(props) {
  const { handleSearch ,showSearch} = props;
  const user = useSelector(GET_USER_INFO_CONNECT);
  const { searchInput, setSearchInput} = useContext(AppContext);
  const socketNotificate = useWebsocketNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (socketNotificate) {
      socketNotificate.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if(data.user){
          // Mettez à jour le store Redux avec les nouvelles notifications
          dispatch(update_notification_action(data));
        }
        if(data.user_sender){
          dispatch(PUSH_NOTIFICATE_MESSAGE_REDUCER(data));
        }
      };
    }
  }, [socketNotificate, dispatch]);

  const handleNavigate = () => {
    navigate(`/etudiant/profil/${user?.username}`);
  };

  return (
    <div className="headerProfil">
      <Grid2 container spacing={1} className="menuLink">
        <Grid2 item xs={4} md={3}>
          <Logo />
        </Grid2>
        <Grid2
          item
          xs={12}
          md={9}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Stack direction="row" spacing={2}>
            {showSearch && (
              <div className="searchWithFilter">
                <Stack direction="row" spacing={1}>
                  <SearchIcon id="searchIcon" onClick={handleSearch} />
                  <input
                    type="search"
                    value={searchInput}
                    placeholder="Rechercher"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </Stack>
              </div>
            )}
            <div className="header_right_content_Et">
              <div className="header_img_content">
                {user.image_url ? (
                  <img
                    onClick={handleNavigate}
                    className="header_img_profil"
                    src={`${BaseURL}${user.image_url}`}
                    alt="profil_header"
                  />
                ) : (
                  <Skeleton variant="rounded" width={40} height={40} />
                )}
              </div>
            </div>
          </Stack>
        </Grid2>
      </Grid2>
    </div>
  );
}

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  
};
