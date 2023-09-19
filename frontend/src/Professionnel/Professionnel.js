import React from "react";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../Actions/actionUsers";
import { removeStorage } from "../Helpers/RemoveStorage";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Professionnal = ({ removeCookie }) => {
  const navigate = useNavigate();

  const [data, setdata] = useState([]);

  useEffect(() => {
    getUser(window.localStorage.getItem("id")).then((res) => setdata(res));
  }, [data]);

  // removeStorage()

  const deconnecter = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    removeStorage();
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard Professionnel</h1>
      <Button onClick={() => deconnecter()}>Deconnecter</Button>
      <h1>Informations</h1>
      <p>{data.first_name}</p>
      <p>{data.last_name}</p>
      <p>{data.email}</p>
    </div>
  );
};

Professionnal.propTypes = {
    removeCookie: PropTypes.func.isRequired,
    
  };

export default Professionnal;
