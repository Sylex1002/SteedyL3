import React from "react";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_LIST_USER_ADMIN } from "../../../Reducers/Admin/AdminUserSlice";
import Experience from "../../Components/Experence/Experience";
import HobbieAdmin from "../../Components/HobbieAdmin/HobbieAdmin";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import "./Profiluser.css";

export default function Profiluser() {
  const params = useParams();
  const users = useSelector(GET_LIST_USER_ADMIN);
  const user = users.filter((user) => params.id === user.matricule);

  return (
    <LayoutAdmin>
      <div id="Profiluser">
        <div className="Profiluser-content">
          {user[0] !== undefined && (
            <div className="Profiluser-card">
              <div className="Profiluser-card-top">
                <div className="Profiluser-card-top-left">
                  <div className="Profiluser_editButton">Edit</div>
                  <h1 className="Profiluser_title">Information</h1>
                  <div className="Profiluser-card-top_item">
                    <img
                      className="profil_itemImage"
                      src={`/assets/user.jpeg`}
                      alt="profil-user"
                    />
                    <div className="Profiluser_details">
                      <h1 className="Profiluser_details_title">
                        {user[0].first_name} {user[0].last_name}
                      </h1>
                      <div className="Profiluser_details_item">
                        <span className="Profiluser_details_itemKey">
                          Email:
                        </span>
                        <span className="Profiluser_details_itemValue">
                          {user[0].email}
                        </span>
                      </div>
                      <div className="Profiluser_details_item">
                        <span className="Profiluser_details_itemKey">
                          Phone:
                        </span>
                        <span className="Profiluser_details_itemValue">
                          +261 32 22 12916
                        </span>
                      </div>
                      <div className="Profiluser_details_item">
                        <span className="Profiluser_details_itemKey">
                          Adress:
                        </span>
                        <span className="Profiluser_details_itemValue">
                          Andraisoeo ,101 Antananarivo
                        </span>
                      </div>
                      <div className="Profiluser_details_item">
                        <span className="Profiluser_details_itemKey">
                          Country:
                        </span>
                        <span className="Profiluser_details_itemValue">
                          Madagascar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Profiluser-card-top-right">
                  <h1>chart</h1>
                </div>
              </div>
              <div className="Profiluser-card-bottom"></div>
            </div>
          )}
          <div className="Experience_profil">
            <div className="Experience_profil_title">
              <h3>Experiences</h3>
            </div>
            <div className="Experience_profil_content">
              <Experience />
              <Experience />
              <Experience />
              <Experience />
              <Experience />
              <Experience />
            </div>
          </div>
          <div className="Hobbie_profil">
            <div className="Hobbie_profil_title">
              <h3>Hobbies</h3>
            </div>
            <div className="Hobbie_profil">
              <HobbieAdmin />
              <HobbieAdmin />
              <HobbieAdmin />
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
