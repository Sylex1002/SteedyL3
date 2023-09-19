import React, { useEffect } from "react";
import HeaderBlock from "../components/HeaderBlock";
import CardFocus from "../components/CardFocus";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/ViewAllFocusPro.scss";
import PropTypes from "prop-types";
import { getOneSerieAction } from "../../Actions/ActionSerieFocus";
import { GET_ONE_INFO_SERIE, GET_ONE_INFO_SERIE_ACTIVE } from "../../Reducers/ReduceSerieFocus";
import { Stack } from "@mui/material";
import None from '../../Assets/wired-outline-21-avatar.gif';

const FocustNone = () => (
  <div id="FocustNone">
    <div className="FocustNone_container">
      <div className="FocustNone_title">
        <Stack direction='column' spacing='12px' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img src={None} alt='steedy-gif' />
          <p>Pas de focus</p>
        </Stack>
      </div>
    </div>
  </div>
);

const FocusList = ({ focus_list }) => (
  <div className="Focus_content">
    {focus_list.map((focus, index) => (
      <CardFocus focus={focus} key={index} maximWidth={"285px"} />
    ))}
  </div>
);

FocusList.propTypes = {
  focus_list: PropTypes.array.isRequired,
};

export default function ViewAllFocusPro() {
  const { serie } = useMatch("etudiant/createur/:id/:serie").params;
  const dispatch = useDispatch();

  const getSerie = useSelector(GET_ONE_INFO_SERIE);
  const serieActive = useSelector(GET_ONE_INFO_SERIE_ACTIVE);

  // get all focus
  useEffect(() => {
    if (!serieActive) {
      dispatch(getOneSerieAction(serie));
    }
  }, [serieActive, dispatch]);

  // const Chargement = () => {
  //   return (
  //     <div className='loader'>
  //       <div className="orbit"></div>
  //     </div>
  //   );
  // };

  const ShowFocusList = () => {
    if (getSerie?.focuses?.length > 0) {
      return (<FocusList focus_list={getSerie.focuses} />);
    } else {
      return (<FocustNone />);
    }
  };

  return (
    <div className="viewAllFocusPro">
      <div style={{ height: "100vh" }}>
        <Stack direction='column' spacing='12px'>
          <HeaderBlock />
          <div className="title">
            <p>{getSerie?.titre}</p>
          </div>
          <div id="listFocus">
            {ShowFocusList()}
          </div>
        </Stack>
      </div>
    </div>
  );
}
