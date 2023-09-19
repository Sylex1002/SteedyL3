import React, { useContext, useEffect } from "react";
import "./styles/ListOtherCreateurs.scss";
import { Stack } from "@mui/material";
import {
  GET_ALL_PROF_LIST,
  GET_ALL_PROF_LIST_ACTIVE,
} from "../../Reducers/ReduceProfesssionnel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfAction } from "../../Actions/ActionProf";
import { BaseURL } from "../../Helpers/ServiceApi";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function ListOtherCreateurs({
  searchInput,
  prof_searchData,
  handleFollowProf,
}) {
  const { Uuid } = useContext(AppContext);

  const professionnelData_active = useSelector(GET_ALL_PROF_LIST_ACTIVE);
  const professionnelData = useSelector(GET_ALL_PROF_LIST).filter((item) =>
    item.user?.first_name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (professionnelData_active === false) {
      // get all prof
      dispatch(getAllProfAction());
    }
  }, [professionnelData_active, dispatch]);

  const Card = ({ prof }) => {
    const listFollow = prof.followers.filter((item) => item.id === Uuid);
    const handleNaviageta = () => {
      navigate(`/professionnel/createur/${prof.id}/`);
    };

    return (
      <div className="card">
        <div className="info">
          <Stack direction="row" spacing="12px">
            <div className="profil">
              <img
                onClick={handleNaviageta}
                src={`${BaseURL}${prof.user.image_url}`}
                alt="steedy"
              />
            </div>
            <div className="bio">
              <Stack direction="column" spacing="4px">
                <div className="pseudo">
                  <p>
                    {prof.user.first_name} {prof.user.last_name}
                  </p>
                </div>
                <div className="pro">
                  <Stack direction="row" spacing="6px">
                    <p>{prof.user.domain}</p>
                    <p>.</p>
                    {prof.followers.length > 1 ? (
                      <p>{prof.followers.length} followers</p>
                    ) : (
                      <p>{prof.followers.length} follower</p>
                    )}
                  </Stack>
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
        <div className="btn-follow">
          {listFollow.length === 0 && (
            <button
              onClick={() => {
                handleFollowProf(prof);
              }}
            >
              Suivre
            </button>
          )}
        </div>
      </div>
    );
  };

  Card.propTypes = {
    prof: PropTypes.object.isRequired,
  };

  return (
    <div className="box-other-createur">
      <Stack direction="column" spacing="12px">
        {prof_searchData.length > 0 ? (
          prof_searchData.map((prof, index) => <Card key={index} prof={prof} />)
        ) : (
          <>
            {professionnelData.length > 0 &&
              professionnelData.map((prof, index) => (
                <Card key={index} prof={prof} />
              ))}
          </>
        )}
      </Stack>
    </div>
  );
}

ListOtherCreateurs.propTypes = {
  searchInput: PropTypes.string.isRequired,
  prof_searchData: PropTypes.array.isRequired,
  handleFollowProf: PropTypes.func.isRequired,
};
