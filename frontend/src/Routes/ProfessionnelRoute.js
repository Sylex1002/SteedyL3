import React from "react";
import { Route, Routes } from "react-router-dom";
import Creer from "../Professionnel/Pages/Creer";
import PrivateRoutes from "../Helpers/PrivateRoutes";
import Gestion from "../Professionnel/Pages/Gestion";
import Explorer from "../Professionnel/Pages/Explorer";
import FocusStat from "../Professionnel/Pages/FocusStat";
import Dashboard from "../Professionnel/Pages/Dashboard";
import ProfilStat from "../Professionnel/Pages/ProfilStat";
import HighlightStat from "../Professionnel/Pages/HighlightStat";
// import CreationFocus from "../Professionnel/Pages/CreationFocus";
import CreerCommunity from "../Professionnel/Pages/CreerCommunity";
import AddContentFocus from "../Professionnel/Pages/AddContentFocus";
import CreationHighlight from "../Professionnel/Pages/CreationHighlight";
import AddContentHighlight from "../Professionnel/Pages/AddContentHighlight";
import PublicationMurEtudiant from "../Etudiant/Pages/PublicationMurEtudiant";
import MessageProfessionnel from "../Global/Message/Pages/MessageProfessionnel";
import MessageListeProfessionnel from "../Global/Message/Pages/MessageListeProfessionnel";
import CommunityListProfessionnel from "../Global/Community/Pages/CommunityListProfessionnel";
import CommunityProfessionnel from "../Global/Community/Pages/CommunityProfessionnel";

export default function ProfessionnelRoute() {
  return (
    <Routes>
      <Route
        path="/professionnel/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      ></Route>

      {/* Route Creation */}
      <Route
        path="/professionnel/creer"
        element={
          <PrivateRoutes>
            <Creer />
          </PrivateRoutes>
        }
      ></Route>
      {/* Creation Highlight */}
      <Route
        path="/professionnel/creation-highlight"
        element={
          <PrivateRoutes>
            <CreationHighlight />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/creation-highlight/nouveau-contenu/:element"
        element={
          <PrivateRoutes>
            <AddContentHighlight />
          </PrivateRoutes>
        }
      ></Route>
      {/* Creation Focus */}
      <Route
        path="/professionnel/creation-focus"
        element={
          <PrivateRoutes>
            <AddContentFocus />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/creation-focus/nouveau-contenu/:element"
        element={
          <PrivateRoutes>
            <AddContentFocus />
          </PrivateRoutes>
        }
      ></Route>
     
      {/* Route Explorer */}
      <Route path="/professionnel/explorer" element={<Explorer />}></Route>
      {/* Route Communauté */}
      <Route
        path="/professionnel/communityList"
        element={
          <PrivateRoutes>
            <CommunityListProfessionnel />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/community/creer/"
        element={
          <PrivateRoutes>
            <CreerCommunity />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/community/:id"
        element={
          <PrivateRoutes>
            <CommunityProfessionnel />
          </PrivateRoutes>
        }
      ></Route>

      <Route
        path="/professionnel/gerer-voir-les-donnees"
        element={
          <PrivateRoutes>
            <Gestion />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/gerer-voir-les-donnees/mon-profil"
        element={
          <PrivateRoutes>
            <ProfilStat />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/gerer-voir-les-donnees/gestion-highlight"
        element={
          <PrivateRoutes>
            <HighlightStat />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/gerer-voir-les-donnees/gestion-focus"
        element={
          <PrivateRoutes>
            <FocusStat />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/profil/publication/"
        element={
          <PrivateRoutes>
            <PublicationMurEtudiant />
          </PrivateRoutes>
        }
      ></Route>

      {/* Route Message */}
      <Route
        path="/professionnel/message"
        element={
          <PrivateRoutes>
            <MessageListeProfessionnel />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/professionnel/messages/:matricule"
        element={
          <PrivateRoutes>
            <MessageProfessionnel />
          </PrivateRoutes>
        }
      ></Route>
    </Routes>
  );
}
