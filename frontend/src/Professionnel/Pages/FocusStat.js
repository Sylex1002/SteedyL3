import React, { useContext, useEffect, useState } from "react";
import LayoutDashboard from "../Layout/LayoutDashboard";
import { motion } from "framer-motion";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  accordion,
  cardStat,
  listLink,
  normalCardStat,
} from "../Components/LinkStats";
import "./styles/FocusStat.scss";

import eyeIcon from "../../Images/icons/solar_eye-outline.svg";
import { getAllFocusProfAction } from "../../Actions/ActionFocus";
import { GET_MY_FOCUS, GET_MY_FOCUS_ACTIVE } from "../../Reducers/ReducerFocus";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import FocusSerie from "../Components/FocusSerie";

export default function FocusStat() {
  const [sousMenu, setSousMenu] = useState(0);
  const [menuName, setMenuName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getIdPro } = useContext(AppContext);

  // focus
  const focus_list_active = useSelector(GET_MY_FOCUS_ACTIVE);
  const focus_list = useSelector(GET_MY_FOCUS);
  // get all focus of prof
  useEffect(() => {
    if (getIdPro !== null) {
      if (focus_list_active === false) {
        dispatch(getAllFocusProfAction(getIdPro));
      }
    }
  }, [dispatch, getIdPro, focus_list_active]);

  const [sommeComment, setSommeComment] = useState(0);
  const [sommeLike, setSommeLike] = useState(0);

  const nbrCommentAllFocusPro = () => {
    let nbrComment = [];

    if (focus_list.length !== 0) {
      for (let i = 0; i < focus_list.length; i++) {
        nbrComment.push(focus_list[i].comment_count);
      }
      const somme = nbrComment.reduce((x, y) => x + y);
      setSommeComment(parseInt(somme));
    }
  };

  const nbrLikeAllFocusPro = () => {
    let nbrLike = [];

    if (focus_list.length !== 0) {
      for (let i = 0; i < focus_list.length; i++) {
        nbrLike.push(focus_list[i].liked_by_count);
      }
      const somme = nbrLike.reduce((x, y) => x + y);
      setSommeLike(parseInt(somme));
    }
  };

  useEffect(() => {
    nbrCommentAllFocusPro();
    nbrLikeAllFocusPro();
  }, [sommeComment, sommeLike, focus_list]);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const ListMenu = ["", "fleche Stats fleche Vue d'ensemble", "fleche Gérer"];

  // Card nombre statistique
  const CardNbre = (nbre, title) => {
    return (
      <div className="card-nbre">
        <Stack direction="column" spacing="12px">
          <p className="nbre">{nbre}</p>
          <p>{title}</p>
        </Stack>
      </div>
    );
  };

  return (
    <LayoutDashboard>
      <motion.div
        initial={{ translateX: "-100px" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        <div className="box-title">
          <Stack direction='row' spacing='12px'>
            <div
              className="goBack"
              onClick={() => (sousMenu === 0 ? navigate(-1) : setSousMenu(0))}
            >
              <KeyboardArrowLeftIcon />
            </div>
            <div className="menu-stat-focus">
              <Stack direction="row" spacing="12px">
                <div
                  className="focus-titre"
                  style={sousMenu !== 0 ? { color: "grey" } : null}
                >
                  <p>Focus</p>
                </div>
                <div className="sous-titre">
                  <Stack
                    direction="row"
                    spacing="12px"
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <motion.div
                      initial={{ translateY: "-100px" }}
                      animate={{ translateY: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {ListMenu[sousMenu].replace(/fleche/g, `-`)}
                    </motion.div>
                  </Stack>
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
      </motion.div>

      {sousMenu === 0 && (
        <>
          <div className="stats">
            <motion.p
              className="titre"
              initial={{ translateX: "-100px" }}
              animate={{ translateX: 0 }}
              transition={{ duration: 0.6 }}
            >
              Stats
            </motion.p>

            <Stack direction="column" spacing={0.5}>
              {/* Vue d'ensemble */}
              {accordion(
                cardStat(
                  true,
                  eyeIcon,
                  listLink(
                    "",
                    "Vue d'ensemble",
                    "Il affiche les statistiques clés : nombre de focus, j'aime et commentaires, reflétant l'engagement et l'impact du contenu"
                  )
                ),
                <Stack direction="row" spacing={2}>
                  {CardNbre(
                    focus_list?.length < 9
                      ? "0" + focus_list?.length
                      : focus_list?.length,
                    "Nombre total des focus publiés"
                  )}
                  {CardNbre(
                    sommeLike < 9 ? "0" + sommeLike : sommeLike,
                    "Nombre total de j'aime"
                  )}
                  {CardNbre(
                    sommeComment < 9 ? "0" + sommeComment : sommeComment,
                    "Nombre total de commentaires"
                  )}
                </Stack>
              )}

              {/* Vue par focus */}
              {accordion(
                cardStat(true, eyeIcon, listLink("", "Vue par focus", lorem)),
                <Stack direction="column" spacing={2}>
                  {cardStat(
                    false,
                    "",
                    listLink("listLink", "Performance", lorem)
                  )}
                  {cardStat(
                    false,
                    "",
                    listLink("listLink", "Engagements", lorem)
                  )}
                </Stack>
              )}
            </Stack>
          </div>

          <div className="gerer">
            <motion.p
              initial={{ translateX: "-100px" }}
              animate={{ translateX: 0 }}
              transition={{ duration: 0.6 }}
              className="titre"
            >
              Gérer
            </motion.p>

            <Stack direction="column" spacing={0.5}>
              {/* Choisir les tops focus */}
              <div
                onClick={() => {
                  setSousMenu(2);
                  setMenuName("gerer");
                }}
              >
                {normalCardStat(
                  false,
                  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                    <path d="M41.3722 21.0474L32.8722 12.7355C32.6367 12.4998 32.3567 12.3133 32.0483 12.187C31.74 12.0608 31.4096 11.9972 31.0764 12.0001H19.2756C18.1417 12.0001 17.0541 12.4506 16.2523 13.2524C15.4505 14.0542 15 15.1418 15 16.2757V41.7244C15.0032 42.8574 15.4546 43.943 16.2558 44.7442C17.057 45.5454 18.1426 45.9968 19.2756 46H37.8661C38.9991 45.9968 40.0848 45.5454 40.886 44.7442C41.6871 43.943 42.1386 42.8574 42.1418 41.7244V22.8773C42.1425 22.5363 42.0747 22.1987 41.9425 21.8843C41.8103 21.57 41.6164 21.2854 41.3722 21.0474ZM39.2001 21.3039H35.1981C34.5177 21.3039 33.8652 21.0336 33.3841 20.5525C32.903 20.0714 32.6327 19.4189 32.6327 18.7385V14.8904L39.2001 21.3039ZM40.4315 41.7244C40.4315 42.4047 40.1612 43.0573 39.6801 43.5384C39.199 44.0195 38.5465 44.2897 37.8661 44.2897H19.2756C18.5953 44.2897 17.9427 44.0195 17.4616 43.5384C16.9805 43.0573 16.7103 42.4047 16.7103 41.7244V16.2757C16.7103 15.5954 16.9805 14.9428 17.4616 14.4617C17.9427 13.9806 18.5953 13.7104 19.2756 13.7104H30.9225V18.7385C30.9225 19.8725 31.373 20.96 32.1748 21.7618C32.9766 22.5637 34.0642 23.0141 35.1981 23.0141H40.4315V41.7244Z" fill="black" />
                  </svg>,
                  "Série de focus",
                  true,
                  lorem
                )}
              </div>

              {/* Supprimer un focus */}
              {normalCardStat(
                false,
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M27.4468 12H30.8488C32.3024 12 33.5134 12 34.4738 12.1294C35.4893 12.2652 36.406 12.5659 37.1417 13.3016C37.879 14.0389 38.1798 14.9557 38.3156 15.9695C38.4191 16.7391 38.4401 17.6672 38.4449 18.7489C39.6479 18.9753 40.6779 19.4021 41.5203 20.2429C42.4936 21.2163 42.9108 22.4419 43.108 23.8971C43.2956 25.2989 43.2956 27.0824 43.2956 29.2927V31.1537C43.2956 33.0438 43.2956 34.554 43.1679 35.7845C43.0369 37.057 42.762 38.1322 42.1492 39.1234C41.5348 40.1161 40.6973 40.8421 39.6188 41.5293C38.5743 42.1922 37.2226 42.8681 35.5329 43.7121L35.4747 43.7428L35.2014 43.8786C32.629 45.1673 30.9652 46 29.1478 46C27.3304 46 25.6666 45.1673 23.0942 43.8803L22.8193 43.7428L22.7627 43.7137C21.073 42.8681 19.7213 42.1938 18.6768 41.5293C17.5983 40.8421 16.7608 40.1145 16.1464 39.1234C15.5336 38.1322 15.2587 37.057 15.1277 35.7845C15 34.5556 15 33.0438 15 31.1537V29.2943C15 27.0824 15 25.3006 15.1892 23.8971C15.3832 22.4419 15.8036 21.2163 16.7753 20.2429C17.6161 19.4021 18.6477 18.9753 19.8523 18.7489C19.8555 17.6656 19.8765 16.7391 19.98 15.9711C20.1158 14.9557 20.4166 14.0389 21.1523 13.3032C21.8896 12.5659 22.8064 12.2652 23.8201 12.1294C24.7822 12 25.9949 12 27.4468 12ZM22.2792 18.5096C23.3108 18.4676 24.4895 18.4676 25.8251 18.4676H32.4705C33.8045 18.4676 34.9848 18.4676 36.0164 18.5096C36.0099 17.567 35.9889 16.8604 35.9113 16.2945C35.811 15.5475 35.638 15.2273 35.4262 15.0171C35.216 14.8069 34.8975 14.6339 34.1521 14.5321C33.3711 14.4286 32.3234 14.4253 30.7647 14.4253H27.5309C25.9722 14.4253 24.9245 14.4286 24.1435 14.5337C23.3981 14.6339 23.078 14.8069 22.8678 15.0187C22.6576 15.2289 22.4846 15.5475 22.3827 16.2928C22.3067 16.8604 22.2857 17.5686 22.2792 18.5096ZM20.7529 21.0594C19.5661 21.2195 18.9387 21.5122 18.4909 21.9584C18.043 22.4063 17.752 23.0337 17.5919 24.2221C17.4286 25.4412 17.4253 27.0613 17.4253 29.3816V31.089C17.4253 33.0584 17.4253 34.4441 17.5385 35.5355C17.6501 36.5978 17.857 37.2769 18.2095 37.8476C18.5636 38.42 19.0778 38.9083 19.98 39.4823C20.9049 40.0709 22.1434 40.6917 23.9058 41.573C26.8534 43.0476 27.9739 43.5747 29.1478 43.5747C30.3217 43.5747 31.4438 43.0476 34.3898 41.573C36.1522 40.6934 37.3907 40.0709 38.3156 39.4823C39.2178 38.9083 39.732 38.42 40.0861 37.8492C40.4386 37.2769 40.6455 36.5978 40.7555 35.5355C40.8687 34.4441 40.8703 33.0584 40.8703 31.089V29.3816C40.8703 27.0613 40.867 25.4412 40.7037 24.2205C40.5437 23.0337 40.251 22.4063 39.8047 21.9584C39.3569 21.5106 38.7295 21.2195 37.5411 21.0594C36.3203 20.8961 34.7018 20.8929 32.3816 20.8929H25.914C23.5938 20.8929 21.9737 20.8961 20.7529 21.0594ZM29.1478 27.8197C29.054 27.983 28.9489 28.1705 28.826 28.392L28.6676 28.6766L28.6304 28.7413C28.5043 28.9741 28.2941 29.3589 27.9432 29.6257C27.5859 29.8974 27.1542 29.9912 26.9036 30.0461L26.8324 30.0607L26.5252 30.1302C26.2406 30.1949 26.0094 30.2466 25.8138 30.2967C25.9415 30.4536 26.108 30.6508 26.3247 30.9031L26.5349 31.1505L26.5834 31.2054C26.758 31.4076 27.0394 31.7309 27.1703 32.1513C27.2997 32.5652 27.2544 32.9921 27.2269 33.2605C27.2241 33.2858 27.2214 33.3112 27.2189 33.3365L27.1865 33.6647C27.1623 33.9125 27.1396 34.1604 27.1186 34.4085C27.2884 34.3341 27.4792 34.2468 27.7072 34.1417L27.9966 34.0091L28.0613 33.9768C28.2941 33.8685 28.6967 33.6793 29.1478 33.6793C29.5989 33.6793 30.0015 33.8685 30.2344 33.9784L30.299 34.0091L30.5885 34.1417C30.8148 34.2468 31.0088 34.3357 31.177 34.4085C31.156 34.1604 31.1333 33.9125 31.1091 33.6647L31.0768 33.3365C31.0742 33.3112 31.0715 33.2858 31.0687 33.2605C31.0412 32.9905 30.9959 32.5652 31.1253 32.1513C31.2546 31.7309 31.5376 31.4076 31.7122 31.2054L31.7607 31.1505L31.9709 30.9047C32.1876 30.6508 32.3541 30.4536 32.4818 30.2967C32.2862 30.2482 32.055 30.1949 31.7704 30.1302L31.4632 30.0607L31.392 30.0445C31.1414 29.9912 30.7097 29.8974 30.3524 29.6241C30.0015 29.3589 29.7913 28.9741 29.6652 28.7429L29.628 28.6766L29.4696 28.392C29.3467 28.1705 29.2432 27.983 29.1478 27.8197ZM27.5535 25.8244C27.8317 25.4606 28.3361 24.9351 29.1478 24.9351C29.9595 24.9351 30.464 25.4606 30.7421 25.8244C31.0088 26.1704 31.2756 26.6507 31.5505 27.1438L31.5877 27.2101L31.7461 27.4963L31.8383 27.658L31.9984 27.6952L32.3056 27.7647L32.3832 27.7809C32.9119 27.9021 33.439 28.0202 33.8433 28.1802C34.2895 28.3565 34.8942 28.6976 35.1287 29.4495C35.3583 30.1852 35.0689 30.8093 34.8166 31.2119C34.5822 31.5838 34.2265 31.9977 33.8627 32.423L33.8142 32.4796L33.604 32.7269L33.4714 32.8838C33.4746 32.942 33.4827 33.0099 33.4908 33.1021L33.5231 33.4303L33.5296 33.5047C33.5846 34.0738 33.6379 34.6235 33.6185 35.0633C33.5991 35.5258 33.4892 36.2243 32.8618 36.698C32.215 37.1896 31.5036 37.0828 31.0509 36.9519C30.6337 36.8338 30.1406 36.6059 29.6442 36.3779L29.5747 36.3455L29.2836 36.2113L29.1478 36.1483L29.0104 36.213L28.7209 36.3455L28.6498 36.3779C28.155 36.6059 27.6619 36.8338 27.2447 36.9519C26.792 37.0812 26.0806 37.1896 25.4338 36.698C24.8081 36.2243 24.6965 35.5258 24.6771 35.065C24.6577 34.6236 24.7094 34.0738 24.766 33.5047L24.7725 33.4303L24.8048 33.1021L24.8259 32.8838C24.7815 32.8312 24.7367 32.7789 24.6916 32.7269L24.4815 32.4796C24.4653 32.4607 24.4491 32.4418 24.4329 32.423C24.0691 31.9977 23.7134 31.5822 23.479 31.2103C23.2267 30.8093 22.9373 30.1852 23.1669 29.4479C23.3998 28.6993 24.0061 28.3565 24.4523 28.1802C24.8566 28.0202 25.3837 27.9021 25.9124 27.7825L25.9884 27.7663L26.2972 27.6952L26.4589 27.658L26.5495 27.4963L26.7079 27.2101L26.7451 27.1438C27.02 26.6507 27.2868 26.1704 27.5535 25.8244Z" fill="black" />
                </svg>,
                "Choisir les tops focus",
                true,
                lorem
              )}
            </Stack>
          </div>
        </>
      )}

      {/* Vue d'ensemble */}
      {sousMenu === 2 && <FocusSerie menuName={menuName} />}
    </LayoutDashboard>
  );
}
