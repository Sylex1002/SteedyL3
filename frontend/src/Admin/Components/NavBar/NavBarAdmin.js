import React, { useContext } from "react";
import {
  Dashboard,
  PersonOutline,
  InsertChart,
  Store,
  CreditCard,
  LocalShipping,
  NotificationsNone,
  AccountCircleOutlined,
  SettingsApplications,
  ExitToApp,
  PsychologyOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import "./NavBarAdmin.css";
import { AppContext } from "../../../Context/AppContext";

export default function NavBarAdmin() {
  const { darkMode, dispatch } = useContext(AppContext);

  return (
    <div
      id="NavBarAdmin"
      className={darkMode ? "NavBarAdmin_dark" : "NavBarAdmin"}
    >
      <div className="NavBarAdmin-content">
        <div className="NavBarAdmin-header">
          <Link to="/">
            <img
              src={darkMode ? "/assets/STEEDY3.png" : "/assets/STEEDY1.png"}
              alt="logo2"
            />
          </Link>
        </div>
        <div className="NavBarAdmin-body">
          {/* main */}
          <div className="NavBarAdmin-main Nav_link">
            <h4>Main</h4>
            <ul
              className={
                darkMode
                  ? "NavBarAdmin_ul_dark NavBarAdmin_ul"
                  : "NavBarAdmin_ul_light NavBarAdmin_ul"
              }
            >
              <li>
                <Dashboard className={darkMode ? "Icon_dark" : "Icon_nav"} />
                <Link to="/">Dashbord</Link>
              </li>
            </ul>
          </div>
          {/* lists */}
          <div className="NavBarAdmin-list Nav_link">
            <h4>List</h4>
            <ul
              className={
                darkMode
                  ? "NavBarAdmin_ul_dark NavBarAdmin_ul"
                  : "NavBarAdmin_ul_light NavBarAdmin_ul"
              }
            >
              <li>
                <PersonOutline
                  className={darkMode ? "Icon_dark" : "Icon_nav"}
                />
                <Link to="/admin-users">Users</Link>
              </li>
              <li>
                <Store className={darkMode ? "Icon_dark" : "Icon_nav"} />
                <Link to="/">Etudiants</Link>
              </li>
              <li>
                <CreditCard className={darkMode ? "Icon_dark" : "Icon_nav"} />
                <Link to="/admin-pro">Professionnels</Link>
              </li>
              <li>
                <LocalShipping
                  className={darkMode ? "Icon_dark" : "Icon_nav"}
                />
                <Link to="/">Entreprise</Link>
              </li>
            </ul>
          </div>
          {/* stat */}
          <div className="NavBarAdmin-useful Nav_link">
            <h4>useful</h4>
            <ul
              className={
                darkMode
                  ? "NavBarAdmin_ul_dark NavBarAdmin_ul"
                  : "NavBarAdmin_ul_light NavBarAdmin_ul"
              }
            >
              <li>
                <InsertChart className={darkMode ? "Icon_dark" : "Icon_nav"} />
                <Link to="/">Stats</Link>
              </li>
              <li>
                <NotificationsNone
                  className={darkMode ? "Icon_dark" : "Icon_nav"}
                />
                <Link to="/">Notifications</Link>
              </li>
            </ul>
          </div>
          {/* service */}
          <div className="NavBarAdmin-useful Nav_link">
            <h4>Service</h4>
            <ul
              className={
                darkMode
                  ? "NavBarAdmin_ul_dark NavBarAdmin_ul"
                  : "NavBarAdmin_ul_light NavBarAdmin_ul"
              }
            >
              <li>
                <PsychologyOutlined
                  className={darkMode ? "Icon_dark" : "Icon_nav"}
                />
                <Link to="/">HighLight</Link>
              </li>
              <li>
                <PsychologyOutlined
                  className={darkMode ? "Icon_dark" : "Icon_nav"}
                />
                <Link to="/">Logs</Link>
              </li>
              <li>
                <SettingsApplications
                  className={darkMode ? "Icon_dark" : "Icon_nav"}
                />
                <Link to="/">Settings</Link>
              </li>
            </ul>
          </div>
          {/* service */}
          <div className="NavBarAdmin-useful Nav_link">
            <h4>User</h4>
            <ul
              className={
                darkMode
                  ? "NavBarAdmin_ul_dark NavBarAdmin_ul"
                  : "NavBarAdmin_ul_light NavBarAdmin_ul"
              }
            >
              <li>
                <AccountCircleOutlined
                  className={darkMode ? "Icon_dark" : "Icon_nav"}
                />
                <Link to="/">Profil</Link>
              </li>
              <li>
                <ExitToApp className={darkMode ? "Icon_dark" : "Icon_nav"} />
                <Link to="/">Logout</Link>
              </li>
              <li>
                <ExitToApp className={darkMode ? "Icon_dark" : "Icon_nav"} />
                <Link to="/admin-login">Login</Link>
              </li>
            </ul>
          </div>
          {/* theme */}
          <div className="NavBarAdmin-theme Nav_link">
            <h4>Theme</h4>
            <div className="NavBarAdmin-theme-content">
              <div
                className="colorOption"
                onClick={() => dispatch({ type: "LIGHT" })}
              ></div>
              <div
                className="colorOption"
                onClick={() => dispatch({ type: "DARK" })}
              ></div>
            </div>
          </div>
          {/* fin */}
        </div>
      </div>
    </div>
  );
}
