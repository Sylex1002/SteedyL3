import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../Helpers/PrivateRoutes";
import FocusLire from "../Etudiant/Pages/FocusLire";
import CommentFocus from "../Etudiant/Pages/CommentFocus";

export default function FocusRoute() {
  return (
    <Routes>
      <Route
        path="/:fonction/focus/:id"
        element={
          <PrivateRoutes>
            <FocusLire />
          </PrivateRoutes>
        }
      />

      <Route
        path="/:fonction/focus/:id/listen"
        element={
          <PrivateRoutes>
            <CommentFocus />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
