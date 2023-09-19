import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPro } from "../../../Actions/Admin/AdminProAction";
import { PRO_GETALL_ADMIN } from "../../../Reducers/Admin/AdminProSlice";
import ProCard from "../../Components/ProCard/ProCard";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import { SearchOutlined } from "@mui/icons-material";
import "./ProfessionelsAdmin.css";

export default function ProfessionelsAdmin() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const profs = useSelector(PRO_GETALL_ADMIN);
  const profsData = profs.filter(
    (prof) =>
      prof.user.first_name.toLowerCase().includes(search) ||
      prof.user.last_name.toLowerCase().includes(search)
  );

  useEffect(() => {
    return () => {
      dispatch(GetAllPro());
    };
  }, [dispatch]);

  return (
    <LayoutAdmin>
      <div id="ProfessionelsAdmin">
        <div className="ProfessionelsAdmin-content">
          <div className="ProfessionelsAdmin_search_content">
            <div className="ProfessionelsAdmin_search">
              <input
                value={search}
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <SearchOutlined />
              </button>
            </div>
          </div>
          <div className="ProfessionelsAdmin_list">
            {profs[0] !== undefined &&
              profsData.map((pro, index) => <ProCard key={index} pro={pro} />)}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
