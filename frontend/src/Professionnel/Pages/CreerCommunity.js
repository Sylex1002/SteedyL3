import React, { useEffect, useState } from "react";
import "./styles/CreerCommunity.scss";
import image from "../../Images/Capture-removebg-preview.png";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Logo from "../../Etudiant/components/Logo";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { createCommunaute_action } from "../../Actions/ActionCommunity";
import { BaseURL } from "../../Helpers/ServiceApi";

export default function CreerCommunity() {
  const [groupe_name, setGroupename] = useState("");
  const [description, setDescription] = useState("");
  const [droppedImage, setDroppedImage] = useState(null);
  const [follower, setfollower] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const user = useSelector(GET_USER_INFO_CONNECT);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    if (user.id) {
      setfollower(user.following);
    }
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const addAllMembers = () => {
    const allMemberIds = follower.map((follow) => follow.id);
    setSelectedMembers(allMemberIds);
  };

  // Fonction appelée lorsqu'un fichier est déposé
  const onDrop = (acceptedFiles) => {
    const droppedFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setDroppedImage(reader.result);
    };
    reader.readAsDataURL(droppedFile);
  };

  // Utilisation du hook useDropzone pour gérer le glisser-déposer
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleSubmit = async () => {
    if (groupe_name.trim() === "") {
      return;
    }

    const formData = new FormData();
    formData.append("groupe_name", groupe_name);
    formData.append("description", description);
    formData.append("createur_id", user.id);
    formData.append("image", droppedImage);


    // Ajoutez ici les membres sélectionnés au formulaire
    selectedMembers.forEach((memberId) => {
      formData.append("members[]", memberId.id);
    });

    await dispatch(createCommunaute_action(formData)).then(() => {
      setGroupename("");
      setDescription("");
      setDroppedImage(null);
      navigate(-1);
    });
  };

  const handleCheckboxChange = (event, memberId) => {
    if (event.target.checked) {
      // Add the member ID to the selectedMembers list
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      // Remove the member ID from the selectedMembers list
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };

  return (
    <div className="Create-group">
      <div className="Header">
        <div className="header-content">
          <div className="profil-group">
            <Logo />
          </div>
          <div className="button-controls">
            <button
              onClick={handleSubmit}
              disabled={groupe_name.trim() === ""}
              className={
                groupe_name.trim() === "" ? "transparent-button" : "terminer"
              }
            >
              Terminer
            </button>
            <button className="annuler" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        </div>
      </div>
      <div className="Creer">
        <div className="Image-group" {...getRootProps()}>
          <div className="show-image">
            <input {...getInputProps()} />
            {droppedImage ? (
              <img src={droppedImage} alt="Image" />
            ) : (
              <img src={image} alt="Image par défaut" />
            )}
          </div>
          <div className="description">
            <Stack direction="column" spacing="12px">
              <p>
                Déposer une image, ou <span>Télécharger</span>
              </p>
              <span>
                Largeur minimale de 1600px recommandée. Max 10Mo chacun
              </span>
            </Stack>
          </div>
        </div>
        <div className="Info-group">
          <div className="form-group">
            <Stack direction="column" spacing="12px" sx={{ height: "15%" }}>
              <p>Entrer le nom de la communauté</p>
              <input
                type="text"
                value={groupe_name}
                onChange={(e) => setGroupename(e.target.value)}
              />
            </Stack>

            <Stack direction="column" spacing="12px" sx={{ height: "32%" }}>
              <p>Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Stack>

            <div className="List-user">
              <div className="add-members">
                <Stack direction="row" spacing="8px">
                  <p>Inviter des personnes</p>
                  <p className="Icon-add">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14.9103 13.0486H13.357V11.4953C13.357 11.4098 13.2871 11.3399 13.2016 11.3399H12.2696C12.1842 11.3399 12.1143 11.4098 12.1143 11.4953V13.0486H10.5609C10.4755 13.0486 10.4056 13.1185 10.4056 13.204V14.136C10.4056 14.2214 10.4755 14.2913 10.5609 14.2913H12.1143V15.8447C12.1143 15.9301 12.1842 16 12.2696 16H13.2016C13.2871 16 13.357 15.9301 13.357 15.8447V14.2913H14.9103C14.9957 14.2913 15.0656 14.2214 15.0656 14.136V13.204C15.0656 13.1185 14.9957 13.0486 14.9103 13.0486ZM4.84263 7.73616C4.82516 7.56723 4.81545 7.39636 4.81545 7.22355C4.81545 6.91482 4.84457 6.61386 4.89894 6.32066C4.91253 6.25076 4.87564 6.17892 4.81156 6.1498C4.54749 6.03135 4.30478 5.86825 4.09508 5.66243C3.84798 5.42284 3.65353 5.13437 3.52415 4.81543C3.39477 4.49649 3.33329 4.15408 3.34364 3.81006C3.36112 3.18677 3.6116 2.59456 4.04848 2.14797C4.52808 1.65672 5.17272 1.38877 5.85814 1.39653C6.47754 1.40236 7.07558 1.64119 7.52799 2.06447C7.68139 2.20816 7.81342 2.36738 7.9241 2.53825C7.96293 2.59844 8.03866 2.62368 8.10467 2.60038C8.44641 2.48194 8.80757 2.39845 9.17843 2.35961C9.28716 2.34796 9.3493 2.23146 9.30076 2.13438C8.66971 0.885867 7.38042 0.0237559 5.8892 0.000455592C3.73781 -0.0325532 1.94368 1.73245 1.94368 3.88384C1.94368 5.10322 2.50483 6.19057 3.38442 6.90317C2.76696 7.1886 2.19804 7.58276 1.70485 8.07595C0.640807 9.13806 0.0388824 10.54 4.85523e-05 12.037C-0.000469695 12.0577 0.00316536 12.0783 0.0107393 12.0976C0.0183133 12.1169 0.029673 12.1345 0.0441492 12.1494C0.0586254 12.1642 0.0759251 12.176 0.0950289 12.184C0.114133 12.1921 0.134654 12.1962 0.155384 12.1962H1.24467C1.32817 12.1962 1.39807 12.1302 1.40001 12.0467C1.4369 10.9205 1.8932 9.86619 2.69512 9.06622C3.26598 8.49536 3.96499 8.09925 4.72807 7.90703C4.80186 7.88567 4.85234 7.81383 4.84263 7.73616ZM13.59 7.22355C13.59 5.09934 11.8832 3.37318 9.76676 3.34017C7.61537 3.30716 5.82319 5.07216 5.82319 7.22355C5.82319 8.44293 6.38628 9.53028 7.26392 10.2429C6.64007 10.5321 6.07215 10.9291 5.5863 11.4157C4.52225 12.4778 3.92033 13.8797 3.88149 15.3748C3.88097 15.3955 3.88461 15.4161 3.89218 15.4354C3.89976 15.4547 3.91112 15.4723 3.92559 15.4871C3.94007 15.502 3.95737 15.5138 3.97647 15.5218C3.99558 15.5299 4.0161 15.534 4.03683 15.534H5.12418C5.20767 15.534 5.27757 15.468 5.27951 15.3845C5.3164 14.2583 5.7727 13.204 6.57462 12.404C7.41149 11.5671 8.52214 11.1069 9.70657 11.1069C11.8502 11.1069 13.59 9.36912 13.59 7.22355ZM11.4638 8.98078C10.9939 9.45067 10.3706 9.70892 9.70657 9.70892C9.04251 9.70892 8.41923 9.45067 7.94934 8.98078C7.71486 8.74753 7.52959 8.46957 7.40451 8.16339C7.27944 7.8572 7.2171 7.52903 7.2212 7.19831C7.22703 6.56143 7.48139 5.94592 7.92604 5.48962C8.39205 5.01196 9.01533 4.74595 9.68133 4.73818C10.3396 4.73236 10.9784 4.98866 11.4483 5.44884C11.9298 5.92068 12.1939 6.55173 12.1939 7.22355C12.1919 7.88761 11.9337 8.51089 11.4638 8.98078Z"
                        fill="black"
                      />
                    </svg>
                  </p>
                </Stack>
              </div>
              <div className="list-container">
                <div className="Select-input">
                  <input
                    type="checkbox"
                    id="select-all"
                    onClick={addAllMembers}
                    checked={selectedMembers.length === follower.length} // Check if all members are selected
                  />
                  <label htmlFor="select-all">
                    <b>Tous sélectionnés</b>
                  </label>
                </div>
                <div className="list-scroll">
                  <Stack direction="column" spacing="8px" className="box-list">
                    {follower.length > 0 &&
                      follower.map((follow, index) => {
                        return (
                          <div className="list-info" key={index}>
                            <label htmlFor={index}>
                              <div className="info-user">
                                <div className="profil-user">
                                  <img
                                    src={`${BaseURL}${follow?.image_url}`}
                                    alt=""
                                  />
                                </div>
                                <div className="user-name">
                                  <div className="name">
                                    {follow?.username} {follow?.last_name}
                                  </div>
                                  <div className="email">{follow?.email}</div>
                                </div>
                              </div>
                            </label>
                            <div className="my-check">
                              <input
                                type="checkbox"
                                id={index}
                                checked={selectedMembers.includes(follow)}
                                onChange={(event) =>
                                  handleCheckboxChange(event, follow)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
