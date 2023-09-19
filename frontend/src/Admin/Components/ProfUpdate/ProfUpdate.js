import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfilUserAdmin } from "../../../Actions/Admin/AdminUserAction";
import { GET_ONE_USER_ADMIN } from "../../../Reducers/Admin/AdminUserSlice";
import PropTypes from "prop-types";
import "./ProfUpdate.css";

export default function ProfUpdate({ seturlChange }) {
  const user = useSelector(GET_ONE_USER_ADMIN);
  const [email, setemail] = useState("");
  const [adresse, setadresse] = useState("");
  const [dommain, setdommain] = useState("");
  const [Telephone, setTelephone] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setemail(user.email ? user.email : "");
      setadresse(user.address ? user.address : "");
      setdommain(user.domain ? user.domain : "");
      setTelephone(user.phone_number ? parseInt(user.phone_number) : 0);
    };
  }, [user]);

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const formdata = {
      email: email,
      address: adresse,
      domain: dommain,
      phone_number: Telephone,
    };
    let id = user.id;
    dispatch(UpdateProfilUserAdmin(id, formdata));
    seturlChange("ProfAbout");
  };

  return (
    <div id="ProfUpdate">
      <div className="ProfUpdate_content">
        <div className="ProfUpdate_title">
          <h3>update {user.first_name}</h3>
        </div>
        <form onSubmit={handleSubmitUpdate}>
          <div className="ProfUpdate_field">
            <label>Email:</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
            />
          </div>
          <div className="ProfUpdate_field">
            <label>Adresse</label>
            <input
              value={adresse}
              onChange={(e) => setadresse(e.target.value)}
              type="text"
            />
          </div>
          <div className="ProfUpdate_field">
            <label>Telephone</label>
            <input
              value={Telephone}
              onChange={(e) => setTelephone(e.target.value)}
              type="number"
            />
          </div>
          <div className="ProfUpdate_field">
            <label>Domain</label>
            <input
              value={dommain}
              onChange={(e) => setdommain(e.target.value)}
              type="text"
            />
          </div>

          <div className="ProfUpdate_btn">
            <button type="button" onClick={() => seturlChange("ProfAbout")}>
              Cancel
            </button>
            <button type="submit">update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

ProfUpdate.propTypes = {
  seturlChange: PropTypes.string.isRequired,
};