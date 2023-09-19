import React, { useState } from "react";
import { getEmailToSendOtp } from "../../Actions/actionAuth";
import { ToastContainer, toast } from "react-toastify";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import key from "../../Images/fluent-emoji.png";
import imgStudy from "../../Images/picture_subscribe.png";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import Loading from "../Loading";
import "react-toastify/dist/ReactToastify.css";
import "./styles/ForgotPassword.scss";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [status, setstatus] = useState("");
  const [error_email, seterror_email] = useState("");
  const [loading, setLoading] = useState(false);

  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error_email !== "no") {
      try {
        const formData = { email };
        setLoading(true);
        const res = await dispatch(getEmailToSendOtp(formData));
        if (res.status === 200) {
          setTimeout(() => {
            setLoading(false);
            navigate("/confirm-password");
          }, 4000);
          notifySuccess("Vous receverez le code sur votre email...");
        }
      } catch (error) {
        setLoading(false);
        seterror_email("no");
        setTimeout(() => {
          seterror_email("");
        }, 3000);
      }
    }
  };

  const notifySuccess = (msg) => {
    toast.info(`${msg}`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const Regex = () => {
    if (status === "email") {
      let value = /\S+@\S+\.\S+/;
      if (value.test(email)) {
        seterror_email("yes");
      } else {
        seterror_email("no");
      }
    }
  };

  return (
    <div className="forgot_password">
      <HeaderAuth />
      <div className="form_forgot_password">
        <Grid container direction="row">
          <Grid item md={6} sm={12}>
            <div className="forms">
              <div className="forme">
                <div className="title">
                  <p>Mot de passe oublié?</p>
                  <img src={key} alt="img .." />
                </div>
                {loading && <Loading />}
                <ToastContainer
                  position="top-right"
                  autoClose={4000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <div className="forgot_img">
                  <img src={imgStudy} alt="img .." />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <p>Email</p>
                    <TextField
                      id="email"
                      label="Votre email"
                      margin="normal"
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      onClick={() => setstatus("email")}
                      onBlur={() => {
                        Regex();
                        setstatus("");
                      }}
                      color={
                        error_email === "no"
                          ? "error"
                          : error_email === "yes"
                          ? "success"
                          : ""
                      }
                      sx={
                        error_email === "no"
                          ? {
                              background: "rgba(255, 0, 0, 0.281)",
                              backdropFilter: "blur(10px)",
                            }
                          : error_email === "yes"
                          ? {
                              background: "rgba(0, 128, 0, 0.295)",
                              backdropFilter: "blur(10px)",
                            }
                          : null
                      }
                      size="small"
                      fullWidth
                    />

                    <button
                      className={
                        error_email === "no"
                          ? "btn_envoyer_disable"
                          : "btn_envoyer"
                      }
                      type="submit"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid item md={6} sm={12} sx={{ p: 5 }}>
            <div className="picture_for_password"></div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ForgotPassword;
