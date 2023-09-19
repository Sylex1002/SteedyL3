import React from "react";
import { Route, Routes } from "react-router-dom";
import Focus from "../Etudiant/Pages/Focus";
import Createurs from "../Etudiant/Pages/Createurs";
import ProfilPro from "../Etudiant/Pages/ProfilPro";
import PrivateRoutes from "../Helpers/PrivateRoutes";
// import Message from "../Global/Message/Pages/Message";
import Highlights from "../Etudiant/Pages/Highlights";
import FilActualite from "../Etudiant/Pages/FilActualite";
import HighlightPro from "../Etudiant/Pages/HighlightPro";
import EtudiantProfil from "../Etudiant/Pages/EtudiantProfil";
import ViewAllFocusPro from "../Etudiant/Pages/ViewAllFocusPro";
import NotificationsEtudiant from "../Etudiant/Pages/NotificationsEtudiant";
import MessageEtudiant from "../Global/Message/Pages/MessageEtudiant";
import MessageListEtudiant from "../Global/Message/Pages/MessageListeEtudiant";
import CommunityListEtudiants from "../Global/Community/Pages/CommunityListEtudiants";
import CommunityEtudiants from "../Global/Community/Pages/CommunityEtudiants";

export default function EtudiantRoute() {
  return (
    <Routes>
      <Route
        path="/etudiant/decouvrir"
        element={
          <PrivateRoutes>
            <FilActualite />
          </PrivateRoutes>
        }
      />
      <Route
        path="/etudiant/profil/:id"
        element={
          <PrivateRoutes>
            <EtudiantProfil />
          </PrivateRoutes>
        }
      ></Route>
      {/* Createurs */}

      <Route
        path="/etudiant/Createurs"
        element={
          <PrivateRoutes>
            <Createurs />
          </PrivateRoutes>
        }
      />

      <Route
        path="etudiant/createur/:id/:serie"
        element={
          <PrivateRoutes>
            <ViewAllFocusPro />
          </PrivateRoutes>
        }
      />

      <Route
        path="/:fonction/createur/:id"
        element={
          // <PrivateRoutes>
          <ProfilPro />
          // </PrivateRoutes>
        }
      />
      {/* focus */}
      <Route
        path="/etudiant/focus"
        element={
          <PrivateRoutes>
            <Focus />
          </PrivateRoutes>
        }
      />

    
  
      {/*Highlights  */}
      <Route
        path="/etudiant/Highlights"
        element={
          <PrivateRoutes>
            <Highlights />
          </PrivateRoutes>
        }
      />

      <Route
        path="/etudiant/professionnel/highlight/"
        element={
          <PrivateRoutes>
            <HighlightPro />
          </PrivateRoutes>
        }
      />
      {/* notifications */}

      <Route
        path="/etudiant/notifications"
        element={
          <PrivateRoutes>
            <NotificationsEtudiant />
          </PrivateRoutes>
        }
      />

      {/* message */}
      <Route
        path="/etudiant/messages"
        element={
          <PrivateRoutes>
            <MessageListEtudiant />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/etudiant/community/:id"
        element={
          <PrivateRoutes>
            <CommunityEtudiants />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/etudiant/community/"
        element={
          <PrivateRoutes>
            <CommunityListEtudiants />
          </PrivateRoutes>
        }
      ></Route>
       <Route
        path="/etudiant/messages/:matricule"
        element={
          <PrivateRoutes>
            <MessageEtudiant />
          </PrivateRoutes>
        }
      ></Route>
    </Routes>
  );
}
