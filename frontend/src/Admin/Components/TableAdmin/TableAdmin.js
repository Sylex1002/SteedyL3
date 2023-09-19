import React from "react";
import "./TableAdmin.css";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
//  import Paper from '@mui/material'
import { useSelector } from "react-redux";
import { GET_LIST_USER_ADMIN } from "../../../Reducers/Admin/AdminUserSlice";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function TableAdmin() {
  const users = useSelector(GET_LIST_USER_ADMIN);

  return (
    <div id="TableAdmin">
      <div className="TableAdmin-conten">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="TableCellAdmin">Id</TableCell>
                <TableCell className="TableCellAdmin">Profil</TableCell>
                <TableCell className="TableCellAdmin">First Name</TableCell>
                <TableCell className="TableCellAdmin">Last Name</TableCell>
                <TableCell className="TableCellAdmin">Email</TableCell>
                <TableCell className="TableCellAdmin">Phone</TableCell>
                <TableCell className="TableCellAdmin">Dommain</TableCell>
                <TableCell className="TableCellAdmin">Fonctions</TableCell>
                <TableCell className="TableCellAdmin">Adress</TableCell>
                <TableCell className="TableCellAdmin">Status</TableCell>
                <TableCell className="TableCellAdmin">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users[0] !== undefined &&
                users.map((user, i) => (
                  <TableRow
                    className="TableRow"
                    key={i}
                    sx={{ "&:last-child td,&:last-child th": { border: 0 } }}
                  >
                    <TableCell className="TableCellAdmin" scope="row">
                      {i}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      <div className="cellWrapper">
                        <img
                          src="/assets/user.jpeg"
                          alt="admin-profil-list"
                          className="TableImage"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      {user.first_name}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      {user.last_name}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      {user.email}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      {user.phone_number}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      {user.domain}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      {user.fonction}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      {user.address}
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      <span className="TableStatus TableActive">True</span>
                    </TableCell>
                    <TableCell className="TableCellAdmin">
                      <div className="TableAction_btn">
                        <button className="TableBtn TableBtn_del">
                          Delete
                        </button>
                        <button className="TableBtn TableBtn_update">
                          Update
                        </button>
                        <Link
                          to={`/admin-users/${user.matricule}`}
                          className="TableBtn TableBtn_view"
                        >
                          <span>View</span>
                          <RemoveRedEyeIcon />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
