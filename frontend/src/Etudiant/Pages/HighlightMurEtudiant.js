import React, { useState, useEffect, useContext } from 'react';
import LayoutProfilPro from '../Layout/LayoutProfilPro';
import CardHighlightPro from '../components/CardHighlightPro';
import { Grid } from '@mui/material';
import './style/HighlightPro.scss'
import { GET_ALL_HIGHLIGHT_LIST } from '../../Reducers/ReducerHighlight';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHighlightAction } from '../../Actions/ActionHighlight';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function HighlightMurEtudiant() {
  const highlightList = useSelector(GET_ALL_HIGHLIGHT_LIST)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { setInitialSliding } = useContext(AppContext)

  useEffect(() => {
    return async () => {
      await dispatch(getAllHighlightAction())
    }
  }, [])
  
  return (
    <LayoutProfilPro>
      {/* <div className='title'>
        <p>Highlight</p>
      </div> */}
      <div className='highlightPro'>
        <Grid container spacing={2}>
          {highlightList.map((highlight,index) => {
            return (
              <Grid item md={3}>
                <CardHighlightPro key={index} highlight={highlight} clicked={() => {setInitialSliding(index); navigate(`/etudiant/Highlights/${highlight.id}`)}} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </LayoutProfilPro>
  );
}