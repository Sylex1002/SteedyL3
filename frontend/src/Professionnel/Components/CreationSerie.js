import React, { useContext, useEffect, useState } from 'react';
import './styles/CreationSerie.scss';
import { Stack } from '@mui/material';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { GET_ONE_PROF } from '../../Reducers/ReduceProfesssionnel';
import { createFocusAction, getAllFocusSerieProfAction } from '../../Actions/ActionSerieFocus';
import { useNavigate } from 'react-router-dom';
import { GET_ACTIVE_ALL_SERIE_FOCUS_PROF, GET_ALL_SERIE_FOCUS_PROF_LIST } from '../../Reducers/ReduceSerieFocus';
import { AppContext } from '../../Context/AppContext';

export default function CreationSerie({ setOpen, direction }) {
    // States
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    // State Loading
    const [loading, setLoading] = useState(false);
    // Serie existance state
    const [exist, setExist] = useState(false);

    // Context
    const { setSerieFocus } = useContext(AppContext);

    // Dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Recuperer id professionnel
    const profId = useSelector(GET_ONE_PROF);

    const getMySerie = useSelector(GET_ALL_SERIE_FOCUS_PROF_LIST);
    const getMySerieActive = useSelector(GET_ACTIVE_ALL_SERIE_FOCUS_PROF);

    useEffect(() => {
        if (!getMySerieActive) {
            dispatch(getAllFocusSerieProfAction(profId.id));
        }
    }, [getMySerieActive]);

    // Fonction pour ajouter une serie
    const createSerie = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Verifier si le titre existe dans getMySerie cela renvoie true/false
        const serieTitre = getMySerie.some(item => item.titre.toLocaleLowerCase() === titre.toLocaleLowerCase());

        if (!serieTitre) {
            const formData = new FormData();
            formData.append("prof_id", String(profId.id));
            formData.append("titre", titre);
            formData.append("description", description);
            const sendSerie = await dispatch(createFocusAction(formData));
            if (sendSerie.status === 200) {
                await dispatch(getAllFocusSerieProfAction(profId.id));
                setLoading(false);
                setTitre('');
                setDescription('');
                setOpen(false);
                if (direction === 'create-focus') {
                    navigate('/professionnel/creation-focus');
                    setSerieFocus(sendSerie.data.id);
                }
            }
        } else {
            setExist(true);
            setTimeout(() => {
                setExist(false);
                setLoading(false);
            }, 3000);
            setLoading(false);
        }
    };

    return (
        <div className='creation-serie'>
            <div className='msg-error' style={exist ? { top: '4px' } : { top: '50px' }}>
                <p>Cette série existe déjà</p>
            </div>
            <div className='box-creation'>
                <div className='closed'>
                    <div className='btn-close' onClick={() => setOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22 23" fill="none">
                            <path d="M11.0013 13.8334L2.83464 22.0001C2.52908 22.3056 2.14019 22.4584 1.66797 22.4584C1.19575 22.4584 0.806857 22.3056 0.501301 22.0001C0.195746 21.6945 0.0429688 21.3056 0.0429688 20.8334C0.0429688 20.3612 0.195746 19.9723 0.501301 19.6667L8.66797 11.5001L0.501301 3.33341C0.195746 3.02786 0.0429688 2.63897 0.0429688 2.16675C0.0429688 1.69453 0.195746 1.30564 0.501301 1.00008C0.806857 0.694525 1.19575 0.541748 1.66797 0.541748C2.14019 0.541748 2.52908 0.694525 2.83464 1.00008L11.0013 9.16675L19.168 1.00008C19.4735 0.694525 19.8624 0.541748 20.3346 0.541748C20.8069 0.541748 21.1957 0.694525 21.5013 1.00008C21.8069 1.30564 21.9596 1.69453 21.9596 2.16675C21.9596 2.63897 21.8069 3.02786 21.5013 3.33341L13.3346 11.5001L21.5013 19.6667C21.8069 19.9723 21.9596 20.3612 21.9596 20.8334C21.9596 21.3056 21.8069 21.6945 21.5013 22.0001C21.1957 22.3056 20.8069 22.4584 20.3346 22.4584C19.8624 22.4584 19.4735 22.3056 19.168 22.0001L11.0013 13.8334Z" fill="#AFAFAF" />
                        </svg>
                    </div>
                </div>
                <Stack direction='column' spacing='24px'>
                    <div className='title'>
                        <Stack direction='column' spacing='8px'>
                            <Stack direction='row' spacing='8px'>
                                <p>Création</p>
                                <p style={{ color: 'var(--bg)' }}>série</p>
                            </Stack>
                            <div className='trait'></div>
                        </Stack>
                    </div>
                    <div className='form-create'>
                        <Stack direction='column' spacing='24px'>
                            <Stack direction='column' spacing='12px'>
                                <p>Titre de la série</p>
                                <input type='text' onChange={(e) => setTitre(e.target.value)} />
                            </Stack>
                            <Stack direction='column' spacing='12px'>
                                <p>Description de la série</p>
                                <textarea rows={5} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </Stack>
                            <div className='btn-validate'>
                                {!loading ?
                                    <button onClick={createSerie}>Créer</button>
                                    :
                                    <div className='loader'>
                                        <div className="orbit"></div>
                                    </div>
                                }
                            </div>
                        </Stack>
                    </div>
                </Stack>
            </div>
        </div>
    );
}

CreationSerie.propTypes = {
    setOpen: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
};