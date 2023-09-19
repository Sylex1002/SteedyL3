import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <div className="logo"></div>
        <div className="menu">
          <Link to={`/inscription`} style={{ float: "right", zIndex: "999" }}>
            <button>S`inscrire</button>
          </Link>
          <Link to={`/login`} style={{ float: "right", zIndex: "999" }}>
            <button>Connexion</button>
          </Link>
        </div>
      </div>
      <div className="begin">
        <div className="welcome_box">
          <h1>Bienvenue sur Steedy</h1>
          <p style={{ textAlign: "justify", width: "50%" }}>
            Irure minim magna anim ad. Et non eiusmod voluptate sint voluptate
            ut adipisicing pariatur commodo dolore excepteur adipisicing. Anim
            reprehenderit ullamco dolore consectetur non sit mollit. Lorem sunt
            aliquip cupidatat non anim irure duis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
