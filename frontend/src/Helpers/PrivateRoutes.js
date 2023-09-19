import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoutes({ children }) {
  const [cookies] = useCookies(["access_token"]);

  return cookies.access_token ? children : <Navigate to="/login" />;
  // return children
}


PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  
};
