import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { apiBack } from '../../Helpers/ServiceApi';
import { GET_USER_INFO_CONNECT } from '../../Reducers/ReducerUser';
import { useSelector } from 'react-redux';
import CommunityBox from './CommunityBox';
import "./style/sideBarRight.scss"
import Tags from './Tags';

export default function SideBarRight() {
    const user = useSelector(GET_USER_INFO_CONNECT);

    return (
        <div className='sideBarRight' id="sideBarRight">
            <div className="sideBarRight_profil_content">
                <div className="sideBarRight_profil_bg">
                    <div className="sideBarRight_profil_couvertur" style={{ background: `url(${apiBack + user.image_url})` }}></div>
                    <div className="sideBarRight_profil_img">
                        {
                            user.image_url ? (
                                <img className="sideBarRight_img" src={apiBack + user.image_url} alt='...' width='100%' height='100%' />
                            ) : (
                                <Skeleton className="sideBarRight_img" animation='wave' variant="rounded" width={50} height={50} />
                            )
                        }
                    </div>
                    <div className="sideBarRight_profil_bottom"></div>
                </div>
                <div className="sideBarRight_profil_info">
                    <p>{user.first_name ? <p>{user.first_name} {user.last_name}</p> : <p style={{ display: 'flex', justifyContent: 'center' }}><Skeleton variant="rounded" width={100} height={15} /></p>}</p>
                    <span>{user.fonction}</span>
                </div>
                <div className="sideBarRight_profil_dec">
                    {user.bio ? (<p>{user.bio}</p>) : (<p style={{ display: 'flex', justifyContent: 'center' }}><Skeleton variant="rounded" width={100} height={5} /></p>)}
                </div>

                <div className='divider'></div>

                <div className="sideBarRight_profil_btn">
                    <Link className='profil_btn' to="/etudiant//publication/">
                        Mon profil
                    </Link>
                </div>
            </div>
            <CommunityBox />
            <Tags />
            {/* <CommunityBox /> */}
        </div>
    );
}