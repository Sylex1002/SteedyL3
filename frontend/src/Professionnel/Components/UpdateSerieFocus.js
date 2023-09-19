import React, { useState } from 'react';
import './styles/UpdateSerieFocus.scss';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFocusSerieProfAction, updateSerieAction } from '../../Actions/ActionSerieFocus';
import { GET_ONE_PROF } from '../../Reducers/ReduceProfesssionnel';
import PropTypes from "prop-types";
import { GET_ALL_SERIE_FOCUS_PROF_LIST } from '../../Reducers/ReduceSerieFocus';

export default function UpdateSerieFocus({ idSerie, titreSerie, descriptionSerie, setOpenModif }) {
    // State Loading
    const [loading, setLoading] = useState(false);

    // Serie existance state
    const [exist, setExist] = useState(false);

    // Recuperer id professionnel
    const profId = useSelector(GET_ONE_PROF);
    const getMySerie = useSelector(GET_ALL_SERIE_FOCUS_PROF_LIST);
    const dispatch = useDispatch();

    // Require state input
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');

    const updateSerie = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Verifier si le titre existe dans getMySerie cela renvoie true/false
        const serieTitre = getMySerie.some(item => item.titre.toLocaleLowerCase() === titre.toLocaleLowerCase());

        if (!serieTitre) {
            const formData = new FormData();
            formData.append("titre", titre === '' ? titreSerie : titre);
            formData.append("description", description === '' ? descriptionSerie : description);
            const updating = await dispatch(updateSerieAction(formData, idSerie));
            if (updating) {
                await dispatch(getAllFocusSerieProfAction(profId.id));
                setLoading(false);
                setOpenModif(false);
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
        <div className='UpdateSerieFocus'>
            <div className='titre'>
                <p>Modifier ma serie</p>
            </div>
            <div className='msg-error' style={exist ? { opacity: '1', zIndex:'999' } : { opacity: '0', zIndex: '0' }}>
                <p>Cette série existe déjà</p>
            </div>
            <div className='update-content'>
                <Stack direction='column' spacing='24px'>
                    <Stack direction='column' spacing='12px' className='inputs'>
                        <p>Titre série</p>
                        <input type='text' placeholder={titreSerie} onChange={(e) => setTitre(e.target.value)} />
                    </Stack>
                    <Stack direction='column' spacing='12px' className='inputs'>
                        <p>Description série</p>
                        <textarea rows={12} placeholder={descriptionSerie} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </Stack>
                    <div className='btn-update'>
                        {!loading ?
                            <button onClick={updateSerie}>Enregistrer</button>
                            :
                            <div className='loader'>
                                <div className="orbit"></div>
                            </div>
                        }
                    </div>
                </Stack>
            </div>
        </div>
    );
}

UpdateSerieFocus.propTypes = {
    idSerie: PropTypes.string.isRequired,
    titreSerie: PropTypes.string.isRequired,
    descriptionSerie: PropTypes.string.isRequired,
    setOpenModif: PropTypes.bool.isRequired,
};