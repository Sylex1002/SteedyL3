import "./login.scss";
import Loading from "../Loading";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import FonctionUser from "../Components/FonctionUser";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {
  loginAction,
  signupUserAction,
  verifyEmailAction,
  verifyUsernameAction,
} from "../../Actions/actionAuth";
import { auth } from "../config";

const LogIn = () => {
  const [password, setPassword] = useState("");
  const [errorPass, seterrorPass] = useState("");
  const [msgPass, setmsgPass] = useState("");
  const [email, setEmail] = useState("");
  const [error_email, seterror_email] = useState("");
  const [status, setstatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies(["steedy_id"]);
  const [logWrong, setlogWrong] = useState(false);
  const [loginSocio, setLoginSocio] = useState(false);
  const [fonction, setfonction] = useState("Etudiant");
  const [user, setUser] = useState(null);
  const [emailExist, setEmailExist] = useState(false);
  const [emailSocio, setEmailSocio] = useState("");

  console.log(cookies);

  // To navigate into other page
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const LogWrong = () => {
    if (logWrong) {
      return (
        <div
          style={{
            background: "none",
            color: "#F60059",
            width: "100%",
            height: "30px",
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            borderRadius: "8px",
          }}
        >
          <p>Email ou mot de passe incorrect</p>
        </div>
      );
    }
  };

  const Regex = () => {
    if (status === "email") {
      let value = /\S+@\S+\.\S+/;
      if (value.test(email)) {
        seterror_email("yes");
      } else {
        seterror_email("no");
      }
    } else if (status === "password") {
      if (password.length >= 0 && password.length < 6) {
        seterrorPass("wrong");
        setmsgPass("Inserer 6 caracteres ou plus");
      } else {
        seterrorPass("good");
        setmsgPass("Mot de passe acceptable");
        setTimeout(() => {
          setmsgPass("");
        }, 2000);
      }
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (error_email !== "no" && errorPass !== "wrong") {
      const formdata = { email, password };
      setLoading(true);
      await dispatch(loginAction(formdata))
        .then((res) => {
          // add token into cookie
          // const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
          setCookie("access_token", res.data.access, {
            HttpOnly: true,
            secure: true,
          });

          // redirection
          if (res.data.fonction === "Professionnel") {
            navigate(`/professionnel/dashboard`);
            setLoading(false);
          } else if (res.data.fonction === "Etudiant") {
            if (window.localStorage.getItem("status-demand") === null) {
              navigate("/etudiant/decouvrir");
            } else if (
              window.localStorage.getItem("status-demand") === "Abonnement"
            ) {
              navigate(
                "/etudiant/createur/" +
                  window.localStorage.getItem("connected-demand")
              );
            } else if (
              window.localStorage.getItem("status-demand") === "Message"
            ) {
              navigate("/etudiant/messages/");
            }
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
          setlogWrong(true);
          seterror_email("no");
          seterrorPass("wrong");

          setTimeout(() => {
            setlogWrong(false);
            seterror_email("");
            seterrorPass("");
            setPassword("");
          }, 3000);
        });
    }
  };

  const handleValideSocioFireBase = async () => {
    if (user) {
     
    // formdata
    const formdata = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      fonction: fonction,
      email: emailSocio,
      image_url: user.picture,
      password: emailSocio,
    };

      setLoading(true);
      // inscription
      await dispatch(signupUserAction(formdata)).then((res) => {
        setCookie("access_token", res.data.access_token, {
          HttpOnly: true,
          secure: true,
        });

        if (res.data.fonction === "Professionnel") {
          navigate(`/professionnel/dashboard`);
          setLoading(false);
        } else if (res.data.fonction === "Etudiant") {
          navigate("/etudiant/decouvrir");
          setLoading(false);
        }
      });
    } else {
      setLoginSocio(false);
    }
  };

  const handleLoginUserByFireBase = async (res) => {
    // login formdata
    const formdata = {
      email: res.data.user.email,
      password: res.data.user.email,
    };
    setLoading(true);
    // login
    await dispatch(loginAction(formdata)).then((res) => {
      // const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
      setCookie("access_token", res.data.access, {
        HttpOnly: true,
        secure: true,
      });
      // redirection
      if (res.data.fonction === "Professionnel") {
        navigate(`/professionnel/dashboard`);
        setLoading(false);
      } else if (res.data.fonction === "Etudiant") {
        navigate("/etudiant/decouvrir");
        setLoading(false);
      }
    });
  };

  const handleFireBaseSuccess = async (user) => {
    // variable
    let email_user = user.email;
    let username = user.displayName;

    // condition
    if (email_user === null) {
      const res = await verifyUsernameAction(username);

      if (res.data.exists === true) {
        setLoginSocio(false);
        // login handle
        handleLoginUserByFireBase(res);
      } else {
        setLoginSocio(true);
        setEmailExist(true);
      }
    } else {
      verifyEmailAction(email_user).then((res) => {
        if (res.data.exists === true) {
          setLoginSocio(false);
          // login handle
          handleLoginUserByFireBase(res);
        } else {
          setLoginSocio(true);
        }
      });
    }

    let name = user.displayName.split(" ");
    // formData
    const formData = {
      first_name: name[0],
      last_name: name[1],
      username: username,
      pucture: user.photoURL,
      email: email_user,
    };
    setEmailSocio(email_user);
    setUser(formData);
  };

  const handleGoogle = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((res) => {
      handleFireBaseSuccess(res.user);
    });
  };

  const handleTwitter = (event) => {
    event.preventDefault();

    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider).then((res) => {
      handleFireBaseSuccess(res.user);
    });
  };

  return (
    <>
      {loginSocio ? (
        <>
          {loading && <Loading />}
          <FonctionUser
            Regex={Regex}
            emailSocio={emailSocio}
            setEmailSocio={setEmailSocio}
            setstatus={setstatus}
            fonction={fonction}
            emailExist={emailExist}
            error_email={error_email}
            setfonction={setfonction}
            handleValideSocio={handleValideSocioFireBase}
          />
        </>
      ) : (
        <div className="login">
          <HeaderAuth />
          <div className="form_login">
            <div className="form">
              {loading && <Loading />}
              <form onSubmit={handleSubmitLogin}>
                <div className="title">
                  <p>Bienvenue</p>
                </div>
                {LogWrong()}
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
                <FormControl
                  sx={{ width: "100%", marginTop: "15px" }}
                  variant="outlined"
                >
                  <InputLabel sx={{ fontSize: "14px", marginTop: "-2px" }}>
                    Votre mot de passe
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    size="small"
                    onChange={(e) => {
                      setPassword(e.target.value);
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                    value={password}
                  />
                </FormControl>
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

                <button className="btn_login" type="submit">
                  Se connecter
                </button>
              </form>
              <div className="#">
                <div className="or_bar">
                  <p>Ou</p>
                </div>

                <div className="auth_compte">
                  <button onClick={handleGoogle}>Google</button>
                  <button onClick={handleTwitter}> Twitter</button>
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ cursor: "pointer", fontSize: "14px" }}>
                    Vous avez pas un compte ?
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#f49030",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/inscription")}
                    >
                      Inscrivez-vous
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="picture_for_login"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
