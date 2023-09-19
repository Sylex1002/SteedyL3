import React, { useState } from "react";
import userProfil from "../../../Images/user.png";
import "./Styles/ListCommunity.scss";
import { GET_ALL_COMMUNITY_CONTAINER_USER } from "../../../Reducers/ReducerCommunity";
import { Link, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { BaseURL } from "../../../Helpers/ServiceApi";

const ListCommunity = ({
  community,
  user,
  userDetected,
  setGroupDestMessage,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const communityContainerUser = useSelector(GET_ALL_COMMUNITY_CONTAINER_USER);
  const match = useMatch("/:fonction/:menu/:id/");
  const menuUrl = match?.params?.id;

  const handleGroupClick = async (group) => {
    // Vérifier si le groupe sélectionné est différent du groupe précédent
      setGroupDestMessage(group);
  };

  return (
    <>
      {userDetected ? (
        <div className="list-community">
          <div className="search-bar">
            <div className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M21.75 21.1895L16.086 15.5255C17.4471 13.8915 18.1258 11.7957 17.981 9.67395C17.8361 7.55225 16.8789 5.56807 15.3084 4.13416C13.7379 2.70026 11.675 1.92703 9.54893 1.97534C7.42284 2.02365 5.39723 2.88977 3.89347 4.39353C2.38971 5.89729 1.52359 7.92291 1.47528 10.049C1.42697 12.1751 2.2002 14.2379 3.6341 15.8085C5.06801 17.379 7.05219 18.3362 9.17389 18.481C11.2956 18.6259 13.3914 17.9471 15.0255 16.586L20.6895 22.25L21.75 21.1895ZM2.99996 10.25C2.99996 8.915 3.39585 7.60996 4.13754 6.49993C4.87924 5.38989 5.93345 4.52473 7.16685 4.01384C8.40025 3.50295 9.75745 3.36927 11.0668 3.62973C12.3762 3.89018 13.5789 4.53305 14.5229 5.47706C15.4669 6.42106 16.1098 7.62379 16.3703 8.93317C16.6307 10.2425 16.497 11.5997 15.9862 12.8331C15.4753 14.0665 14.6101 15.1207 13.5001 15.8624C12.39 16.6041 11.085 17 9.74996 17C7.96036 16.998 6.24463 16.2862 4.97919 15.0208C3.71375 13.7554 3.00195 12.0396 2.99996 10.25Z"
                  fill="#AFAFAF"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Faire un recherche…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p style={{ fontSize: "14px", fontWeight: "600" }}>COMMUNAUTES</p>
          <div className="list-community-container">
            <Stack direction="column" spacing="24px">
              {communityContainerUser
                ?.filter((item) =>
                  `${item.groupe_name}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((group) => {
                  return group.members.map((users, index) => {
                    return (
                      users.id === user?.id && (
                        <div
                          className={
                            menuUrl === group?.id
                              ? "card-group active-group"
                              : "card-group"
                          }
                          key={index}
                        >
                          <Link
                            to={`/professionnel/community/${group?.id}/`}
                            onClick={() => handleGroupClick(group)}
                          >
                            <div className="group">
                              <Stack direction="row" spacing="12px">
                                <img
                                  className="group-image"
                                  src={
                                    group.image
                                      ? `${BaseURL}${group.image}`
                                      : userProfil
                                  }
                                  alt="group-image"
                                />
                                <div className="group-name">
                                  <span
                                    key={index}
                                    style={{ fontSize: "15px" }}
                                  >
                                    {group.groupe_name}
                                  </span>
                                  <p style={{ fontSize: "12px" }}>
                                    {group.members.length} members
                                  </p>
                                </div>
                              </Stack>
                             
                            </div>
                          </Link>
                         
                        </div>
                      )
                    );
                  });
                })}
            </Stack>
          </div>
        </div>
      ) : (
        <div className="list-community">
          <div className="search-bar">
            <div className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M21.75 21.1895L16.086 15.5255C17.4471 13.8915 18.1258 11.7957 17.981 9.67395C17.8361 7.55225 16.8789 5.56807 15.3084 4.13416C13.7379 2.70026 11.675 1.92703 9.54893 1.97534C7.42284 2.02365 5.39723 2.88977 3.89347 4.39353C2.38971 5.89729 1.52359 7.92291 1.47528 10.049C1.42697 12.1751 2.2002 14.2379 3.6341 15.8085C5.06801 17.379 7.05219 18.3362 9.17389 18.481C11.2956 18.6259 13.3914 17.9471 15.0255 16.586L20.6895 22.25L21.75 21.1895ZM2.99996 10.25C2.99996 8.915 3.39585 7.60996 4.13754 6.49993C4.87924 5.38989 5.93345 4.52473 7.16685 4.01384C8.40025 3.50295 9.75745 3.36927 11.0668 3.62973C12.3762 3.89018 13.5789 4.53305 14.5229 5.47706C15.4669 6.42106 16.1098 7.62379 16.3703 8.93317C16.6307 10.2425 16.497 11.5997 15.9862 12.8331C15.4753 14.0665 14.6101 15.1207 13.5001 15.8624C12.39 16.6041 11.085 17 9.74996 17C7.96036 16.998 6.24463 16.2862 4.97919 15.0208C3.71375 13.7554 3.00195 12.0396 2.99996 10.25Z"
                  fill="#AFAFAF"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Faire un recherche…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p style={{ fontSize: "14px", fontWeight: "600" }}>COMMUNAUTES</p>
          <div className="list-community-container">
          <Stack direction="column" spacing="24px">

            {community
              ?.filter((item) =>
                `${item.groupe_name}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((group, index) => {
                return (
                  <div className="card-group" key={index}>
                    <Link to={`/etudiant/community/${group.id}/`}>

                      <div className="group">
                      <Stack direction="row" spacing="12px">

                        <img
                          className="group-image"
                          src={
                            group.image
                              ? `${BaseURL}${group.image}`
                              : userProfil
                          }
                          alt="group-image"
                        />
                        <div className="group-name">
                          <span key={index} style={{ fontSize: "15px" }}>
                            {group.groupe_name}
                          </span>
                          <p style={{ fontSize: "12px" }}>
                            {group.members.length} members
                          </p>
                        </div>
                        </Stack>
                      </div>
                    </Link>
                  </div>
                );
              })}
              </Stack>
          </div>
        </div>
      )}
    </>
  );
};

ListCommunity.propTypes = {
    community: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    userDetected: PropTypes.bool.isRequired,
    setGroupDestMessage: PropTypes.object.isRequired,
  };

export default ListCommunity;
