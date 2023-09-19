import React, { useEffect, useState } from 'react';
import './styles/MySerieFocus.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACTIVE_ALL_SERIE_FOCUS_PROF, GET_ALL_SERIE_FOCUS_PROF_LIST } from '../../Reducers/ReduceSerieFocus';
import { deleteSerieAction, getAllFocusSerieProfAction } from '../../Actions/ActionSerieFocus';
import { GET_ONE_PROF } from '../../Reducers/ReduceProfesssionnel';
import { Dialog, DialogContent, Grid, Slide, Stack, Tooltip } from '@mui/material';
import UpdateSerieFocus from './UpdateSerieFocus';
import TrashGif from '../../Assets/system-solid-39-trash.gif';
import { motion } from 'framer-motion';
import ViewFocusOnSerie from './ViewFocusOnSerie';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function MySerieFocus() {
    // View focus
    const [openView, setOpenView] = useState(false);

    // Open update serie
    const [openModif, setOpenModif] = useState(false);

    // Open delete serie
    const [openSup, setOpenSup] = useState(false);

    // Get Focus
    const [getFocus, setGetFocus] = useState([]);

    const [loading, setLoading] = useState(false);

    // About serie clicked
    const [idSerie, setIdSerie] = useState('');
    const [titreSerie, setTitreSerie] = useState('');
    const [descriptionSerie, setDescriptionSerie] = useState('');

    const getMySerie = useSelector(GET_ALL_SERIE_FOCUS_PROF_LIST);
    const allserieActive = useSelector(GET_ACTIVE_ALL_SERIE_FOCUS_PROF);
    const dispatch = useDispatch();
    const profId = useSelector(GET_ONE_PROF);


    useEffect(() => {
        if (!allserieActive) {
            if (profId.id !== undefined) {
                dispatch(getAllFocusSerieProfAction(profId.id));
            }
        }
    }, [dispatch, profId]);

    // Fonction pour supprimer série
    const deleteSerie = async (e) => {
        e.preventDefault();
        setLoading(true);
        const deleted = await dispatch(deleteSerieAction(idSerie));
        const getSerie = await dispatch(getAllFocusSerieProfAction(profId.id));
        if (getSerie) {
            setLoading(false);
            setOpenSup(false);
        }
        return deleted;
    };

    // Modal confirmation suppression serie
    const ConfirmDelete = () => {
        return (
            <div className='delete-serie-modal'>
                {!loading ?
                    <>
                        <div className='titre'>
                            <p>Suppression série</p>
                        </div>
                        <div className='question'>
                            <p>Etes-vous sur de vouloir supprimer cette série?</p>
                            <p style={{ color: 'var(--bg)' }}>{titreSerie}</p>
                        </div>
                        <div className='actions'>
                            <div className='btn cancel' onClick={() => setOpenSup(false)}>
                                <p>Annuler</p>
                            </div>
                            <div className='btn accepted' onClick={deleteSerie}>
                                <Stack direction='row' spacing='8px' style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 58 58" fill="none">
                                        <path d="M23.7148 24.1431H26.1434V38.7145H23.7148V24.1431ZM31.0006 24.1431H33.4291V38.7145H31.0006V24.1431Z" fill="#FFF" />
                                        <path d="M14 16.8571V19.2857H16.4286V43.5714C16.4286 44.2155 16.6844 44.8332 17.1399 45.2887C17.5953 45.7441 18.213 46 18.8571 46H38.2857C38.9298 46 39.5475 45.7441 40.003 45.2887C40.4584 44.8332 40.7143 44.2155 40.7143 43.5714V19.2857H43.1429V16.8571H14ZM18.8571 43.5714V19.2857H38.2857V43.5714H18.8571ZM23.7143 12H33.4286V14.4286H23.7143V12Z" fill="#FFF" />
                                    </svg>
                                    <p>Supprimer</p>
                                </Stack>
                            </div>
                        </div>
                    </>
                    :
                    <motion.div initial={{ translateY: '-100px' }} animate={{ translateY: 0 }} exit={{ translateY: '-80px' }} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack direction='column' spacing='24px'>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={TrashGif} alt='trash' width='70px' height='70px' />
                            </div>
                            <p style={{ color: '#e74c3c' }}>Suppression de la série...</p>
                        </Stack>
                    </motion.div>
                }
            </div>
        );
    };

    return (
        <div className='MySerieFocus'>
            <div className='list-serie-content'>
                <div className='title'>
                    <p>Mes séries</p>
                </div>
                <Grid container className='series-content' spacing='12px'>
                    {getMySerie.map((serie, index) => {
                        return (
                            <Grid item md={3} key={index} className='serie-box'>
                                <div className='serie'>
                                    <div className='image'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 64 65" fill="none">
                                            <path d="M56 16.5H8M56 27.1667H8M29.3333 37.8333H8M29.3333 48.5H8" stroke="var(--bg)" strokeWidth="4" strokeLinecap="round" />
                                            <path d="M50.332 38.148C54.7427 40.6947 56.9454 41.9693 57.2707 43.804C57.3517 44.2636 57.3517 44.7338 57.2707 45.1933C56.948 47.0333 54.7427 48.3053 50.332 50.8493C45.9214 53.396 43.7187 54.6707 41.964 54.0333C41.5256 53.8733 41.1185 53.6378 40.7614 53.3373C39.332 52.1373 39.332 49.5933 39.332 44.5C39.332 39.4067 39.332 36.86 40.7614 35.6627C41.1188 35.3632 41.5258 35.1286 41.964 34.9693C43.716 34.3293 45.9214 35.604 50.332 38.148Z" stroke="var(--bg1)" strokeWidth="4" />
                                        </svg>
                                    </div>
                                    <div className='serie-titre'>
                                        <p>{serie.titre}</p>
                                    </div>
                                    <div className='actions'>
                                        <Tooltip title="Voir les focus" placement="bottom">
                                            <div className='btn-action' onClick={() => {
                                                setOpenView(true);
                                                setIdSerie(serie.id);
                                                setTitreSerie(serie.titre);
                                                setDescriptionSerie(serie.description);
                                                setGetFocus(serie.focuses);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 58 58" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M29.0005 22.907C27.4277 22.907 25.9194 23.5318 24.8072 24.6439C23.6951 25.756 23.0703 27.2644 23.0703 28.8372C23.0703 30.41 23.6951 31.9184 24.8072 33.0305C25.9194 34.1427 27.4277 34.7674 29.0005 34.7674C30.5733 34.7674 32.0817 34.1427 33.1939 33.0305C34.306 31.9184 34.9308 30.41 34.9308 28.8372C34.9308 27.2644 34.306 25.756 33.1939 24.6439C32.0817 23.5318 30.5733 22.907 29.0005 22.907ZM25.4424 28.8372C25.4424 27.8935 25.8173 26.9885 26.4846 26.3212C27.1518 25.6539 28.0569 25.2791 29.0005 25.2791C29.9442 25.2791 30.8492 25.6539 31.5165 26.3212C32.1838 26.9885 32.5587 27.8935 32.5587 28.8372C32.5587 29.7809 32.1838 30.6859 31.5165 31.3532C30.8492 32.0205 29.9442 32.3954 29.0005 32.3954C28.0569 32.3954 27.1518 32.0205 26.4846 31.3532C25.8173 30.6859 25.4424 29.7809 25.4424 28.8372Z" fill="black" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M29 15C21.8616 15 17.0526 19.2761 14.2614 22.9022L14.2124 22.9671C13.5798 23.7878 12.9994 24.5421 12.6057 25.434C12.1834 26.3908 12 27.4329 12 28.8372C12 30.2415 12.1834 31.2836 12.6057 32.2404C13.001 33.1323 13.5814 33.8882 14.2124 34.7073L14.263 34.7722C17.0526 38.3983 21.8616 42.6744 29 42.6744C36.1384 42.6744 40.9474 38.3983 43.7386 34.7722L43.7876 34.7073C44.4202 33.8882 45.0006 33.1323 45.3943 32.2404C45.8166 31.2836 46 30.2415 46 28.8372C46 27.4329 45.8166 26.3908 45.3943 25.434C44.999 24.5421 44.4186 23.7878 43.7876 22.9671L43.737 22.9022C40.9474 19.2761 36.1384 15 29 15ZM16.1433 24.3492C18.7178 21.0014 22.9116 17.3721 29 17.3721C35.0884 17.3721 39.2807 21.0014 41.8567 24.3492C42.5526 25.2506 42.9574 25.7883 43.2247 26.3924C43.4745 26.9585 43.6279 27.6496 43.6279 28.8372C43.6279 30.0248 43.4745 30.7159 43.2247 31.282C42.9574 31.8861 42.551 32.4238 41.8583 33.3252C39.2791 36.673 35.0884 40.3023 29 40.3023C22.9116 40.3023 18.7193 36.673 16.1433 33.3252C15.4474 32.4238 15.0426 31.8861 14.7753 31.282C14.5255 30.7159 14.3721 30.0248 14.3721 28.8372C14.3721 27.6496 14.5255 26.9585 14.7753 26.3924C15.0426 25.7883 15.4506 25.2506 16.1433 24.3492Z" fill="black" />
                                                </svg>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Modifier la série" placement="bottom">
                                            <div className='btn-action' onClick={() => {
                                                setOpenModif(true);
                                                setIdSerie(serie.id);
                                                setTitreSerie(serie.titre);
                                                setDescriptionSerie(serie.description);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 34 34" fill="none">
                                                    <path d="M32.2166 1.78137C31.076 0.640777 29.529 0 27.9159 0C26.3029 0 24.7559 0.640777 23.6152 1.78137L3.29836 22.0983C2.60786 22.7888 2.1224 23.6573 1.89596 24.6073L0.0346019 32.4301C-0.0157966 32.642 -0.0110714 32.8632 0.0483271 33.0728C0.107726 33.2823 0.219817 33.4732 0.37391 33.6271C0.528004 33.781 0.718961 33.8929 0.928571 33.9521C1.13818 34.0112 1.35945 34.0157 1.57129 33.9651L9.3924 32.102C10.3429 31.8759 11.2121 31.3904 11.9031 30.6996L32.2166 10.3861C33.3572 9.24551 33.998 7.69851 33.998 6.08545C33.998 4.47239 33.3572 2.92539 32.2166 1.78477V1.78137ZM25.4171 3.58324C25.7453 3.25509 26.1348 2.99479 26.5636 2.81719C26.9923 2.6396 27.4518 2.54819 27.9159 2.54819C28.38 2.54819 28.8395 2.6396 29.2683 2.81719C29.697 2.99479 30.0866 3.25509 30.4147 3.58324C30.7429 3.91139 31.0032 4.30096 31.1808 4.7297C31.3584 5.15845 31.4498 5.61798 31.4498 6.08205C31.4498 6.54612 31.3584 7.00565 31.1808 7.4344C31.0032 7.86315 30.7429 8.25272 30.4147 8.58086L28.8984 10.0955L23.9008 5.09952L25.4171 3.58494V3.58324ZM22.099 6.90479L27.0966 11.899L10.0979 28.8977C9.74088 29.2547 9.29211 29.5046 8.80085 29.6219L2.99408 31.0056L4.37608 25.1988C4.49337 24.7059 4.74495 24.2571 5.10192 23.9001L22.099 6.90139V6.90479Z" fill="#7f8c8d" />
                                                </svg>
                                            </div>
                                        </Tooltip>

                                        <Tooltip title="Supprimer la série" placement="bottom">
                                            <div className='btn-action'
                                                onClick={() => {
                                                    setOpenSup(true);
                                                    setIdSerie(serie.id);
                                                    setTitreSerie(serie.titre);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 58 58" fill="none">
                                                    <path d="M23.7148 24.1428H26.1434V38.7143H23.7148V24.1428ZM31.0006 24.1428H33.4291V38.7143H31.0006V24.1428Z" fill="#e74c3c" />
                                                    <path d="M14 16.8571V19.2857H16.4286V43.5714C16.4286 44.2155 16.6844 44.8332 17.1399 45.2887C17.5953 45.7441 18.213 46 18.8571 46H38.2857C38.9298 46 39.5475 45.7441 40.003 45.2887C40.4584 44.8332 40.7143 44.2155 40.7143 43.5714V19.2857H43.1429V16.8571H14ZM18.8571 43.5714V19.2857H38.2857V43.5714H18.8571ZM23.7143 12H33.4286V14.4286H23.7143V12Z" fill="#e74c3c" />
                                                </svg>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Grid>
                        );
                    })}
                    {/* Voir les focus du serie */}
                    {openView &&
                        <ViewFocusOnSerie
                            setOpenView={setOpenView}
                            getFocus={getFocus}
                            id={idSerie}
                            titreSerie={titreSerie}
                            descriptionSerie={descriptionSerie}
                        />
                    }

                    {/* Modal Modifier */}
                    <Dialog
                        open={openModif}
                        onClose={() => setOpenModif(false)}
                        aria-describedby="alert-dialog-description"
                        TransitionComponent={Transition}
                        keepMounted
                    >
                        <DialogContent>
                            {openModif &&
                                <UpdateSerieFocus
                                    idSerie={idSerie}
                                    titreSerie={titreSerie}
                                    descriptionSerie={descriptionSerie}
                                    setOpenModif={setOpenModif}
                                />
                            }
                        </DialogContent>
                    </Dialog>

                    {/* Modal Suppression */}
                    <Dialog
                        open={openSup}
                        onClose={() => setOpenSup(false)}
                        aria-describedby="alert-dialog-description"
                        TransitionComponent={Transition}
                        keepMounted
                    >
                        <DialogContent>
                            {openSup &&
                                <ConfirmDelete />
                            }
                        </DialogContent>
                    </Dialog>
                </Grid>
            </div>
        </div>
    );
}