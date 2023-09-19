import React, { useContext, useEffect } from "react";
import Header from "../../Global/Components/Header";
import SideBar from "../Components/SideBar";
import "./LayoutDashboard.scss";
import PropTypes from "prop-types";
import { AudioContext } from "../../Context/AudioContext ";
import CardActiveBarFocus from "../../Etudiant/components/CardActiveBarFocus";

export default function LayoutDashboard({ children, showSearch }) {
  const { setCancelButtonFocus } = useContext(AudioContext);

  useEffect(() => {
    // false cancel
    setCancelButtonFocus(false);
  }, [setCancelButtonFocus]);

  return (
    <div className="layoutDashboard">
      <Header showSearch={showSearch} pro={true} />
      <div className="contentLayout">
        <div className="drawer">
          <SideBar />
        </div>
        <div className="views">{children}</div>
        <CardActiveBarFocus/>
      </div>
    </div>
  );
}

LayoutDashboard.propTypes = {
  children: PropTypes.node.isRequired,
  showSearch: PropTypes.bool.isRequired,
};
