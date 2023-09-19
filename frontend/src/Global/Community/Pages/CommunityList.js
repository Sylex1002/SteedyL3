import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Styles/CommunityList.scss";
import userProfil from "../../../Images/user.png";
import { Grid, Stack } from "@mui/material";
import { BaseURL } from "../../../Helpers/InstanceAxionsAdmin";
import SearchIcon from "@mui/icons-material/Search";
import LayoutEtudiant from "../../../Etudiant/Layout/LayoutEtudiant";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import {
  GET_ALL_COMMUNITY_CONTAINER_USER,
  GET_ALL_COMMUNITY_NOT_CONTAINER_USER,
  GET_COMMUNITY_EN_ATTENT,
} from "../../../Reducers/ReducerCommunity";
import {
  getAllCommunityContainerUserAction,
  getAllCommunityNOTContainerUserAction,
  getCommuntyEnAttent,
} from "../../../Actions/ActionCommunity";
import { Link } from "react-router-dom";
import LayoutDashboard from "../../../Professionnel/Layout/LayoutDashboard";
import { BoxUserMessage } from "../../../Etudiant/components/BoxUserMessage";
import { BoxUserGroupe } from "../../../Etudiant/components/BoxUserGroupe";
import { AppContext } from "../../../Context/AppContext";
import AddIcon from "@mui/icons-material/Add";

export default function CommunityList() {
  const allGroupContainerUser = useSelector(GET_ALL_COMMUNITY_CONTAINER_USER);
  const newAllGroup = useSelector(GET_ALL_COMMUNITY_NOT_CONTAINER_USER);
  const userID = useSelector(GET_USER_INFO_CONNECT);
  // Drawer toggle
  const { openDrawer, Uuid } = useContext(AppContext);
  const allGroupEnAttent = useSelector(GET_COMMUNITY_EN_ATTENT);

  const userDetected = userID?.fonction === "Professionnel";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("vos-groups");
  const [IsEnattent, setIsEnattent] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Uuid) {
      dispatch(getAllCommunityNOTContainerUserAction(Uuid));
      dispatch(getAllCommunityContainerUserAction(Uuid));
    }
  }, [dispatch, Uuid]);

  useEffect(() => {
    if (!userDetected) {
      dispatch(getCommuntyEnAttent(userID?.id));
    }

  }, [userID?.id]);


  const handleTabChange = (tab) => {
    if (tab === 'en-attent') {
      setIsEnattent(true);
    }
    setActiveTab(tab);
  };


  return (
    <>
      {userDetected ? (
        <LayoutDashboard showSearch={false}>
          <div className="communityPage">
            <div className="searchBarBox">
              <div className="searchWithFilter">
                <Stack direction="row" spacing={1}>
                  <div id="searchIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M21.7495 21.1895L16.0855 15.5255C17.4466 13.8915 18.1253 11.7957 17.9805 9.67395C17.8356 7.55225 16.8784 5.56807 15.3079 4.13416C13.7374 2.70026 11.6745 1.92703 9.54844 1.97534C7.42236 2.02365 5.39674 2.88977 3.89298 4.39353C2.38922 5.89729 1.5231 7.92291 1.47479 10.049C1.42648 12.1751 2.19971 14.2379 3.63361 15.8085C5.06752 17.379 7.0517 18.3362 9.1734 18.481C11.2951 18.6259 13.391 17.9471 15.025 16.586L20.689 22.25L21.7495 21.1895ZM2.99948 10.25C2.99948 8.915 3.39536 7.60996 4.13706 6.49993C4.87876 5.38989 5.93296 4.52473 7.16636 4.01384C8.39976 3.50295 9.75696 3.36927 11.0663 3.62973C12.3757 3.89018 13.5784 4.53305 14.5224 5.47706C15.4665 6.42106 16.1093 7.62379 16.3698 8.93317C16.6302 10.2425 16.4966 11.5997 15.9857 12.8331C15.4748 14.0665 14.6096 15.1207 13.4996 15.8624C12.3895 16.6041 11.0845 17 9.74948 17C7.95987 16.998 6.24414 16.2862 4.9787 15.0208C3.71326 13.7554 3.00146 12.0396 2.99948 10.25Z"
                        fill="#AFAFAF"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    placeholder="Rechercher une communauté"
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </Stack>
              </div>
              <div className="creer">
                <Link to={`/professionnel/community/creer/`}>
                  <button className="button-creer">Créer Communauté</button>
                </Link>
              </div>
            </div>
            <div className="Community-prof">
              <Grid container spacing="12px">
                {allGroupContainerUser
                  .filter((group) =>
                    `${group.groupe_name}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((group) => {
                    return group.members.map((user, index) => {
                      return user.id === Uuid ? (
                        <Grid item key={index} md={3} sm={4}>
                          <div className="listCommunity">
                            <BoxUserMessage
                              image={
                                group.image
                                  ? `${BaseURL}${group.image}`
                                  : userProfil
                              }
                              username={`${group.groupe_name}`.slice(0, 13)}
                              link={`/professionnel/community/${group.id}`}
                              status={`${group.members.length} membres`}
                              maxwidth="100%"
                            />
                          </div>
                        </Grid>
                      ) : null;
                    });
                  })}
              </Grid>
            </div>
          </div>
        </LayoutDashboard>
      ) : (
        <LayoutEtudiant>
          <div className="communityPage">
            <Stack direction="column" spacing="24px">
              <div className="searchBarBox">
                <div className="searchWithFilter">
                  <Stack direction="row" spacing={1}>
                    <SearchIcon id="searchIcon" />
                    <input
                      type="search"
                      placeholder="Rechercher une communauté"
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                  </Stack>
                </div>
                <div className="recherche">
                  <button className="button-recherche">Recherche</button>
                </div>
              </div>
              <div className="my-community">
                <Stack direction="column" spacing="24px">
                  <div className="button-groups">
                    <div className='btns'>
                      <button
                        onClick={() => handleTabChange("vos-groups")}
                        className={activeTab === 'vos-groups' ? 'vos-groups active-tab' : 'vos-groups'}
                      >
                        <p> Vos groupes</p>
                      </button>
                      <button
                        onClick={() => handleTabChange("en-attent")}
                        className={activeTab === 'en-attent' ? 'en-attent active-tab' : 'en-attent'}
                      >
                        <p>En attente</p>
                      </button>
                    </div>
                  </div>
                  <div className="my-listCommunity">

                    {activeTab === 'vos-groups' ? (
                      <Grid container spacing="12px">
                        {allGroupContainerUser
                          ?.filter((group) =>
                            `${group.groupe_name}`
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .map((group, index) => {
                            return (
                              <Grid
                                item
                                md={!openDrawer ? 3 : 4}
                                lg={!openDrawer ? 3 : 4}
                                key={index}
                              >
                                <BoxUserGroupe
                                  image={
                                    group.image
                                      ? `${BaseURL}${group.image}`
                                      : userProfil
                                  }
                                  username={`${group.groupe_name}`}
                                  link={`/etudiant/community/${group.id}`}
                                  status={`${group.members.length} membres`}
                                  description={`${group.description} `}
                                  showStatut={true}
                                  mark={
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 28 28"
                                      fill="none"
                                    >
                                      <path
                                        d="M4.28337 19.1784L4.19925 19.4743L3.21848 22.9243L3.21729 22.9285C3.16228 23.1178 3.15879 23.3183 3.20716 23.5094C3.25542 23.7 3.35354 23.8743 3.49143 24.0145C3.62789 24.1512 3.79871 24.2485 3.98588 24.2962C4.17361 24.344 4.37079 24.3401 4.55649 24.2849L4.56567 24.2822L4.56569 24.2822L8.02723 23.3015L8.32278 23.2177L8.59215 23.3654C10.0961 24.1897 11.7685 24.6592 13.4817 24.7381C15.1949 24.817 16.9034 24.5032 18.4767 23.8206C20.05 23.138 21.4465 22.1048 22.5593 20.7999C23.6721 19.495 24.4719 17.9529 24.8974 16.2915C25.323 14.6302 25.363 12.8935 25.0146 11.2143C24.6662 9.53508 23.9384 7.95775 22.887 6.60287C21.8356 5.24799 20.4883 4.15143 18.9482 3.397C17.408 2.64257 15.7158 2.25024 14.0009 2.25L4.28337 19.1784ZM4.28337 19.1784L4.13547 18.9087M4.28337 19.1784L4.13547 18.9087M4.13547 18.9087C3.19613 17.1955 2.71917 15.2672 2.75154 13.3136C2.78392 11.3601 3.32451 9.44862 4.32009 7.76748C5.31567 6.08634 6.73192 4.69348 8.42939 3.72601C10.1269 2.75856 12.047 2.24986 14.0008 2.25L4.13547 18.9087ZM17.4458 13.0836L18.1676 13.2271L17.4458 13.0836C17.3634 13.4976 17.4057 13.9268 17.5672 14.3169C17.7288 14.7069 18.0024 15.0403 18.3534 15.2749C18.7045 15.5094 19.1172 15.6346 19.5394 15.6346C20.1055 15.6346 20.6485 15.4097 21.0488 15.0094L20.5184 14.4791L21.0488 15.0094C21.4491 14.6091 21.674 14.0661 21.674 13.5C21.674 13.0778 21.5488 12.6651 21.3142 12.3141C21.0797 11.963 20.7463 11.6894 20.3563 11.5279C19.9662 11.3663 19.537 11.324 19.1229 11.4064C18.7089 11.4888 18.3285 11.6921 18.03 11.9906C17.7314 12.2891 17.5281 12.6695 17.4458 13.0836ZM7.27652 15.2749C7.62755 15.5094 8.04026 15.6346 8.46245 15.6346C9.02859 15.6346 9.57153 15.4097 9.97185 15.0094C10.3722 14.6091 10.5971 14.0661 10.5971 13.5C10.5971 13.0778 10.4719 12.6651 10.2373 12.3141C10.0028 11.963 9.66938 11.6894 9.27933 11.5279C8.88928 11.3663 8.46008 11.324 8.04601 11.4064C7.63193 11.4888 7.25158 11.6921 6.95305 11.9906C6.65452 12.2891 6.45121 12.6695 6.36885 13.0836C6.28649 13.4976 6.32876 13.9268 6.49032 14.3169C6.65189 14.7069 6.92549 15.0403 7.27652 15.2749ZM12.815 15.2749C13.166 15.5094 13.5787 15.6346 14.0009 15.6346C14.567 15.6346 15.11 15.4097 15.5103 15.0094C15.9106 14.6091 16.1355 14.0661 16.1355 13.5C16.1355 13.0778 16.0103 12.6651 15.7758 12.3141C15.5412 11.963 15.2078 11.6894 14.8178 11.5279C14.4277 11.3663 13.9985 11.324 13.5845 11.4064C13.1704 11.4888 12.79 11.6921 12.4915 11.9906C12.193 12.2891 11.9897 12.6695 11.9073 13.0836C11.8249 13.4976 11.8672 13.9268 12.0288 14.3169C12.1903 14.7069 12.4639 15.0403 12.815 15.2749Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                  }
                                  modal={false}
                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    ) : (
                      <Grid container spacing="12px">

                        {allGroupEnAttent
                          ?.filter((group) =>
                            `${group.groupe_name}`
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .map((group, index) => {

                            return (
                              <Grid
                                item
                                md={!openDrawer ? 3 : 4}
                                lg={!openDrawer ? 3 : 4}
                                key={index}
                              >
                                <BoxUserGroupe
                                  image={
                                    group.groupes.image
                                      ? `${BaseURL}${group.groupes.image}`
                                      : userProfil
                                  }
                                  username={`${group.groupes.groupe_name}`}
                                  link={`/etudiant/community/${group.groupes.id}`}
                                  status={`${group.groupes.members.length} membres`}
                                  description={`${group.groupes.description} `}
                                  showStatut={true}
                                  mark={
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 28 28"
                                      fill="none"
                                    >
                                      <path
                                        d="M4.28337 19.1784L4.19925 19.4743L3.21848 22.9243L3.21729 22.9285C3.16228 23.1178 3.15879 23.3183 3.20716 23.5094C3.25542 23.7 3.35354 23.8743 3.49143 24.0145C3.62789 24.1512 3.79871 24.2485 3.98588 24.2962C4.17361 24.344 4.37079 24.3401 4.55649 24.2849L4.56567 24.2822L4.56569 24.2822L8.02723 23.3015L8.32278 23.2177L8.59215 23.3654C10.0961 24.1897 11.7685 24.6592 13.4817 24.7381C15.1949 24.817 16.9034 24.5032 18.4767 23.8206C20.05 23.138 21.4465 22.1048 22.5593 20.7999C23.6721 19.495 24.4719 17.9529 24.8974 16.2915C25.323 14.6302 25.363 12.8935 25.0146 11.2143C24.6662 9.53508 23.9384 7.95775 22.887 6.60287C21.8356 5.24799 20.4883 4.15143 18.9482 3.397C17.408 2.64257 15.7158 2.25024 14.0009 2.25L4.28337 19.1784ZM4.28337 19.1784L4.13547 18.9087M4.28337 19.1784L4.13547 18.9087M4.13547 18.9087C3.19613 17.1955 2.71917 15.2672 2.75154 13.3136C2.78392 11.3601 3.32451 9.44862 4.32009 7.76748C5.31567 6.08634 6.73192 4.69348 8.42939 3.72601C10.1269 2.75856 12.047 2.24986 14.0008 2.25L4.13547 18.9087ZM17.4458 13.0836L18.1676 13.2271L17.4458 13.0836C17.3634 13.4976 17.4057 13.9268 17.5672 14.3169C17.7288 14.7069 18.0024 15.0403 18.3534 15.2749C18.7045 15.5094 19.1172 15.6346 19.5394 15.6346C20.1055 15.6346 20.6485 15.4097 21.0488 15.0094L20.5184 14.4791L21.0488 15.0094C21.4491 14.6091 21.674 14.0661 21.674 13.5C21.674 13.0778 21.5488 12.6651 21.3142 12.3141C21.0797 11.963 20.7463 11.6894 20.3563 11.5279C19.9662 11.3663 19.537 11.324 19.1229 11.4064C18.7089 11.4888 18.3285 11.6921 18.03 11.9906C17.7314 12.2891 17.5281 12.6695 17.4458 13.0836ZM7.27652 15.2749C7.62755 15.5094 8.04026 15.6346 8.46245 15.6346C9.02859 15.6346 9.57153 15.4097 9.97185 15.0094C10.3722 14.6091 10.5971 14.0661 10.5971 13.5C10.5971 13.0778 10.4719 12.6651 10.2373 12.3141C10.0028 11.963 9.66938 11.6894 9.27933 11.5279C8.88928 11.3663 8.46008 11.324 8.04601 11.4064C7.63193 11.4888 7.25158 11.6921 6.95305 11.9906C6.65452 12.2891 6.45121 12.6695 6.36885 13.0836C6.28649 13.4976 6.32876 13.9268 6.49032 14.3169C6.65189 14.7069 6.92549 15.0403 7.27652 15.2749ZM12.815 15.2749C13.166 15.5094 13.5787 15.6346 14.0009 15.6346C14.567 15.6346 15.11 15.4097 15.5103 15.0094C15.9106 14.6091 16.1355 14.0661 16.1355 13.5C16.1355 13.0778 16.0103 12.6651 15.7758 12.3141C15.5412 11.963 15.2078 11.6894 14.8178 11.5279C14.4277 11.3663 13.9985 11.324 13.5845 11.4064C13.1704 11.4888 12.79 11.6921 12.4915 11.9906C12.193 12.2891 11.9897 12.6695 11.9073 13.0836C11.8249 13.4976 11.8672 13.9268 12.0288 14.3169C12.1903 14.7069 12.4639 15.0403 12.815 15.2749Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                  }
                                  modal={false}
                                  IsEnattent={IsEnattent}

                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    )

                    }
                    {/* <Grid container spacing="12px">
                      

                      {allGroupContainerUser
                        ?.filter((group) =>
                          `${group.groupe_name}`
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((group, index) => {
                          return (
                            <Grid
                              item
                              md={!openDrawer ? 3 : 4}
                              lg={!openDrawer ? 3 : 4}
                              key={index}
                            >
                              <BoxUserGroupe
                                image={
                                  group.image
                                    ? `${BaseURL}${group.image}`
                                    : userProfil
                                }
                                username={`${group.groupe_name}`}
                                link={`/etudiant/community/${group.id}`}
                                status={`${group.members.length} membres`}
                                description={`${group.description} `}
                                showStatut={true}
                                mark={
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                  >
                                    <path
                                      d="M4.28337 19.1784L4.19925 19.4743L3.21848 22.9243L3.21729 22.9285C3.16228 23.1178 3.15879 23.3183 3.20716 23.5094C3.25542 23.7 3.35354 23.8743 3.49143 24.0145C3.62789 24.1512 3.79871 24.2485 3.98588 24.2962C4.17361 24.344 4.37079 24.3401 4.55649 24.2849L4.56567 24.2822L4.56569 24.2822L8.02723 23.3015L8.32278 23.2177L8.59215 23.3654C10.0961 24.1897 11.7685 24.6592 13.4817 24.7381C15.1949 24.817 16.9034 24.5032 18.4767 23.8206C20.05 23.138 21.4465 22.1048 22.5593 20.7999C23.6721 19.495 24.4719 17.9529 24.8974 16.2915C25.323 14.6302 25.363 12.8935 25.0146 11.2143C24.6662 9.53508 23.9384 7.95775 22.887 6.60287C21.8356 5.24799 20.4883 4.15143 18.9482 3.397C17.408 2.64257 15.7158 2.25024 14.0009 2.25L4.28337 19.1784ZM4.28337 19.1784L4.13547 18.9087M4.28337 19.1784L4.13547 18.9087M4.13547 18.9087C3.19613 17.1955 2.71917 15.2672 2.75154 13.3136C2.78392 11.3601 3.32451 9.44862 4.32009 7.76748C5.31567 6.08634 6.73192 4.69348 8.42939 3.72601C10.1269 2.75856 12.047 2.24986 14.0008 2.25L4.13547 18.9087ZM17.4458 13.0836L18.1676 13.2271L17.4458 13.0836C17.3634 13.4976 17.4057 13.9268 17.5672 14.3169C17.7288 14.7069 18.0024 15.0403 18.3534 15.2749C18.7045 15.5094 19.1172 15.6346 19.5394 15.6346C20.1055 15.6346 20.6485 15.4097 21.0488 15.0094L20.5184 14.4791L21.0488 15.0094C21.4491 14.6091 21.674 14.0661 21.674 13.5C21.674 13.0778 21.5488 12.6651 21.3142 12.3141C21.0797 11.963 20.7463 11.6894 20.3563 11.5279C19.9662 11.3663 19.537 11.324 19.1229 11.4064C18.7089 11.4888 18.3285 11.6921 18.03 11.9906C17.7314 12.2891 17.5281 12.6695 17.4458 13.0836ZM7.27652 15.2749C7.62755 15.5094 8.04026 15.6346 8.46245 15.6346C9.02859 15.6346 9.57153 15.4097 9.97185 15.0094C10.3722 14.6091 10.5971 14.0661 10.5971 13.5C10.5971 13.0778 10.4719 12.6651 10.2373 12.3141C10.0028 11.963 9.66938 11.6894 9.27933 11.5279C8.88928 11.3663 8.46008 11.324 8.04601 11.4064C7.63193 11.4888 7.25158 11.6921 6.95305 11.9906C6.65452 12.2891 6.45121 12.6695 6.36885 13.0836C6.28649 13.4976 6.32876 13.9268 6.49032 14.3169C6.65189 14.7069 6.92549 15.0403 7.27652 15.2749ZM12.815 15.2749C13.166 15.5094 13.5787 15.6346 14.0009 15.6346C14.567 15.6346 15.11 15.4097 15.5103 15.0094C15.9106 14.6091 16.1355 14.0661 16.1355 13.5C16.1355 13.0778 16.0103 12.6651 15.7758 12.3141C15.5412 11.963 15.2078 11.6894 14.8178 11.5279C14.4277 11.3663 13.9985 11.324 13.5845 11.4064C13.1704 11.4888 12.79 11.6921 12.4915 11.9906C12.193 12.2891 11.9897 12.6695 11.9073 13.0836C11.8249 13.4976 11.8672 13.9268 12.0288 14.3169C12.1903 14.7069 12.4639 15.0403 12.815 15.2749Z"
                                      stroke="black"
                                      strokeWidth="1.5"
                                    />
                                  </svg>
                                }
                                modal={false}
                              />
                            </Grid>
                          );
                        })}
                    </Grid> */}
                  </div>
                </Stack>
              </div>
              <div className="community-suggestion">
                <Stack direction="column" spacing="24px">
                  <p>Suggestions</p>
                  <Grid direction='row' spacing='8px' sx={{ width: '100%' }} container>
                    {newAllGroup?.filter((group) =>
                      `${group.groupe_name}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                      .map((group, index) => {
                        return (
                          <Grid key={index} item md={!openDrawer ? 3 : 4} lg={!openDrawer ? 3 : 4}
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                          >
                            <BoxUserGroupe
                              image={
                                group.image
                                  ? `${BaseURL}${group.image}`
                                  : userProfil
                              }
                              username={`${group.groupe_name}`.slice(0, 14)}
                              status={`${group.members.length} membres`}
                              description={`${group.description}`}
                              showStatut={false}
                              mark={<AddIcon sx={{ color: "#000" }} />}
                              backgroundColor="#b2bec3"
                              modal={true}
                              group_id={group.id}
                              maxwidth='100%'
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Stack>
              </div>
            </Stack>
          </div>
        </LayoutEtudiant>
      )}
    </>
  );
}
