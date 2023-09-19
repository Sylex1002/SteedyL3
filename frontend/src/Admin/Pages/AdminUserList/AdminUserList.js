import React from "react";
import DataTableAdmin from "../../Components/DataTableAdmin/DataTableAdmin";
import { GET_LIST_USER_ADMIN } from "../../../Reducers/Admin/AdminUserSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminUserList.css";

export default function AdminUserList() {
  const users = useSelector(GET_LIST_USER_ADMIN);

  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone_number", headerName: "Phone", width: 150 },
    { field: "createdAt", headerName: "CreatedAt", width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headingName: "Action",
      width: 200,
      renderCell: (user) => {
        return (
          <div className="TableAction_btn">
            <Link
              to={`/admin-users/${user.row.matricule}`}
              className="TableBtn TableBtn_view"
            >
              <span>View</span>
              <RemoveRedEyeIcon />
            </Link>
            <button className="TableBtn TableBtn_del">Delete</button>
          </div>
        );
      },
    },
  ];

  return (
    <LayoutAdmin>
      <div id="AdminUserList">
        <div className="AdminUserList-content">
          <DataTableAdmin
            columns={columns}
            rows={users}
            actionColumn={actionColumn}
            title={"List of users"}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
