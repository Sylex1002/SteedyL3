import React from "react";
import FocusRoute from "./FocusRoute";
import GlobalRoute from "./GlobalRoute";
import EtudiantRoute from "./EtudiantRoute";
import HighlightRoute from "./HighlightRoute";
import { BrowserRouter } from "react-router-dom";
import ProfessionnelRoute from "./ProfessionnelRoute";

export default function Router() {
 
  return (
    <BrowserRouter>
      {/* Global Route */}
      <GlobalRoute />
      {/* Etudiant Route */}
      <EtudiantRoute />
      {/* Professionnel Route */}
      <ProfessionnelRoute />
      {/* HighlightRoute */}
      <HighlightRoute />
      {/* FocusRoute */}
      <FocusRoute />
      
    </BrowserRouter>
  );
}
