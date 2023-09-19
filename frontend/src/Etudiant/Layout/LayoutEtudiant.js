import React, { useEffect, useContext } from "react";
import { AudioContext } from "../../Context/AudioContext ";
import DrawerLeft from "../components/Drawer";
import Header from "../components/Header";
import PropTypes from "prop-types";
import "./LayoutEtudiant.scss";
import { AppContext } from "../../Context/AppContext";
import CardActiveBarFocus from "../components/CardActiveBarFocus";

export default function LayoutEtudiant(props) {
  const { children, handleSearch,showSearch } = props;
  const { setCancelButtonFocus } = useContext(AudioContext);
  const { openDrawer, setOpenDrawer } = useContext(AppContext);

  useEffect(() => {
    // false cancel
    setCancelButtonFocus(false);
  }, [setCancelButtonFocus]);

  const handleOpenDrop = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div id="LayoutEtudiant">
      {/* header of layou etudiant */}
      <Header handleSearch={handleSearch} showSearch={showSearch} />
      <div className="LayoutEtudiant_container">
        <div
          onMouseOver={() => handleOpenDrop()}
          onMouseLeave={() => handleOpenDrop()}
        ></div>
        {/* drawer left */}
        <DrawerLeft handleOpenDrop={handleOpenDrop} />
        {/* children of layout */}
        <div
          id={"LayoutEtudiant_content"}
          style={!openDrawer ? { width: "95%" } : { width: "85%" }}
        >
          {children}
        </div>
        {/* CardActiveBarFocus */}
        <CardActiveBarFocus/>
      </div>
    </div>
  );
}

LayoutEtudiant.propTypes = {
  children: PropTypes.node.isRequired,
  handleSearch: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  
};
