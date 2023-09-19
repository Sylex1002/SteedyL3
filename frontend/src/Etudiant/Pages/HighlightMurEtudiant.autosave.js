import React, { useState, useEffect } from 'react';
import LayoutProfilPro from '../Layout/LayoutProfilPro';
import userProfil from '../../Images/paysage.jpg'
import image1 from '../../Images/pexels-jéshoots-4831.jpg'
import image2 from '../../Images/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg'
import image3 from '../../Images/bg.jpg'
import CardHighlightPro from '../components/CardHighlightPro';
import { Grid } from '@mui/material';
import './style/HighlightPro.scss'
import { GET_ALL_HIGHLIGHT_LIST } from '../../Reducers/ReducerHighlight';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHighlightAction } from '../../Actions/ActionHighlight';

export default function HighlightMurEtudiant() {
  const highlightList = useSelector(GET_ALL_HIGHLIGHT_LIST)
  const dispatch = useDispatch()

  useEffect(() => {
    return async () => {
      await dispatch(getAllHighlightAction())
    }
  }, [])
  
  return (
    <LayoutProfilPro>
      <div className='title'>
        <p>Highlight</p>
      </div>
      <div className='highlightPro'>
        {highlightList.map((highlight,index) => {
          return (
            <CardHighlightPro key={index} highlight={highlight} />
          )
        })}


      </div>
    </LayoutProfilPro>
  );
}