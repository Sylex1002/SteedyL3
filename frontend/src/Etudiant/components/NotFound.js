import React from "react";
import "./style/NotFound.scss";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function NotFound() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div id="NotFound">
      <Header />
      <div className="NotFound_container">
        <div className="NotFound_content">
          <h2> 404 </h2> <h1> Page not found </h1>{" "}
          <button onClick={handleReturn} className="NotFound_btn">
            {" "}
            Return{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
