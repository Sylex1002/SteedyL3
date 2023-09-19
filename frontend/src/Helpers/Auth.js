import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMatch } from "react-router-dom";
import { Token } from "../Context/Token";
import Etudiant from "../Etudiant/Etudiant";
import Loading from "../Global/Loading";
import LogIn from "../pages/LogIn/LogIn";
import Subscribe from "../pages/Subscribe/Subscribe";

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);

    const [myFonction, setmyFonction] = useState('')
    const [getIdUser, setgetId] = useState(0)

    // Recuperer parametre de l"URL
    const match = useMatch('auth/:page')
    const page = match?.params?.page

    // Recuperer fonction pour la redirection vers le dashboard correspondant
    setTimeout(() => {
        setmyFonction(window.localStorage.getItem('fonction'))
        // Get Id user
        setgetId(window.localStorage.getItem('id'))
    }, 3000);

    const loadingFix = () => {
        setCookie('access_token', window.localStorage.getItem('access'), { secure: true })
        setCookie('refresh_token', window.localStorage.getItem('refresh'), { secure: true })
        setTimeout(() => {
            setCookie('access_token', window.localStorage.getItem('access'), { secure: true })
            setCookie('refresh_token', window.localStorage.getItem('refresh'), { secure: true })
        }, 2000);
        return <Loading />
    }
    return (
        <>
            {/* S'il y'a token il se redirige vers le profil */}
            {/* { cookies.access_token && cookies.access_token !== null ? 
                myFonction === 'professionnel' ? 
                    <Professionnal removeCookie={removeCookie} id={getIdUser} />
                :  
                myFonction === 'etudiant' ? 
                    <Etudiant removeCookie={removeCookie} id={getIdUser} />
                : loadingFix() : <Subscribe setCookie={setCookie} removeCookie={removeCookie} />
            } */}
            {page === 'inscription' ?
                <Subscribe setCookie={setCookie} removeCookie={removeCookie} />
                :
                <LogIn setCookie={setCookie} removeCookie={removeCookie} cookies={cookies.access_token} />
            }

        </>
    )
}

export default Auth