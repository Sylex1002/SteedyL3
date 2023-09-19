import React, { useContext, useEffect, useState } from 'react';
import './styles/SelectSerieFocus.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACTIVE_ALL_SERIE_FOCUS_PROF, GET_ALL_SERIE_FOCUS_PROF_LIST } from '../../Reducers/ReduceSerieFocus';
import { getAllFocusSerieProfAction } from '../../Actions/ActionSerieFocus';
import PropTypes from "prop-types";
import { GET_ONE_PROF } from '../../Reducers/ReduceProfesssionnel';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { getProfIdAction } from '../../Actions/ActionProf';
import { useCookies } from 'react-cookie';
import { getIdUserAction, getUserInfoAction } from '../../Actions/actionAuth';

export default function SelectSerieFocus({ setOpenMySérie, setOpen, direction }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [serieChoise, setSerieChoise] = useState('');
    const [cookies] = useCookies(["access_token", "refresh_token"]);

    // Navigation
    const navigate = useNavigate();

    // Context
    const { setSerieFocus } = useContext(AppContext);

    const dispatch = useDispatch();
    // Recuperer id professionnel
    const profId = useSelector(GET_ONE_PROF);
    // user information
    useEffect(() => {
        return async () => {
            if (cookies.access_token) {
                // get user id
                const decodeToken = await dispatch(
                    getIdUserAction({ token: cookies.access_token })
                );
                if (decodeToken.token_type === "access") {
                    await dispatch(getUserInfoAction(decodeToken.user_id));
                    await dispatch(getProfIdAction(decodeToken.user_id));
                }
            }
        };
    }, [dispatch, cookies.access_token]);

    const getMySerie = useSelector(GET_ALL_SERIE_FOCUS_PROF_LIST).filter((item) =>
        item.titre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const allserieActive = useSelector(GET_ACTIVE_ALL_SERIE_FOCUS_PROF);

    useEffect(() => {
        if (!allserieActive) {
            if (profId.id !== undefined) {
                dispatch(getAllFocusSerieProfAction(profId.id));
            }
        }
    }, [dispatch, profId]);

    return (
        <div className='selectSerieFocus'>
            <div className='closed' onClick={() => { setOpenMySérie(false); setOpen(true); setSerieChoise(''); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 22 23" fill="none">
                    <path d="M11.0003 13.8334L2.83366 22C2.5281 22.3056 2.13921 22.4584 1.66699 22.4584C1.19477 22.4584 0.80588 22.3056 0.500325 22C0.194769 21.6945 0.0419922 21.3056 0.0419922 20.8334C0.0419922 20.3611 0.194769 19.9722 0.500325 19.6667L8.66699 11.5L0.500325 3.33335C0.194769 3.0278 0.0419922 2.63891 0.0419922 2.16669C0.0419922 1.69446 0.194769 1.30558 0.500325 1.00002C0.80588 0.694464 1.19477 0.541687 1.66699 0.541687C2.13921 0.541687 2.5281 0.694464 2.83366 1.00002L11.0003 9.16669L19.167 1.00002C19.4725 0.694464 19.8614 0.541687 20.3337 0.541687C20.8059 0.541687 21.1948 0.694464 21.5003 1.00002C21.8059 1.30558 21.9587 1.69446 21.9587 2.16669C21.9587 2.63891 21.8059 3.0278 21.5003 3.33335L13.3337 11.5L21.5003 19.6667C21.8059 19.9722 21.9587 20.3611 21.9587 20.8334C21.9587 21.3056 21.8059 21.6945 21.5003 22C21.1948 22.3056 20.8059 22.4584 20.3337 22.4584C19.8614 22.4584 19.4725 22.3056 19.167 22L11.0003 13.8334Z" fill="#AFAFAF" />
                </svg>
            </div>
            <div className='title'>
                <p>Mes séries</p>
            </div>
            <div className='search-box'>
                <div className='search-content'>
                    <div className="search-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 24 25"
                            fill="none"
                        >
                            <path
                                d="M21.75 21.1895L16.086 15.5255C17.4471 13.8915 18.1258 11.7957 17.981 9.67395C17.8361 7.55225 16.8789 5.56807 15.3084 4.13416C13.7379 2.70026 11.675 1.92703 9.54893 1.97534C7.42284 2.02365 5.39723 2.88977 3.89347 4.39353C2.38971 5.89729 1.52359 7.92291 1.47528 10.049C1.42697 12.1751 2.2002 14.2379 3.6341 15.8085C5.06801 17.379 7.05219 18.3362 9.17389 18.481C11.2956 18.6259 13.3914 17.9471 15.0255 16.586L20.6895 22.25L21.75 21.1895ZM2.99996 10.25C2.99996 8.915 3.39585 7.60996 4.13754 6.49993C4.87924 5.38989 5.93345 4.52473 7.16685 4.01384C8.40025 3.50295 9.75745 3.36927 11.0668 3.62973C12.3762 3.89018 13.5789 4.53305 14.5229 5.47706C15.4669 6.42106 16.1098 7.62379 16.3703 8.93317C16.6307 10.2425 16.497 11.5997 15.9862 12.8331C15.4753 14.0665 14.6101 15.1207 13.5001 15.8624C12.39 16.6041 11.085 17 9.74996 17C7.96036 16.998 6.24463 16.2862 4.97919 15.0208C3.71375 13.7554 3.00195 12.0396 2.99996 10.25Z"
                                fill="#AFAFAF"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Faire un recherche…"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>
            </div>
            <div className='list-serie'>
                {getMySerie.map((serie, index) => {
                    return (
                        <div
                            className='serie'
                            key={index}
                            onClick={() => setSerieChoise(serie.titre)}
                            style={serieChoise === serie.titre ?
                                { border: '1px solid var(--bg)', color: 'var(--bg)' }
                                : null
                            }
                        >
                            <p>{serie.titre}</p>
                        </div>
                    );
                })}
            </div>
            <div className='btn-validator'>
                {serieChoise !== '' ?
                    <button className='active' onClick={() => {
                        setSerieFocus(serieChoise);
                        navigate(direction);
                    }}>Valider</button>
                    :
                    <button disabled>Valider</button>
                }
            </div>
        </div>
    );
}

SelectSerieFocus.propTypes = {
    setOpenMySérie: PropTypes.bool.isRequired,
    setOpen: PropTypes.bool.isRequired,
    direction: PropTypes.string.isRequired,
};