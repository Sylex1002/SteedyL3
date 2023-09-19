import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { BaseURL } from "../../Helpers/ServiceApi";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { useSelector } from "react-redux";
import CommunityBox from "./CommunityBox";
import "./style/sideBarRight.scss";
import Tags from "./Tags";
import { GET_ALL_COMMUNITY_CONTAINER_USER } from "../../Reducers/ReducerCommunity";

export default function SideBarRight() {
  const user = useSelector(GET_USER_INFO_CONNECT);
  const allGroupContainerUser = useSelector(GET_ALL_COMMUNITY_CONTAINER_USER);
  // const newAllGroup = useSelector(GET_ALL_COMMUNITY_NOT_CONTAINER_USER);

  return (
    <div className="sideBarRight" id="sideBarRight">
      <div className="sideBarRight_profil_content">
        <div className="sideBarRight_profil_bg">
          <div
            className="sideBarRight_profil_couvertur"
            style={{ background: `url(${BaseURL + user.image_url})` }}
          ></div>
          <div className="sideBarRight_profil_img">
            {user.image_url ? (
              <img
                className="sideBarRight_img"
                src={BaseURL + user.image_url}
                alt="..."
                width="100%"
                height="100%"
              />
            ) : (
              <Skeleton
                className="sideBarRight_img"
                animation="wave"
                variant="rounded"
                width={50}
                height={50}
              />
            )}
          </div>
          <div className="sideBarRight_profil_bottom"></div>
        </div>
        <div className="sideBarRight_profil_info">
          {user.first_name ? (
            <p>
              {user.first_name} {user.last_name}
            </p>
          ) : (
            <p style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton variant="rounded" width={100} height={15} />
            </p>
          )}
          <span>{user.fonction}</span>
        </div>
        <div className="sideBarRight_profil_dec">
          {user.bio ? (
            <p>
              {user.bio.length > 50 ? user.bio.slice(0, 50) + " ..." : user.bio}
            </p>
          ) : (
            <p style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton variant="rounded" width={100} height={5} />
            </p>
          )}
        </div>
        {/* <div className='divider'></div> */}
        <div className="sideBarRight_profil_btn">
          <Link
            className="profil_btn"
            to={`/etudiant/profil/${user?.username}`}
          >
            Mon profil
          </Link>
        </div>
      </div>
      <div id="sideBarRight_plus">
        <Tags Tags={user?.categories} />
        <CommunityBox Communitys={allGroupContainerUser} />
        {/* <CommunityBox Communitys={newAllGroup}  /> */}
      </div>
    </div>
  );
}
