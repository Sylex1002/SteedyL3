import React from "react";
import { useMatch } from "react-router-dom";
import { apiBack } from "../../Helpers/ServiceApi";
import Createurs from "../pages/Createurs";
import FilActualite from "../pages/FilActualite";
import UpdateProfil from "../pages/UpdateProfil";
import "./style/containerView.scss";
import PropTypes from "prop-types";

export default function ContainerView(props) {
  const {
    id_user,
    firstName,
    lastName,
    email,
    image,
    bio,
    fonction,
    matricule,
  } = props;

  const match = useMatch("/:fonction/:menu");
  const menuUrl = match?.params?.menu;

  return (
    <div className="containerView">
      {menuUrl === "fil-d-actualite" ? (
        <FilActualite
          id_user={id_user}
          firstName={firstName}
          lastName={lastName}
          email={email}
          matricule={matricule}
          fonction={fonction}
          bio={bio}
          image={image}
        />
      ) : menuUrl === "createurs" ? (
        <Createurs fonction={fonction} />
      ) : menuUrl === "modification+profil" ? (
        <UpdateProfil
          profil={apiBack + image}
          nom={firstName}
          prenom={lastName}
          fonction={fonction}
          email={email}
          bio={bio}
          userId={id_user}
        />
      ) : null}
    </div>
  );
}

ContainerView.propTypes = {
  id_user: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  fonction: PropTypes.string.isRequired,
  matricule: PropTypes.string.isRequired,
};
