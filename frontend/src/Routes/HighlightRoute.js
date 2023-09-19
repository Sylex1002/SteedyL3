import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../Helpers/PrivateRoutes";
import ShowHighlight from "../Etudiant/Pages/ShowHighlight";

export default function HighlightRoute() {
  return (
    <Routes>
      {/*  Highlights */}
      <Route
        path="/:fonction/Highlights/:id"
        element={
          <PrivateRoutes>
            <ShowHighlight />
          </PrivateRoutes>
        }
      ></Route>
    </Routes>
  );
}
