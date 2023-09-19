import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../Helpers/PrivateRoutes";
import NotFound from "../Etudiant/components/NotFound";
import ProfShow from "../Admin/Pages/ProfShow/ProfShow";
import LoginAdmin from "../Admin/Pages/Login/LoginAdmin";
import HomeAdmin from "../Admin/Pages/HomeAdmin/HomeAdmin";
import SignupAdmin from "../Admin/Pages/Signup/SignupAdmin";
import Profiluser from "../Admin/Pages/ProfilUser/Profiluser";
import Notification from "../Global/Notification/Notification";
import AdminUserList from "../Admin/Pages/AdminUserList/AdminUserList";
import ProfessionelsAdmin from "../Admin/Pages/Professionels/ProfessionelsAdmin";

export default function AdminRoute() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <PrivateRoutes>
            <HomeAdmin />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin-login"
        element={
          <PrivateRoutes>
            <LoginAdmin />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin-pro"
        element={
          <PrivateRoutes>
            <ProfessionelsAdmin />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin-pro/:id"
        element={
          <PrivateRoutes>
            <ProfShow />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin-users"
        element={
          <PrivateRoutes>
            <AdminUserList />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin-users/:id"
        element={
          <PrivateRoutes>
            <Profiluser />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin-signup"
        element={
          <PrivateRoutes>
            <SignupAdmin />
          </PrivateRoutes>
        }
      />
      <Route path="/admin-notification" element={<Notification />} />
      {/* 404 */}
      <Route
        path="*"
        element={
          <PrivateRoutes>
            <NotFound />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
