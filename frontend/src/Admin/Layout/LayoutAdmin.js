import React from "react";
import HeaderAdmin from "../Components/HeaderAdmin/HeaderAdmin";
import NavBar from "../Components/NavBar/NavBarAdmin";
import PropTypes from "prop-types";
import "./LayoutAdmin.css";

export default function LayoutAdmin({ children }) {
  return (
    <div id="LayoutAdmin">
      <NavBar />
      <div className="LayoutAdmin-container">
        <HeaderAdmin />
        <div className="LayoutAdmin-content">{children}</div>
      </div>
    </div>
  );
}

// Ajoutez la validation PropTypes pour 'children'
LayoutAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};