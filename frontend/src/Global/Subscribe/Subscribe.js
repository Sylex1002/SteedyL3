import React, { useState } from "react";
import "./Subscribe.scss";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  InputLabel,
  RadioGroup,
  Grid,
  Radio,
} from "@mui/material";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  signupUserAction,
  verifyEmailAction,
  verifyUsernameAction,
} from "../../Actions/actionAuth";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import FonctionUser from "../Components/FonctionUser";
import {} from "../../Actions/actionAuth";
import { auth } from "../config";

const Subscribe = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fonction, setfonction] = useState("Etudiant");
  const [error_email, seterror_email] = useState("");
  const [ErroeSignup, setErroeSignup] = useState(null);
  const [loginSocio, setLoginSocio] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [errorPrenom, seterrorPrenom] = useState("");
  const [emailSocio, setEmailSocio] = useState("");
  const [errorPass, seterrorPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorNom, seterrorNom] = useState("");
  const [password, setPassword] = useState("");
  const [msgPass, setmsgPass] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [status, setstatus] = useState("");
  const [user, setUser] = useState(null);
  const [nom, setNom] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      nom !== "" &&
      prenom !== "" &&
      email !== "" &&
      error_email === "yes" &&
      password !== "" &&
      errorPass === "good"
    ) {
      const formdata = {
        username: nom,
        first_name: nom,
        last_name: prenom,
        fonction: fonction,
        email,
        password,
      };
      await dispatch(signupUserAction(formdata))
        .then(() => {
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          setLoading(false);
          let result = error.response.data.error;
          if (error.code === "ERR_BAD_REQUEST") {
            setErroeSignup(result);
          }
        });
    } else {
      setLoading(false);
      setErroeSignup("All input are required");
    }
  };

  const Regex = () => {
    const regexUpperCase = /[A-Z]/;
    const regexNumber = /[0-9]/;

    if (status === "nom") {
      const regex = /^[a-zA-Z'-]+$/;

      if (regex.test(nom)) {
        seterrorNom("yes");
      } else {
        seterrorNom("no");
      }
    } else if (status === "prenom") {
      const regex = /^[a-zA-Z'-]+$/;

      if (regex.test(prenom)) {
        seterrorPrenom("yes");
      } else {
        seterrorPrenom("no");
      }
    } else if (status === "email") {
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
      } else if (
        !regexUpperCase.test(password) ||
        !regexNumber.test(password)
      ) {
        seterrorPass("wrong");
        setmsgPass(
          "Le mot de passe doit contenir une lettre majuscule et un chiffre"
        );
      } else {
        seterrorPass("good");
        setmsgPass("Mot de passe acceptable");
        setTimeout(() => {
          setmsgPass("");
        }, 2000);
      }
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
      await dispatch(signupUserAction(formdata)).then(() => {
        navigate(`/login`);
      });
    } else {
      setLoginSocio(false);
    }
  };

  const handleFireBaseSuccess = async (user) => {
    // variable
    let email_user = user.email;
    let username = user.displayName;

    // condition
    if (email_user === null) {
      const res = await verifyUsernameAction(username);

      if (res.data.exists === true) {
        navigate("/login");
      } else {
        setLoginSocio(true);
        setEmailExist(true);
      }
    } else {
      verifyEmailAction(email_user).then((res) => {
        if (res.data.exists === true) {
          navigate("/login");
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
        <div className="subscribe">
          <HeaderAuth />
          <div className="form_subscribe">
            <div className="form">
              {loading && <Loading />}
              <form>
                <div className="title">
                  <p>Bienvenue</p>
                </div>
                <div
                  className={
                    ErroeSignup
                      ? "Error_return_signup Act_signup"
                      : "Act_signup False_si"
                  }
                >
                  {ErroeSignup && <p>{ErroeSignup}</p>}
                </div>
                <TextField
                  id="nom"
                  label="Votre nom"
                  margin="normal"
                  onChange={(e) => setNom(e.currentTarget.value)}
                  onClick={() => setstatus("nom")}
                  onBlur={() => {
                    Regex();
                    setstatus("");
                  }}
                  color={
                    errorNom === "no"
                      ? "error"
                      : errorNom === "yes"
                      ? "success"
                      : ""
                  }
                  sx={
                    errorNom === "no"
                      ? {
                          background: "rgba(255, 0, 0, 0.281)",
                          backdropFilter: "blur(10px)",
                        }
                      : errorNom === "yes"
                      ? {
                          background: "rgba(0, 128, 0, 0.295)",
                          backdropFilter: "blur(10px)",
                        }
                      : null
                  }
                  size="small"
                  fullWidth
                />

                <TextField
                  id="prenom"
                  label="Votre prenom"
                  margin="normal"
                  onChange={(e) => setPrenom(e.currentTarget.value)}
                  onClick={() => setstatus("prenom")}
                  onBlur={() => {
                    Regex();
                    setstatus("");
                  }}
                  color={
                    errorPrenom === "no"
                      ? "error"
                      : errorPrenom === "yes"
                      ? "success"
                      : ""
                  }
                  sx={
                    errorPrenom === "no"
                      ? {
                          background: "rgba(255, 0, 0, 0.281)",
                          backdropFilter: "blur(10px)",
                        }
                      : errorPrenom === "yes"
                      ? {
                          background: "rgba(0, 128, 0, 0.295)",
                          backdropFilter: "blur(10px)",
                        }
                      : null
                  }
                  size="small"
                  fullWidth
                />

                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  style={{
                    marginLeft: "10px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  defaultValue="Etudiant"
                >
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <FormControlLabel
                        className="radioEtudiant"
                        style={
                          fonction === "Etudiant"
                            ? { background: "#f48f308c" }
                            : { background: "none" }
                        }
                        value="Etudiant"
                        control={<Radio style={{ color: "#f49030" }} />}
                        onChange={(e) => setfonction(e.currentTarget.value)}
                        label="Etudiant"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        className="radioProfessionnel"
                        style={
                          fonction === "Professionnel"
                            ? { background: "#f48f308c" }
                            : { background: "none" }
                        }
                        value="Professionnel"
                        control={<Radio style={{ color: "#f49030" }} />}
                        onChange={(e) => setfonction(e.currentTarget.value)}
                        label="Professionnelle"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
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
                  sx={{
                    width: "100%",
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  variant="outlined"
                >
                  <InputLabel sx={{ fontSize: "14px", marginTop: "-5px" }}>
                    Votre mot de passe
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Votre mot de passe"
                    type={showPassword ? "text" : "password"}
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
                  />
                </FormControl>
                <div className="bas_signup">
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
                  <button
                    className="btn_subscribe"
                    onClick={handleSubmit}
                    style={{ cursor: "pointer", width: "100%" }}
                  >
                    S`inscrire
                  </button>
                  {/* signup with auther platform */}
                  <div
                    className="or_bar"
                    style={{ border: "1px solid #f3f0ee" }}
                  >
                    <p>Ou</p>
                  </div>
                  <div className="auth_compte" style={{ marginTop: "15px" }}>
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
                    <p style={{ fontSize: "14px" }}>
                      Vous avez deja un compte ?
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#f49030",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/login")}
                      >
                        {" "}
                        Se connecter
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="picture_for_subscribe"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscribe;
