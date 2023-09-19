import React, { useState, useEffect } from 'react';
import LayoutProfilPro from '../Layout/LayoutProfilPro';
import { Grid } from '@mui/material';
import './style/HighlightPro.scss'
import { useSelector, useDispatch } from 'react-redux';
import { GET_ALL_FOCUS_LIST, GET_FOCUS_FOLLOW_PROF } from '../../Reducers/ReducerFocus';
import { useCookies } from "react-cookie";
import { getAllFocusAction, get_followed_prof_focusesAction } from '../../Actions/ActionFocus';
import { GET_USER_INFO_CONNECT } from '../../Reducers/ReducerUser';
import { getIdUserAction, getUserInfoAction } from '../../Actions/actionAuth';
import CardFocus from '../components/CardFocus';
import './style/FocusMurEtudiant.scss'

export default function FocusMurEtudiant() {
    const focusListFollow = useSelector(GET_FOCUS_FOLLOW_PROF)
    const focus_list = useSelector(GET_ALL_FOCUS_LIST)
    const dispatch = useDispatch()

    const user = useSelector(GET_USER_INFO_CONNECT);
    const [cookies] = useCookies(['access_token', 'refresh_token']);

    useEffect(() => {
        return async () => {
            if (cookies.access_token) {
                // get user id
                const decodeToken = await dispatch(getIdUserAction({ token: cookies.access_token }))
                if (decodeToken.token_type === "access") {
                    await dispatch(getUserInfoAction(decodeToken.user_id))
                }
            }
        }
    }, [dispatch, cookies.access_token])

    useEffect(() => {
        return async () => {
            await dispatch(getAllFocusAction())
            if(!!user.id){
                await dispatch(get_followed_prof_focusesAction(user.id))
            }
        }
    }, [dispatch, user])


    return (
        <LayoutProfilPro>
            <div className='focusMurEtudiant'>
                <Grid container spacing={2}>
                    {focusListFollow[0] !== undefined ? focusListFollow.map((focus, index) => {
                        return (
                            <Grid key={index} item>
                                <CardFocus focus={focus} />
                            </Grid>
                        )
                    }) :
                    focus_list.map((focus, index) => {
                        return (
                            <Grid key={index} item>
                                <CardFocus focus={focus} />
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </div>
        </LayoutProfilPro>
    );
}