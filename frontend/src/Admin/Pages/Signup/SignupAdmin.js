import React, { useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SignupAdmin.css";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import { signupAdminAction } from "../../../Actions/Admin/AdminAuthAction";

export default function SignupAdmin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formdata = {
      username: FirstName,
      first_name: FirstName,
      last_name: LastName,
      email: Email,
      password: Password,
    };
    const res = await dispatch(signupAdminAction(formdata));
    if (res.data) {
      if (res.data.message === "successFull") {
        navigate("/");
      }
    }
  };
  return (
    <LayoutAdmin>
      <div id="SignupAdmin" className="SignupAdmin">
        <div className="SignupAdmin-content">
          <div className="SignupAdmin-form-content">
            <div className="SignupAdmin-header">
              <img src="/assets/STEEDY1.png" alt="logo" />
            </div>
            <form onSubmit={handleLogin}>
              <div className="loginField">
                <label>First Name</label>
                <input
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name ..."
                />
              </div>
              <div className="loginField">
                <label>Last Name</label>
                <input
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name ..."
                />
              </div>
              <div className="loginField">
                <label>Adresse e-mail</label>
                <input
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Exemple@exemple.com"
                />
              </div>
              <div className="loginField">
                <label>Mot de passe</label>
                <input
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                />
              </div>
              <button type="submit" className="btn-SignupAdmin">
                S`` inscrire
              </button>
            </form>
            <div className="SignupAdmin-footer">
              <span>
                {" "}
                <Link to="/"> Mot de passe oublie</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
