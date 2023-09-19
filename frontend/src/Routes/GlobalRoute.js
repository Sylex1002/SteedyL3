import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Global/Home/Home";
import Subscribe from "../Global/Subscribe/Subscribe";
import LogIn from "../Global/LogIn/LogIn";
import ForgotPassword from "../Global/ForgotPassword/ForgotPassword";
import ConfirmationEmail from "../Global/ForgotPassword/ConfirmationEmail";
import ResetPassword from "../Global/ForgotPassword/ResetPassword";
// import PrivateRoutes from "../Helpers/PrivateRoutes";
// import Chat from "../Global/Message/Pages/Message";

export default function GlobalRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inscription" element={<Subscribe />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="confirm-password" element={<ConfirmationEmail />}></Route>
      <Route path="reset-password" element={<ResetPassword />}></Route>

      {/* Message */}
      {/* <Route
        path="/:fonction/messages/:matricule"
        element={
          <PrivateRoutes>
            <Chat />
          </PrivateRoutes>
        }
      ></Route> */}
    </Routes>
  );
}
