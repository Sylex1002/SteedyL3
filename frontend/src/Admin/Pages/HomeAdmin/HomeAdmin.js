import React from "react";
import { useSelector } from "react-redux";
import { GET_USER_LEN_ADMIN } from "../../../Reducers/Admin/AdminUserSlice";
import { PROF_LENGTH_ADMIN } from "../../../Reducers/Admin/AdminProSlice";
import Widget from "../../Components/Widget/Widget";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import {
  PersonOutlined,
  ShoppingCartOutlined,
  MonetizationOnOutlined,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import "./HomeAdmin.css";

export default function HomeAdmin() {
  const users_len = useSelector(GET_USER_LEN_ADMIN);
  const pro_len = useSelector(PROF_LENGTH_ADMIN);

  return (
    <LayoutAdmin>
      <div id="HomeAdmin">
        <div className="HomeAdmin-content">
          <div className="Widget-container">
            <Widget
              title="users"
              len={users_len}
              Icon={PersonOutlined}
              linkValue={"See all users"}
              link="/"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255,0,0,0.2)",
              }}
            />
            <Widget
              title="etudiants"
              len={users_len}
              Icon={ShoppingCartOutlined}
              linkValue={"View  all etudiants"}
              link="/"
              style={{
                color: "goldenrod",
                backgroundColor: "rgba(218,165,32,0.2)",
              }}
            />
            <Widget
              title="professionels"
              len={pro_len}
              Icon={MonetizationOnOutlined}
              linkValue={"See all professionels"}
              link="/admin-pro"
              style={{
                color: "green",
                backgroundColor: "rgba(0,128,0,0.2)",
              }}
            />
            <Widget
              title="entreprises"
              len={users_len}
              Icon={AccountBalanceWalletOutlined}
              linkValue={"See all entreprises"}
              link="/entreprises"
              style={{
                color: "purple",
                backgroundColor: "rgba(128,0,128,0.2)",
              }}
            />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
