import React from "react";
import { useSelector } from "react-redux";
import { Stack, Skeleton } from "@mui/material";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import cardIcon from "../../Images/icons/credit-card.svg";
import bagIcon from "../../Images/icons/briefcase.svg";
import mailIcon from "../../Images/icons/mail.svg";
import { dataParser } from "../../Helpers/Utils";
import "./style/SideBarPro.scss";

export default function SideBarPro() {
  const user = useSelector(GET_USER_INFO_CONNECT);

  return (
    <div className="sideBarPro">
      <div className="biographie">
        <div className="title">
          <p>Biographie</p>
        </div>
        <div className="paragraphe">
          <p>
            {user.bio ? (
              user.bio
            ) : (
              <Skeleton
                variant="rounded"
                animation="wave"
                width="100px"
                height="8px"
              />
            )}
          </p>
        </div>
      </div>

      <div className="informations">
        <div className="title">
          <p>Informations</p>
        </div>
        <Stack direction="column" spacing={1} sx={{ mt: 2, fontSize: 12 }}>
          <div className="fonction">
            <p>
              {!!user.bio && !!user.first_name && !!user.last_name ? (
                user.domain ? (
                  <Stack direction="row" spacing={1}>
                    <img src={bagIcon} alt="..." width="17px" height="17px" />
                    <p style={{ marginTop: "2px" }}> {user.domain}</p>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <img src={bagIcon} alt="..." width="17px" height="17px" />
                    <p>Pas de domaine</p>
                  </Stack>
                )
              ) : (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width="100px"
                  height="8px"
                />
              )}
            </p>
          </div>

          <div className="member">
            <p>
              {user.createdAt ? (
                <Stack direction="row" spacing={1}>
                  <img src={cardIcon} alt="..." width="17px" height="17px" />
                  <p style={{ marginTop: "2px" }}>{`Membre depuis ${dataParser(
                    user.createdAt
                  )}`}</p>
                </Stack>
              ) : (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width="150px"
                  height="8px"
                />
              )}
            </p>
          </div>

          <div className="network">
            <p>
              {user.email ? (
                <Stack direction="row" spacing={1}>
                  <img src={mailIcon} alt="..." width="17px" height="17px" />
                  <p style={{ marginTop: "1px" }}>{user.email}</p>
                </Stack>
              ) : (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width="180px"
                  height="8px"
                />
              )}
            </p>
          </div>
        </Stack>
      </div>
    </div>
  );
}
