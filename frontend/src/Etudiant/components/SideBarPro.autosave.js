import React, { useEffect } from 'react';
import './style/SideBarPro.scss'
import { Grid, Stack, Skeleton } from '@mui/material';
import userProfil from '../../Images/paysage.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_INFO_CONNECT } from '../../Reducers/ReducerUser';
import { useCookies } from "react-cookie";
import { getIdUserAction, getUserInfoAction } from '../../Actions/actionAuth';
import { dataParser } from '../../Helpers/Utils';

export default function SideBarPro() {

const dispatch = useDispatch()
  const user = useSelector(GET_USER_INFO_CONNECT);
  const [cookies] = useCookies(['access_token', 'refresh_token']);

  console.log(user)

  // user information
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

  return (
    <div className='sideBarPro'>
      <div className='biographie'>
        <div className='title'>
          <p>Biographie</p>
        </div>
        <div className='paragraphe'>
          <p>{!!user.bio ?
            user.bio
            :
            <Skeleton variant='rounded' animation='wave' width='100px' height='8px' />
          }
          </p>
        </div>
      </div>

      <div className='informations'>
        <div className='title'>
          <p>Informations</p>
        </div>
        <Stack direction='column' spacing={1} sx={{ mt: 2, fontSize: 12 }}>
          <div className='fonction'>
            <p>{!!user.bio && !!user.first_name && !!user.last_name ? 
                !!user.domain ? user.domain : 'Pas de domaine'
              : 
              <Skeleton variant='rounded' animation='wave' width='100px' height='8px' />
              }
            </p>
          </div>

          <div className='member'>
            <p>{!!user.createdAt ? `Membre depuis ${dataParser(user.createdAt)}` : <Skeleton variant='rounded' animation='wave' width='150px' height='8px' />}</p>
          </div>

          <div className='network'>
            <p>{user.email}</p>
          </div>
        </Stack>
      </div>
    </div>
  );
}
