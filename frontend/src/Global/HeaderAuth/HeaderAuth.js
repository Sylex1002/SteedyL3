import React from "react";
import "./headerAuth.scss";
import { Link } from "react-router-dom";
import Img from "../../Images/logo.png";

const HeaderAuth = () => {
  return (
    <div className="header">
      <Link to="/" className="go_home">
        <div className="logo">
          <img src={Img} width="100%" height="100%" alt="..." />
        </div>
      </Link>
    </div>
  );
};

export default HeaderAuth;
