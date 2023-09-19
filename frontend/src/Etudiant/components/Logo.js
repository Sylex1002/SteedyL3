import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER_ACTIVE,
  GET_USER_INFO_CONNECT,
} from "../../Reducers/ReducerUser";
import { getOneEtudiantAction } from "../../Actions/ActionEtudiants";
import { getUserInfoByTokenAction } from "../../Actions/actionAuth";
import { getProfIdAction } from "../../Actions/ActionProf";
import { AppContext } from "../../Context/AppContext";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function Logo() {
  const {  setGetIdPro, setUuid } = useContext(AppContext);
  const [cookies] = useCookies(["access_token"]);
  const user = useSelector(GET_USER_INFO_CONNECT);
  const user_active = useSelector(GET_USER_ACTIVE);
  const dispatch = useDispatch();

  useEffect(() => {
    const getId = async () => {
      if (user_active === false) {
        if (cookies.access_token) {
          const res = await dispatch(
            getUserInfoByTokenAction({ token: cookies.access_token })
          );
          //
          if (res.data.id) {
            setUuid(res.data.id);
          }
          if (res.data.fonction === "Professionnel") {
            const id_profes = await dispatch(getProfIdAction(res.data.id));
            if (id_profes) {
              setGetIdPro(id_profes.id);
            }
          } else {
            // etudiant
            await dispatch(getOneEtudiantAction(res.data.id));
          }
        }
      }
    };
    getId();
  }, [dispatch, cookies.access_token, setGetIdPro, setUuid, user_active]);


  return (
    <div id="Logo">
      <Link
        to={
          user.fonction === "Etudiant"
            ? "/etudiant/decouvrir"
            : "/professionnel/dashboard"
        }
      >
        <img
          className="Logo_img"
          src={"/assets/STEEDY1.png"}
          alt="logo_steedy"
        />
      </Link>
    </div>
  );
}
