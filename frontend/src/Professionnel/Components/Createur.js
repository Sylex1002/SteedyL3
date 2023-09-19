import React, { useContext, useEffect, useState } from "react";
import "./styles/Createur.scss";
import { motion } from "framer-motion";
import { Box, Modal, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  boxSearch,
  head,
  modalCreateur,
  search,
  searchBar,
} from "./ModalCreateur";
import ListOtherCreateurs from "./ListOtherCreateurs";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import {
  getPro_search_Action,
  getProfPopulaireAction,
  get_prof_follow_byprof_action,
  get_prof_similaire_prof_action,
  post_follower_prof_action,
} from "../../Actions/ActionProf";
import {
  GET_FOLLOW_PROF_LIST,
  GET_FOLLOW_PROF_LIST_ACTIVE,
  GET_POPULAIRE_PROF_ACTIVE,
  GET_POPULAIRE_PROF_LIST,
  GET_SAMACATEGORY_PROF_LIST,
  GET_SAMECATEGORY_PROF_LIST_ACTIVE,
} from "../../Reducers/ReduceProfesssionnel";
import { BaseURL } from "../../Helpers/ServiceApi";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CardProfUnFollow from "./CardProfUnFollow";

export default function Createur() {
  const { Uuid } = useContext(AppContext);
  const [openBoxCreateur, setOpenBoxCreateur] = useState(false);
  const prof_populaire_active = useSelector(GET_POPULAIRE_PROF_ACTIVE);
  const prof_populaire_list = useSelector(GET_POPULAIRE_PROF_LIST);

  const prof_smilaire_active = useSelector(GET_SAMECATEGORY_PROF_LIST_ACTIVE);
  const prof_smilaire_list = useSelector(GET_SAMACATEGORY_PROF_LIST);

  const prof_follow_active = useSelector(GET_FOLLOW_PROF_LIST_ACTIVE);
  const prof_follow_list = useSelector(GET_FOLLOW_PROF_LIST);
  const [searchInput, setsearchInput] = useState("");
  const [prof_searchData, setProf_searchData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get all prof populaire
  useEffect(() => {
    if (prof_populaire_active === false) {
      dispatch(getProfPopulaireAction());
    }
  }, []);

  // get all prof similAi
  useEffect(() => {
    if (Uuid) {
      if (prof_smilaire_active === false) {
        dispatch(get_prof_similaire_prof_action(Uuid));
      }
      if (prof_follow_active === false) {
        dispatch(get_prof_follow_byprof_action(Uuid));
      }
    }
  }, []);

  const handleFollowProf = async (prof) => {
    const formdata = {
      prof_id: prof.id,
      follower_id: Uuid,
    };
    if (Uuid) {
      await dispatch(post_follower_prof_action(formdata));
    }
  };

  const handleSearch = async () => {
    await dispatch(getPro_search_Action(searchInput)).then((res) => {
      setProf_searchData(res.data);
    });
  };

  const handleNaviagete = (prof) => {
    navigate(`/professionnel/createur/${prof.id}/`);
  };

  // Card Createur suivi
  const CreateurSuivi = ({ prof }) => {
    return (
      <motion.div
        initial={{ opacity: "0" }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="card-createur-suivi"
        
      >
        <Stack   direction="column" spacing="12px">
          <div className="profil">
            <img onClick={()=>handleNaviagete(prof)} src={`${BaseURL}${prof.user.image_url}`} alt="steedy" />
          </div>
          <div className="info-name">
            <Stack direction="column" spacing="4px">
              <p>
                {prof.user.first_name} {prof.user.last_name}
              </p>
              <p className="tag">{prof.user.domain}</p>
            </Stack>
          </div>
        </Stack>
      </motion.div>
    );
  };

  CreateurSuivi.propTypes = {
    prof: PropTypes.object.isRequired,
  };

  // Card Createur par defaut
  const Createur = ({ prof }) => {
    return (
      <motion.div
        initial={{ translateY: "100px" }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.6 }}
        className="createur-default"
      >
        <Stack direction="column" spacing="24px">
          <div className="profil">
            <img onClick={()=>handleNaviagete(prof)} src={`${BaseURL}${prof.user.image_url}`} alt="steedy" />
          </div>
          <div className="info-name">
            <Stack direction="column" spacing="4px">
              <p>
                {prof.user.first_name} {prof.user.last_name}
              </p>
              <p className="tag">{prof.user.domain}</p>
            </Stack>
          </div>
          <div className="follow">
            <button onClick={() => handleFollowProf(prof)}>Suivre</button>
          </div>
        </Stack>
      </motion.div>
    );
  };

  Createur.propTypes = {
    prof: PropTypes.object.isRequired,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="decouvrir"
    >
      <Stack direction="column" spacing="45px">
        <motion.div
          initial={{ translateX: "-100px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.6 }}
          className="title"
        >
          <Stack direction="column" spacing="8px">
            <p>Explorer d`autres créateurs</p>
            <div className="trait"></div>
          </Stack>
        </motion.div>
        {/* Createurs suivi */}
        {prof_follow_list.length > 0 && (
          <div className="suivi">
            <Stack direction="column" spacing="24px">
              <motion.div
                initial={{ translateX: "-100px" }}
                animate={{ translateX: 0 }}
                transition={{ duration: 0.6 }}
                className="small_title"
              >
                <p>Créateur(s) suivi(s)</p>
              </motion.div>
              <div className="createur_suivi">
                <Swiper slidesPerView={"auto"} spaceBetween={12}>
                  {prof_follow_list.length > 0 &&
                    prof_follow_list.map((prof, index) => (
                      <SwiperSlide key={index}>
                        <CreateurSuivi prof={prof} />
                      </SwiperSlide>
                    ))}
                  <SwiperSlide>
                    <div
                      className="add"
                      onClick={() => setOpenBoxCreateur(!openBoxCreateur)}
                    >
                      <div className="signAdd">
                        <Stack direction="column" spacing="12px">
                          <div className="icon">
                            <AddIcon
                              sx={{
                                width: "65px",
                                height: "65px",
                                color: "#AFAFAF",
                              }}
                            />
                          </div>
                          <p>Suivre autres</p>
                        </Stack>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>

                {/* Modal pour voir autres createurs */}
                <Modal
                  open={openBoxCreateur}
                  onClose={() => setOpenBoxCreateur(!openBoxCreateur)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={styleDelete}>
                    <div className="others" style={modalCreateur}>
                      <div className="head" style={head}>
                        <Stack direction="row" spacing="12px">
                          <div className="icon" style={{ textAlign: "center" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 28 28"
                              fill="none"
                            >
                              <path
                                d="M16.646 23.5049C18.5456 20.7599 19.1253 18.2376 19.2726 16.678C20.2533 17.035 21.053 17.4749 21.6309 17.962C22.355 18.5723 22.6832 19.2108 22.6832 19.8333V23.85H16.4072L16.646 23.5049ZM15.4705 23.2425L15.5723 23.85H12.4273L12.5292 23.2425L13.4742 17.6075L13.5092 17.3987L13.4145 17.2093L12.7423 15.8648C13.155 15.8347 13.5747 15.8167 13.9998 15.8167C14.425 15.8167 14.8447 15.8347 15.2574 15.8648L14.5851 17.2093L14.4904 17.3987L14.5255 17.6075L15.4705 23.2425ZM11.3537 23.5049L11.5925 23.85H5.3165V19.8333C5.3165 19.2121 5.64629 18.5735 6.37268 17.9624C6.95147 17.4754 7.7506 17.0359 8.72713 16.679C8.87458 18.2387 9.45451 20.7605 11.3537 23.5049ZM13.9998 4.15C16.2192 4.15 18.0165 5.94732 18.0165 8.16667C18.0165 10.386 16.2192 12.1833 13.9998 12.1833C11.7805 12.1833 9.98317 10.386 9.98317 8.16667C9.98317 5.94732 11.7805 4.15 13.9998 4.15Z"
                                stroke="black"
                                strokeWidth="1.3"
                              />
                            </svg>
                          </div>
                          <p style={{ display: "flex", alignItems: "center" }}>
                            Autres créateurs ...
                          </p>
                        </Stack>
                      </div>
                      <div className="search" style={search}>
                        <div style={boxSearch}>
                          <div
                            style={{
                              display: "inline-flex",
                              flexDirection: "row",
                              width: "100%",
                            }}
                          >
                            <div
                              className="icon-search"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                paddingInline: "12px",
                                width: "10%",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 25 25"
                                fill="none"
                              >
                                <path
                                  d="M22.4087 21.1895L16.7447 15.5255C18.1058 13.8914 18.7845 11.7956 18.6397 9.67389C18.4948 7.55219 17.5376 5.56801 15.9671 4.1341C14.3966 2.7002 12.3337 1.92697 10.2076 1.97528C8.08154 2.02359 6.05592 2.88971 4.55216 4.39347C3.0484 5.89723 2.18228 7.92284 2.13397 10.0489C2.08566 12.175 2.85889 14.2379 4.29279 15.8084C5.7267 17.3789 7.71088 18.3361 9.83258 18.481C11.9543 18.6258 14.0501 17.9471 15.6842 16.586L21.3482 22.25L22.4087 21.1895ZM3.65866 10.25C3.65866 8.91494 4.05454 7.6099 4.79624 6.49987C5.53794 5.38983 6.59214 4.52467 7.82554 4.01378C9.05894 3.50289 10.4161 3.36921 11.7255 3.62966C13.0349 3.89011 14.2376 4.53299 15.1816 5.47699C16.1256 6.421 16.7685 7.62373 17.029 8.9331C17.2894 10.2425 17.1557 11.5997 16.6448 12.8331C16.134 14.0665 15.2688 15.1207 14.1588 15.8624C13.0487 16.6041 11.7437 17 10.4087 17C8.61905 16.998 6.90332 16.2862 5.63788 15.0207C4.37244 13.7553 3.66064 12.0396 3.65866 10.25Z"
                                  fill="#1F231F"
                                />
                              </svg>
                            </div>
                            <div style={{ height: "35px", width: "90%" }}>
                              <input
                                type="search"
                                placeholder="Rechercher..."
                                style={searchBar}
                                value={searchInput}
                                onChange={(e) => setsearchInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleSearch();
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <ListOtherCreateurs 
                        searchInput={searchInput} 
                        prof_searchData={prof_searchData}
                        handleFollowProf={handleFollowProf}
                      />
                    </div>
                  </Box>
                </Modal>
              </div>
            </Stack>
          </div>
        )}

        {/* Createurs similaires */}
        {prof_smilaire_list.length > 0 && (
          <div className="similaires">
            <Stack direction="column" spacing="24px">
              <motion.div
                initial={{ translateX: "-100px" }}
                animate={{ translateX: 0 }}
                transition={{ duration: 0.6 }}
                className="small_title"
              >
                <p>Créateurs similaires</p>
              </motion.div>
              <div className="cardSimilaire">
                <Swiper slidesPerView={"auto"} spaceBetween={24}>
                  {prof_smilaire_list.length > 0 &&
                    prof_smilaire_list.map((prof, index) => (
                      <SwiperSlide key={index}>
                        <CardProfUnFollow prof={prof} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </Stack>
          </div>
        )}

        {/* Createurs populaire */}
        {prof_populaire_list.length > 0 && (
          <div className="populaire">
            <Stack direction="column" spacing="24px">
              <motion.div
                initial={{ translateX: "-100px" }}
                animate={{ translateX: 0 }}
                transition={{ duration: 0.6 }}
                className="small_title"
              >
                <p>Créateurs populaires</p>
              </motion.div>
              <div className="cardSimilaire">
                <Swiper slidesPerView={"auto"} spaceBetween={24}>
                  {prof_populaire_list.length > 0 &&
                    prof_populaire_list.map((prof, index) => (
                      <SwiperSlide key={index}>
                        <CardProfUnFollow prof={prof} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </Stack>
          </div>
        )}
      </Stack>
    </motion.div>
  );
}

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "35%",
  height: "600px",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  borderRadius: "12px",
  outline: "none",
  border: "1px solid #FFF",
  boxShadow: 24,
  p: 0,
  overflow: "hidden",
};
