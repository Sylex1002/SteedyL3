import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoursAdmin from "../../Components/CoursAdmin/CoursAdmin";
import Experience from "../../Components/Experence/Experience";
import HighLightAdmin from "../../Components/HighLightAdmin/HighLightAdmin";
import HobbieAdmin from "../../Components/HobbieAdmin/HobbieAdmin";
import ProfAbout from "../../Components/ProfAbout/ProfAbout";
import ProfBanner from "../../Components/ProfBanner/ProfBanner";
import ProfFocus from "../../Components/ProfFocus/ProfFocus";
import ProfNavBar from "../../Components/ProfNavBar/ProfNavBar";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import ProfUpdate from "../../Components/ProfUpdate/ProfUpdate";
import {
  GET_LIST_USER_ADMIN,
  GET_ONE_USER_ADMIN,
  USER_UPDATE_STORE_ADMIN,
  USER_FALSE_UPDATE_ADMIN,
} from "../../../Reducers/Admin/AdminUserSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfShow() {
  const [urlChange, seturlChange] = useState("ProfAbout");
  const dispatch = useDispatch();
  const user_matricule = useParams();
  const user_new = useSelector(GET_ONE_USER_ADMIN);
  const users = useSelector(GET_LIST_USER_ADMIN);
  const user = users.filter((user) => user_matricule.id === user.matricule);

  useEffect(() => {
    return () => {
      dispatch(USER_FALSE_UPDATE_ADMIN());
      if (user_matricule.id !== user_new) {
        dispatch(USER_UPDATE_STORE_ADMIN(...user));
      }
      dispatch(USER_UPDATE_STORE_ADMIN(...user));
    };
  }, [dispatch, user]);

  return (
    <LayoutAdmin>
      {user_new ? (
        <div id="ProfShow">
          <div className="ProfShow_content">
            <ProfBanner user={user_new} />
            <ProfNavBar seturlChange={seturlChange} />
            <div className="ProfShow_card">
              {urlChange === "ProfAbout" && (
                <ProfAbout user_new={user_new} seturlChange={seturlChange} />
              )}
              {urlChange === "Experience" && <Experience />}
              {urlChange === "HighLightAdmin" && <HighLightAdmin />}
              {urlChange === "HobbieAdmin" && <HobbieAdmin />}
              {urlChange === "CoursAdmin" && <CoursAdmin />}
              {urlChange === "ProfFocus" && <ProfFocus />}
              {urlChange === "ProfUpdate" && (
                <ProfUpdate user={user_new} seturlChange={seturlChange} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="ProfShow_loading">
          <h4>Loading ...</h4>
        </div>
      )}
    </LayoutAdmin>
  );
}
