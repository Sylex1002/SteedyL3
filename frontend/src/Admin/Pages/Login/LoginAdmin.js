import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdminAction } from "../../../Actions/Admin/AdminAuthAction";
import "./LoginAdmin.css";

export default function LoginAdmin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formdata = {
      email: Email,
      password: Password,
    };
    dispatch(loginAdminAction(formdata));
  };
  return (
    <div id="LoginAdmin" className="LoginAdmin">
      <div className="LoginAdmin-content">
        <div className="LoginAdmin-form-content">
          <div className="LoginAdmin-header">
            <img src="/assets/STEEDY1.png" alt="logo" />
          </div>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn-LoginAdmin">
              Sec connecter
            </button>
          </form>
          <div className="LoginAdmin-footer">
            <span>
              {" "}
              <Link to="/admin-signu">S`inscrire</Link>{" "}
            </span>
            <span>
              {" "}
              <Link to="/"> Mot de passe oublie</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
