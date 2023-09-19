import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import SideBarPro from "../components/SideBarPro";
import HeaderPro from "../components/HeaderPro";
import HeaderBlock from "../components/HeaderBlock";
import { Link, useLocation } from "react-router-dom";
import { getIdUserAction, getUserInfoAction } from "../../Actions/actionAuth";
import PropTypes from "prop-types";
import "./LayoutProfilPro.scss";

export default function LayoutProfilPro({ children }) {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const part = pathParts[pathParts.length - 2];
  const [cookies] = useCookies(["access_token", "refresh_token"]);
  const dispatch = useDispatch();

  // user information
  useEffect(() => {
    return async () => {
      if (cookies.access_token) {
        // get user id
        const decodeToken = await dispatch(
          getIdUserAction({ token: cookies.access_token })
        );
        if (decodeToken.token_type === "access") {
          await dispatch(getUserInfoAction(decodeToken.user_id));
        }
      }
    };
  }, [dispatch, cookies.access_token]);

  return (
    <div className="LayoutProfilPro">
      <HeaderBlock />
      <HeaderPro />
      <div className="scaffold">
        <div className="sideBar">
          <SideBarPro />
        </div>
        <div className="contentView">
          <div className="menuPro">
            <Grid container spacing={2}>
              <Grid item md={4}>
                <Link
                  to="/etudiant/profil/publication/"
                  className={part === "publication" ? "links active" : "links"}
                >
                  Publications
                </Link>
              </Grid>
              <Grid item md={4}>
                <Link
                  to="/etudiant/profil/highlight/"
                  className={part === "highlight" ? "links active" : "links"}
                >
                  Highlight
                </Link>
              </Grid>
              <Grid item md={4}>
                <Link
                  to="/etudiant/profil/focus/"
                  className={part === "focus" ? "links active" : "links"}
                >
                  Focus
                </Link>
              </Grid>
            </Grid>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}


LayoutProfilPro.propTypes = {
  children: PropTypes.node.isRequired,
};