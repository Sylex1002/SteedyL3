import React, { useContext, useState } from 'react';
import './styles/ViewFocusOnSerie.scss';
import PropTypes from "prop-types";
import { Grid, Stack } from '@mui/material';
import EmptyFocus from '../../Assets/wired-outline-21-avatar.gif';
import CardFocusOnSerie from './CardFocusOnSerie';
import { verificationCloudinaryHighlight } from '../../Helpers/ServiceApi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function ViewFocusOnSerie({ setOpenView, getFocus, id, titreSerie, descriptionSerie }) {
    const [playActive, setPlayActive] = useState(false);
    const navigate = useNavigate();
    // Context
    const { setSerieFocus } = useContext(AppContext);

    return (
        <div className='ViewFocusOnSerie'>
            <div className='all-content'>
                <div className='content-focus'>
                    <div className='header-content'>
                        <div className='title' onClick={() => setOpenView(false)}>
                            <Stack direction='row' spacing='12px' style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                <div className='back-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 7 12" fill="none">
                                        <path d="M1.125 1.5L5.625 6L1.125 10.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p>{titreSerie}</p>
                            </Stack>
                        </div>
                        <div className='search-content'>
                            <Stack direction='row' spacing='24px'>
                                <div className='search-box'>
                                    <div className='search-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 25" fill="none">
                                            <path d="M21.7495 21.1895L16.0855 15.5255C17.4466 13.8915 18.1253 11.7957 17.9805 9.67395C17.8356 7.55225 16.8784 5.56807 15.3079 4.13416C13.7374 2.70026 11.6745 1.92703 9.54844 1.97534C7.42236 2.02365 5.39674 2.88977 3.89298 4.39353C2.38922 5.89729 1.5231 7.92291 1.47479 10.049C1.42648 12.1751 2.19971 14.2379 3.63361 15.8085C5.06752 17.379 7.0517 18.3362 9.1734 18.481C11.2951 18.6259 13.391 17.9471 15.025 16.586L20.689 22.25L21.7495 21.1895ZM2.99948 10.25C2.99948 8.915 3.39536 7.60996 4.13706 6.49993C4.87876 5.38989 5.93296 4.52473 7.16636 4.01384C8.39976 3.50295 9.75696 3.36927 11.0663 3.62973C12.3757 3.89018 13.5784 4.53305 14.5224 5.47706C15.4665 6.42106 16.1093 7.62379 16.3698 8.93317C16.6302 10.2425 16.4966 11.5997 15.9857 12.8331C15.4748 14.0665 14.6096 15.1207 13.4996 15.8624C12.3895 16.6041 11.0845 17 9.74948 17C7.95987 16.998 6.24414 16.2862 4.9787 15.0208C3.71326 13.7554 3.00146 12.0396 2.99948 10.25Z" fill="#FFF" />
                                        </svg>
                                    </div>
                                    <input type='text' placeholder='Rechercher un focus' />
                                </div>
                                <div className='create-focus' onClick={() => {
                                    setSerieFocus(id);
                                    navigate('/professionnel/creation-focus');
                                    }}>
                                    <div className='btn-create'>
                                        <Stack direction='row'>
                                            <div className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 40 41" fill="none">
                                                    <path d="M20 40.5C19.1905 40.5 18.5114 40.2257 17.9629 39.6771C17.4143 39.1286 17.141 38.4505 17.1429 37.6428V23.3571H2.85715C2.04763 23.3571 1.36858 23.0829 0.82001 22.5343C0.271439 21.9857 -0.00189487 21.3076 9.88628e-06 20.5C9.88628e-06 19.6905 0.274296 19.0114 0.822867 18.4629C1.37144 17.9143 2.04953 17.641 2.85715 17.6429H17.1429V3.35715C17.1429 2.54763 17.4171 1.86858 17.9657 1.32001C18.5143 0.771439 19.1924 0.498105 20 0.50001C20.8095 0.50001 21.4886 0.774296 22.0371 1.32287C22.5857 1.87144 22.859 2.54953 22.8571 3.35715V17.6429H37.1428C37.9524 17.6429 38.6314 17.9171 39.18 18.4657C39.7286 19.0143 40.0019 19.6924 40 20.5C40 21.3095 39.7257 21.9886 39.1771 22.5371C38.6286 23.0857 37.9505 23.359 37.1428 23.3571H22.8571V37.6428C22.8571 38.4524 22.5829 39.1314 22.0343 39.68C21.4857 40.2286 20.8076 40.5019 20 40.5Z" fill="white" />
                                                </svg>
                                            </div>
                                            <div className='text'>
                                                <p>Ajouter un focus</p>
                                            </div>
                                        </Stack>
                                    </div>
                                </div>
                            </Stack>
                        </div>
                    </div>
                    <div className='description-serie'>
                        <p>{descriptionSerie}</p>
                    </div>
                    <div className='list-focus'>
                        {getFocus.length !== 0 ?
                            <Grid container spacing='24px'>
                                {getFocus.map((focus, index) => {
                                    return (
                                        <Grid item md={3} key={index}>
                                            <CardFocusOnSerie
                                                img={verificationCloudinaryHighlight('/' + focus.bg)}
                                                title={focus.titre}
                                                focus={focus}
                                                playActive={playActive}
                                                setPlayActive={setPlayActive}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            :
                            <div className='serie-none'>
                                <div className='msg-empty'>
                                    <div className='icon'>
                                        <img src={EmptyFocus} alt='...' width='150px' height='150px' />
                                    </div>
                                    <div className='message'>
                                        <p>Pas de focus dans cette série</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewFocusOnSerie.propTypes = {
    setOpenView: PropTypes.func.isRequired,
    getFocus: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    titreSerie: PropTypes.string.isRequired,
    descriptionSerie: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    focus: PropTypes.element.isRequired,
};