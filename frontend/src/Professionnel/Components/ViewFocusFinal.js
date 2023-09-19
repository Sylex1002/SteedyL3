import React, { useEffect } from "react";
import "./styles/ViewFocusFinal.scss";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { getIdUserAction, getUserInfoAction } from "../../Actions/actionAuth";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { BaseURL } from "../../Helpers/ServiceApi";

export default function ViewFocusFinal({ titre, description, children }) {
  const [cookies] = useCookies(["access_token", "refresh_token"]);
  const dispatch = useDispatch();

  const user = useSelector(GET_USER_INFO_CONNECT);
  // user information
  useEffect(() => {
    return async () => {
      if (!user.id) {
        return null;
      } else {
        if (cookies.access_token) {
          // get user id
          const decodeToken = await dispatch(
            getIdUserAction({ token: cookies.access_token })
          );
          if (decodeToken.token_type === "access") {
            await dispatch(getUserInfoAction(decodeToken.user_id));
          }
        }
      }
    };
  }, [dispatch, cookies.access_token]);

  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="viewFocusFinal">
      <div className="cardFocus">
        <div className="topHeader">
          <div className="header">
            <div className="pdp">
              <img src={`${BaseURL}${user.image_url}`} alt="..." />
            </div>
            <div className="infoUser">
              <Stack direction="column" spacing="4px">
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  {user.first_name}
                </p>
                <span style={{ fontSize: "12px", fontWeight: "400" }}>
                  {date}
                </span>
              </Stack>
            </div>
          </div>
        </div>

        <div className="textPublish">
          <div className="description" style={{ height: "auto" }}>
            <Stack direction="column" spacing="8px">
              <p style={{ fontSize: "17px", fontWeight: "600" }}>{titre}</p>
              <p style={{ fontSize: "14px" }}>{description}</p>
            </Stack>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

ViewFocusFinal.propTypes = {
    titre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  