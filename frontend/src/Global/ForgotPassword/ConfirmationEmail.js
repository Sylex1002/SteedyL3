import React, { useRef, useState } from "react";
import { getEmailToSendOtp, verifyOtp } from "../../Actions/actionAuth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import key from "../../Images/fluent-emoji.png";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/ConfirmationEmail.scss";
import { Grid } from "@mui/material";
import Loading from "../Loading";

const ConfirmationEmail = () => {
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const { email, otp_hashed, expiration } = useSelector(
    (state) => state.user.otp
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // change input
  const handleChange = (event, index) => {
    const { value } = event.target;
    const code = value.replace(/\D/g, "");

    if (code) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    // Mettre à jour la valeur de l'input actuel
    inputRefs.current[index].value = code;

    const updatedCodes = [...codes];
    updatedCodes[index] = code;
    setCodes(updatedCodes);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      if (!inputRefs.current[index].value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = codes.join("");
    try {
      const formData = { email, otp, otp_hashed, expiration };
      setLoading(true);
      const res = await dispatch(verifyOtp(formData));

      if (res.status === 200) {
        navigate("/reset-password");
        setLoading(false);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 6000);
      if (error.response.status === 500) {
        notifyError("Une erreur est survenue, s'il vous plaît réessayer!");
        setTimeout(() => {
          navigate("/forgot-password");
        }, 6000);
      } else if (error.response.status === 400) {
        notifyError(`${error.response.data.Error},renvoyer le code!`);
      }
    }
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

  const notifySuccess = (msg) => {
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

  const noCodeReceived = async () => {
    try {
      const formData = { email };
      setLoading(true);
      const res = await dispatch(getEmailToSendOtp(formData));
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false);
        }, 6000);
        notifySuccess("Le code est renvoyer sur votre email");
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      notifyError("error");
    }
  };

  return (
    <div className="confirmation">
      <HeaderAuth />
      <div className="form_confirmation">
        <Grid container direction="row">
          <Grid item md={6} sm={12}>
            <div className="forms">
              <div className="forme">
                <div className="title">
                  <p>Entré le code à 6 chiffres envoyé à: </p>
                  <img src={key} alt="..." />
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
                <div className="form-input">
                  <form onSubmit={handleSubmit}>
                    <div className="input">
                      <div className="input_otp">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <input
                            key={index}
                            type="text"
                            onChange={(event) => handleChange(event, index)}
                            onKeyDown={(event) => handleKeyDown(event, index)}
                            maxLength={1}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                          />
                        ))}
                      </div>
                    </div>
                  </form>
                  <div className="btn">
                    <button
                      className={
                        codes.join("").length < 6
                          ? "btn_continuer_disable"
                          : "btn_continuer"
                      }
                      onClick={codes.join("").length < 6 ? "" : handleSubmit}
                    >
                      Continuer
                    </button>
                    <button className="btn_resend" onClick={noCodeReceived}>
                      Code non reçu
                    </button>
                  </div>
                </div>
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

export default ConfirmationEmail;
