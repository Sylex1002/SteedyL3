import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { getIdUserAction, getUserInfoAction } from "../../Actions/actionAuth";
import { useCookies } from "react-cookie";
import { Stack } from "@mui/material";
import "./styles/ViewHighlightFinal.scss";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { BaseURL } from "../../Helpers/ServiceApi";

export default function ViewHighlightFinal({ children, text, height }) {
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

//   let linkIndex = (text) => {
//     return text.search(/http(s)?:\/\/[^\s]+/);
//   };

  const showDescription = (text) => {
    const urlRegex = /(http(s)?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    const modifiedText = parts.map((part, index) => {
      return urlRegex.test(part) ? (
        <Link key={index} className="link" to={part} target="_blank">
          {part}
        </Link>
      ) : (
        part
      );
    });
    return modifiedText;
  };

  return (
    <div className="viewHighlightFinal" style={{ height: height }}>
      <div className="cardHighlightView">
        <div className="topHeader">
          <div className="header">
            <div className="pdp">
              <img src={`${BaseURL}${user.image_url}`} alt="..." />
            </div>
            <div className="infoUser">
              <Stack direction="column" spacing={1.3}>
                <p>{user.first_name}</p>
                <span>I don`t know what</span>
              </Stack>
            </div>
          </div>
        </div>

        <div className="textPublish">
          <div className="description" style={{ height: "auto" }}>
            <p>{text !== null ? showDescription(text) : null}</p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

ViewHighlightFinal.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  };
  