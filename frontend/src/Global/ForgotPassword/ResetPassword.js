import React, { useState } from "react";
import "./styles/ResetPassword.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Loading from "../Loading";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import { Grid } from "@mui/material";
import key from "../../Images/fluent-emoji.png";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { resetPassword } from "../../Actions/actionAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [status, setstatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [new_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPass, seterrorPass] = useState("");
  const [msgPass, setmsgPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { email, otp, otp_hashed, expiration } = useSelector(
    (state) => state.user.otp
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // confirmer le changement de mot de passe
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new_password !== "" && confirmPassword !== "") {
      try {
        const formData = { email, otp, otp_hashed, expiration, new_password };
        setLoading(true);
        const response = await dispatch(resetPassword(formData));
        console.log("res", response);

        if (response.status === 200) {
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 6000);
          notify(response.data.Success);
        }
      } catch (error) {
        setLoading(true);
        console.log(error);
        setTimeout(() => {
          setLoading(false);
          navigate("/forgot-password");
        }, 7000);
        if (error.response.status === 500) {
          notifyError(error.response.statusText);
        } else if (error.response.status === 400) {
          notifyError(error.response.data.Error);
        }
      }
    }
  };

  const Regex = () => {
    const regexUpperCase = /[A-Z]/;
    const regexNumber = /[0-9]/;
    if (status === "password") {
      if (new_password.length >= 0 && new_password.length < 6) {
        seterrorPass("wrong");
        setmsgPass("Inserer 6 caracteres ou plus");
      } else if (
        !regexUpperCase.test(new_password) ||
        !regexNumber.test(new_password)
      ) {
        seterrorPass("wrong");
        setmsgPass(
          "Le mot de passe doit contenir une lettre majuscule et un chiffre"
        );
      } else if (new_password !== confirmPassword) {
        seterrorPass("wrong");
        setmsgPass(
          "Veuillez vérifier si vous avez saisir le même mot de passe"
        );
        setTimeout(() => {
          setmsgPass("");
        }, 2000);
      } else {
        seterrorPass("good");
        setmsgPass("Mot de passe acceptable");
        setTimeout(() => {
          setmsgPass("");
        }, 2000);
      }
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const notify = (msg) => {
    toast.success(`${msg}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyError = (msg) => {
    toast.error(`${msg}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="reset_password">
      <HeaderAuth />
      <div className="form_reset_password">
        <Grid container direction="row">
          <Grid item md={6} sm={12}>
            <div className="forms">
              <div className="forme">
                <div className="title">
                  <p>Changer le mot de passe</p>
                  <img src={key} alt="img" />
                </div>
                {loading && <Loading />}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <div className="new_password">
                      <p>Nouveau mot de passe</p>
                      <FormControl
                        sx={{ width: "100%", marginTop: "10px" }}
                        variant="outlined"
                      >
                        <InputLabel
                          sx={{ fontSize: "14px", marginTop: "-2px" }}
                        >
                          Votre mot de passe
                        </InputLabel>
                        <OutlinedInput
                          id="password"
                          size="small"
                          onChange={(e) => {
                            setPassword(e.currentTarget.value);
                          }}
                          onClick={() => setstatus("password")}
                          onBlur={() => {
                            Regex();
                            setstatus("");
                          }}
                          color={
                            errorPass === "wrong"
                              ? "error"
                              : errorPass === "good"
                              ? "success"
                              : ""
                          }
                          sx={
                            errorPass === "wrong"
                              ? {
                                  background: "rgba(255, 0, 0, 0.281)",
                                  backdropFilter: "blur(10px)",
                                }
                              : errorPass === "good"
                              ? {
                                  background: "rgba(0, 128, 0, 0.295)",
                                  backdropFilter: "blur(10px)",
                                }
                              : null
                          }
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          fullWidth
                          value={new_password}
                        />
                      </FormControl>
                    </div>

                    <div className="confirm_password">
                      <p>Confirmer le mot de passe</p>
                      <FormControl
                        sx={{ width: "100%", marginTop: "10px" }}
                        variant="outlined"
                      >
                        <InputLabel
                          sx={{ fontSize: "14px", marginTop: "-2px" }}
                        >
                          Confirmer votre mot de passe
                        </InputLabel>
                        <OutlinedInput
                          id="confirm_password"
                          size="small"
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                          color={
                            errorPass === "wrong"
                              ? "error"
                              : errorPass === "good"
                              ? "success"
                              : ""
                          }
                          sx={
                            errorPass === "wrong"
                              ? {
                                  background: "rgba(255, 0, 0, 0.281)",
                                  backdropFilter: "blur(10px)",
                                }
                              : errorPass === "good"
                              ? {
                                  background: "rgba(0, 128, 0, 0.295)",
                                  backdropFilter: "blur(10px)",
                                }
                              : null
                          }
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          value={confirmPassword}
                        />
                      </FormControl>
                    </div>
                    <span
                      style={
                        errorPass === "wrong"
                          ? { color: "red", fontSize: "14px" }
                          : errorPass === "good"
                          ? { color: "green", fontSize: "14px" }
                          : null
                      }
                    >
                      {msgPass}
                    </span>

                    <button className="btn_envoyer" type="submit">
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

export default ResetPassword;
