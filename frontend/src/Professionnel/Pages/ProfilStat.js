import React, { useState } from "react";
import "./styles/ProfilStat.scss";
import LayoutDashboard from "../Layout/LayoutDashboard";
import { Box, Modal, Stack, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  accordion,
  cardStat,
  listLink,
  normalCardStat,
} from "../Components/LinkStats";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
// import { useCookies } from "react-cookie";
import {
  logoutUserInfoAction,
  updateUserInfoAction,
} from "../../Actions/actionAuth";
// Icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UploadImagePro from "../Components/UploadImagePro";

import {
  FacebookShareButton,
  //   InstapaperShareButton,
  WhatsappShareButton,
  //   InstagramShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { deleteCookie } from "../../Helpers/Utils";
import { BaseURL } from "../../Helpers/ServiceApi";

export default function ProfilStat() {
  const user = useSelector(GET_USER_INFO_CONNECT);
  const dispatch = useDispatch();
  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [description, setDescription] = useState(user.bio);

  const deconnecter = async (e) => {
    e.preventDefault();
    await dispatch(logoutUserInfoAction());
    deleteCookie('access_token');
    navigate("/login");
  };

  const [state, setState] = useState(false);

  const navigate = useNavigate();

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClosed = () => {
    setState(false);
  };

  const handleUpdateDescription = async (e) => {
    e.preventDefault();

    const formData = {
      bio: description,
    };

    try {
      await dispatch(updateUserInfoAction(user.id, formData));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LayoutDashboard>
      <motion.div
        initial={{ translateX: "-100px" }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        <Stack direction="row" spacing={2}>
          <div className="goBack" onClick={() => navigate(-1)}>
            <KeyboardArrowLeftIcon />
          </div>
          <p>Votre profil</p>
        </Stack>
      </motion.div>

      <div className="stats">
        <p className="titre">Stats</p>

        <Stack direction="column" spacing={0.5}>
          {/* Nombre abonne */}
          {accordion(cardStat(false,
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
              <path d="M29.0002 26.3636C32.4143 26.3636 35.182 23.5959 35.182 20.1818C35.182 16.7677 32.4143 14 29.0002 14C25.5861 14 22.8184 16.7677 22.8184 20.1818C22.8184 23.5959 25.5861 26.3636 29.0002 26.3636Z" stroke="black" strokeWidth="2.5" />
              <path d="M38.2736 24.8182C40.8344 24.8182 42.91 23.0873 42.91 20.9546C42.91 18.8219 40.8344 17.0909 38.2736 17.0909M19.7282 24.8182C17.1673 24.8182 15.0918 23.0873 15.0918 20.9546C15.0918 18.8219 17.1673 17.0909 19.7282 17.0909" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M29.0012 43.3636C34.1224 43.3636 38.274 40.5959 38.274 37.1818C38.274 33.7677 34.1224 31 29.0012 31C23.8801 31 19.7285 33.7677 19.7285 37.1818C19.7285 40.5959 23.8801 43.3636 29.0012 43.3636Z" stroke="black" strokeWidth="2.5" />
              <path d="M41.3636 40.2727C44.0744 39.6777 46 38.1724 46 36.409C46 34.6457 44.0744 33.1404 41.3636 32.5454M16.6364 40.2727C13.9256 39.6777 12 38.1724 12 36.409C12 34.6457 13.9256 33.1404 16.6364 32.5454" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            , listLink('', 'Nombre d\'abonnées', lorem)),
            <div className='nbre-abonne'>
              <Stack direction='column' spacing='12px' sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <p>{user.following.length}</p>
                <span>Abonne{user.following.length > 1 && "s"}</span>
              </Stack>
            </div>
          )}

          {/* Nombre visite */}
          {accordion(
            cardStat(
              false,
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.0005 22.907C27.4277 22.907 25.9194 23.5318 24.8072 24.6439C23.6951 25.756 23.0703 27.2644 23.0703 28.8372C23.0703 30.41 23.6951 31.9184 24.8072 33.0305C25.9194 34.1427 27.4277 34.7674 29.0005 34.7674C30.5733 34.7674 32.0817 34.1427 33.1939 33.0305C34.306 31.9184 34.9308 30.41 34.9308 28.8372C34.9308 27.2644 34.306 25.756 33.1939 24.6439C32.0817 23.5318 30.5733 22.907 29.0005 22.907ZM25.4424 28.8372C25.4424 27.8935 25.8173 26.9885 26.4846 26.3212C27.1518 25.6539 28.0569 25.2791 29.0005 25.2791C29.9442 25.2791 30.8492 25.6539 31.5165 26.3212C32.1838 26.9885 32.5587 27.8935 32.5587 28.8372C32.5587 29.7809 32.1838 30.6859 31.5165 31.3532C30.8492 32.0205 29.9442 32.3954 29.0005 32.3954C28.0569 32.3954 27.1518 32.0205 26.4846 31.3532C25.8173 30.6859 25.4424 29.7809 25.4424 28.8372Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29 15C21.8616 15 17.0526 19.2761 14.2614 22.9022L14.2124 22.9671C13.5798 23.7878 12.9994 24.5421 12.6057 25.434C12.1834 26.3908 12 27.4329 12 28.8372C12 30.2415 12.1834 31.2836 12.6057 32.2404C13.001 33.1323 13.5814 33.8882 14.2124 34.7073L14.263 34.7722C17.0526 38.3983 21.8616 42.6744 29 42.6744C36.1384 42.6744 40.9474 38.3983 43.7386 34.7722L43.7876 34.7073C44.4202 33.8882 45.0006 33.1323 45.3943 32.2404C45.8166 31.2836 46 30.2415 46 28.8372C46 27.4329 45.8166 26.3908 45.3943 25.434C44.999 24.5421 44.4186 23.7878 43.7876 22.9671L43.737 22.9022C40.9474 19.2761 36.1384 15 29 15ZM16.1433 24.3492C18.7178 21.0014 22.9116 17.3721 29 17.3721C35.0884 17.3721 39.2807 21.0014 41.8567 24.3492C42.5526 25.2506 42.9574 25.7883 43.2247 26.3924C43.4745 26.9585 43.6279 27.6496 43.6279 28.8372C43.6279 30.0248 43.4745 30.7159 43.2247 31.282C42.9574 31.8861 42.551 32.4238 41.8583 33.3252C39.2791 36.673 35.0884 40.3023 29 40.3023C22.9116 40.3023 18.7193 36.673 16.1433 33.3252C15.4474 32.4238 15.0426 31.8861 14.7753 31.282C14.5255 30.7159 14.3721 30.0248 14.3721 28.8372C14.3721 27.6496 14.5255 26.9585 14.7753 26.3924C15.0426 25.7883 15.4506 25.2506 16.1433 24.3492Z"
                  fill="black"
                />
              </svg>,
              listLink("", "Nombre de visites de profil", lorem)
            ),
            null
          )}

          {/* Revenu total */}
          {accordion(
            cardStat(
              false,
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
              >
                <path
                  d="M18.7988 24.9009H25.5988"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M44.0157 26.6008H39.5923C36.5578 26.6008 34.0996 28.8839 34.0996 31.7008C34.0996 34.5177 36.5595 36.8008 39.5906 36.8008H44.0157C44.1585 36.8008 44.2282 36.8008 44.2877 36.7974C45.2057 36.7413 45.9367 36.063 45.9962 35.2113C45.9996 35.1569 45.9996 35.0906 45.9996 34.9597V28.4419C45.9996 28.311 45.9996 28.2447 45.9962 28.1903C45.935 27.3386 45.2057 26.6603 44.2877 26.6042C44.2282 26.6008 44.1585 26.6008 44.0157 26.6008Z"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M44.2405 26.6008C44.1079 23.4184 43.6829 21.4668 42.3076 20.0932C40.3169 18.1008 37.1107 18.1008 30.7 18.1008H25.6C19.1893 18.1008 15.9831 18.1008 13.9924 20.0932C12 22.0839 12 25.2901 12 31.7008C12 38.1115 12 41.3177 13.9924 43.3084C15.9831 45.3008 19.1893 45.3008 25.6 45.3008H30.7C37.1107 45.3008 40.3169 45.3008 42.3076 43.3084C43.6829 41.9348 44.1096 39.9832 44.2405 36.8008"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M18.7988 18.1009L25.1483 13.89C26.0413 13.3092 27.0836 13 28.1488 13C29.2141 13 30.2564 13.3092 31.1493 13.89L37.4988 18.1009"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M39.1836 31.7009H39.2006"
                  stroke="black"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>,
              listLink("", "Revenu total", lorem)
            ),
            null
          )}

          {/* Source abonnee */}
          {accordion(
            cardStat(
              false,
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
              >
                <path
                  d="M42.8798 38.8332C43.666 38.1737 44.2303 37.2883 44.496 36.2972C44.7617 35.306 44.716 34.2571 44.3651 33.2928C44.0142 32.3285 43.3751 31.4955 42.5346 30.9069C41.694 30.3183 40.6927 30.0025 39.6665 30.0025C38.6404 30.0025 37.6391 30.3183 36.7985 30.9069C35.9579 31.4955 35.3188 32.3285 34.968 33.2928C34.6171 34.2571 34.5714 35.306 34.8371 36.2972C35.1028 37.2883 35.667 38.1737 36.4532 38.8332C35.701 39.2439 35.0397 39.8026 34.5092 40.4758C33.9787 41.1489 33.59 41.9225 33.3666 42.7499C33.3328 42.8768 33.3244 43.0091 33.3419 43.1393C33.3593 43.2695 33.4022 43.395 33.4681 43.5086C33.5341 43.6222 33.6217 43.7217 33.7261 43.8014C33.8305 43.8811 33.9496 43.9395 34.0766 43.9732C34.1604 43.9949 34.2466 44.0061 34.3332 44.0065C34.5538 44.0066 34.7681 43.9337 34.943 43.7992C35.1178 43.6648 35.2433 43.4763 35.2999 43.2632C35.8099 41.3332 37.6049 39.9999 39.6665 39.9999C41.7282 39.9999 43.5232 41.3332 44.0332 43.2565C44.1012 43.5129 44.2684 43.7317 44.4978 43.8649C44.7272 43.998 45.0001 44.0346 45.2565 43.9665C45.5129 43.8984 45.7317 43.7313 45.8649 43.5019C45.998 43.2725 46.0346 42.9996 45.9665 42.7432C45.7422 41.917 45.3532 41.1447 44.8227 40.4728C44.2923 39.8009 43.6314 39.2432 42.8798 38.8332ZM39.6665 31.9999C40.2599 31.9999 40.8399 32.1759 41.3332 32.5055C41.8266 32.8351 42.2111 33.3037 42.4382 33.8519C42.6652 34.4 42.7246 35.0032 42.6089 35.5852C42.4931 36.1671 42.2074 36.7017 41.7878 37.1212C41.3683 37.5408 40.8337 37.8265 40.2518 37.9422C39.6699 38.058 39.0667 37.9986 38.5185 37.7715C37.9703 37.5445 37.5018 37.1599 37.1721 36.6666C36.8425 36.1733 36.6665 35.5932 36.6665 34.9999C36.6665 34.2043 36.9826 33.4412 37.5452 32.8786C38.1078 32.316 38.8709 31.9999 39.6665 31.9999ZM45.9998 20.3333V25.6666C45.9998 25.9318 45.8945 26.1862 45.7069 26.3737C45.5194 26.5612 45.2651 26.6666 44.9998 26.6666C44.7346 26.6666 44.4803 26.5612 44.2927 26.3737C44.1052 26.1862 43.9998 25.9318 43.9998 25.6666V20.3333C43.9998 20.2449 43.9647 20.1601 43.9022 20.0976C43.8397 20.0351 43.7549 20 43.6665 20H29.4449C28.9401 20 28.4488 19.8362 28.0449 19.5333L23.4216 16.0667C23.3639 16.0234 23.2937 16 23.2216 16H14.3333C14.2449 16 14.1601 16.0351 14.0976 16.0976C14.0351 16.1601 14 16.2449 14 16.3333V38.9999C14 39.0883 14.0351 39.1731 14.0976 39.2356C14.1601 39.2981 14.2449 39.3332 14.3333 39.3332H27.6666C27.9318 39.3332 28.1862 39.4386 28.3737 39.6261C28.5612 39.8136 28.6666 40.068 28.6666 40.3332C28.6666 40.5984 28.5612 40.8528 28.3737 41.0403C28.1862 41.2278 27.9318 41.3332 27.6666 41.3332H14.3333C13.7145 41.3332 13.121 41.0874 12.6834 40.6498C12.2458 40.2122 12 39.6187 12 38.9999V16.3333C12 15.7145 12.2458 15.121 12.6834 14.6834C13.121 14.2458 13.7145 14 14.3333 14H23.2216C23.7265 14 24.2177 14.1637 24.6216 14.4667L29.2449 17.9333C29.3026 17.9766 29.3728 18 29.4449 18H43.6665C44.2853 18 44.8788 18.2458 45.3164 18.6834C45.754 19.121 45.9998 19.7145 45.9998 20.3333Z"
                  fill="black"
                />
              </svg>,
              listLink("", "Source des abonnées", lorem)
            ),
            <Stack direction="column" spacing={2}>
              {cardStat(
                false,
                "",
                listLink("listLink", "Réseaux sociaux", lorem)
              )}
              {cardStat(false, "", listLink("listLink", "Site web", lorem))}
              {cardStat(false, "", listLink("listLink", "Email", lorem))}
              {cardStat(false, "", listLink("listLink", "Autres", lorem))}
            </Stack>
          )}
        </Stack>
      </div>

      {/* Gerer */}
      <div className="gerer">
        <p className="titre">Gérer</p>

        <Stack direction="column" spacing={0.5}>
          {/* Lien profil */}
          {accordion(
            cardStat(
              false,
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
              >
                <path
                  d="M37.6996 19.9375H32.4796C31.5226 19.9375 30.7396 20.7205 30.7396 21.6775C30.7396 22.6345 31.5226 23.4175 32.4796 23.4175H37.6996C40.5706 23.4175 42.9196 25.7665 42.9196 28.6375C42.9196 31.5085 40.5706 33.8575 37.6996 33.8575H32.4796C31.5226 33.8575 30.7396 34.6405 30.7396 35.5975C30.7396 36.5545 31.5226 37.3375 32.4796 37.3375H37.6996C42.502 37.3375 46.3996 33.4399 46.3996 28.6375C46.3996 23.8351 42.502 19.9375 37.6996 19.9375ZM22.0396 28.6375C22.0396 29.5945 22.8226 30.3775 23.7796 30.3775H34.2196C35.1766 30.3775 35.9596 29.5945 35.9596 28.6375C35.9596 27.6805 35.1766 26.8975 34.2196 26.8975H23.7796C22.8226 26.8975 22.0396 27.6805 22.0396 28.6375ZM25.5196 33.8575H20.2996C17.4286 33.8575 15.0796 31.5085 15.0796 28.6375C15.0796 25.7665 17.4286 23.4175 20.2996 23.4175H25.5196C26.4766 23.4175 27.2596 22.6345 27.2596 21.6775C27.2596 20.7205 26.4766 19.9375 25.5196 19.9375H20.2996C15.4972 19.9375 11.5996 23.8351 11.5996 28.6375C11.5996 33.4399 15.4972 37.3375 20.2996 37.3375H25.5196C26.4766 37.3375 27.2596 36.5545 27.2596 35.5975C27.2596 34.6405 26.4766 33.8575 25.5196 33.8575Z"
                  fill="black"
                />
              </svg>,
              listLink("", "Lien profil", lorem)
            ),
            <div className="linkPro">
              <p className="copyLink">
                {cardStat(
                  false,
                  "",
                  listLink(
                    "listLink",
                    "",
                    `http://localhost:3000/visiteur/createur/${user.first_name.toLowerCase()}.${user.last_name.toLowerCase()}`
                  )
                )}
              </p>
              <div className="btn">
                <Stack direction="row" spacing="12px">
                  <button
                    className="btnCopy"
                    onClick={() => {
                      // const text = document.querySelector('.copyLink').textContent;
                      const text = `http://localhost:3000/visiteur/createur/${user.id}`;
                      navigator.clipboard.writeText(text);
                      setState(true);
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <ContentCopyIcon sx={{ width: 14, height: 14 }} />
                      <p>Copier</p>
                    </Stack>
                  </button>

                  <FacebookShareButton
                    url={`https://66e2-154-126-108-102.ngrok-free.app/visiteur/createur/${user.id}`}
                    quote="Exemple titre"
                    imageUrl="https://www.bing.com/images/search?view=detailV2&ccid=sI%2FAt3px&id=E17CA65983724841CAC51E340FAC3398F2DA00FD&thid=OIP.sI_At3px9qmLx-9TNEee0gHaGK&mediaurl=https%3A%2F%2Fpmm.nasa.gov%2Fsites%2Fdefault%2Ffiles%2FNASA-Logo-Large.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.b08fc0b77a71f6a98bc7ef5334479ed2%3Frik%3D%252fQDa8pgzrA80Hg%26pid%3DImgRaw%26r%3D0&exph=1362&expw=1638&q=image+logo&simid=608052225883047916&form=IRPRST&ck=73C44720939CF13BD9AE16C6462C831D&selectedindex=32&ajaxhist=0&ajaxserp=0&vt=0&sim=11"
                  >
                    <FacebookIcon size="30px" round />
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={`https://66e2-154-126-108-102.ngrok-free.app/visiteur/createur/${user.id}`}
                    quote="Exemple titre"
                    title="Hello Safidy"
                  >
                    <WhatsappIcon size="30px" round />
                  </WhatsappShareButton>

                  <TwitterShareButton
                    url={`https://66e2-154-126-108-102.ngrok-free.app/visiteur/createur/${user.id}`}
                    quote="Exemple titre"
                  >
                    <TwitterIcon size="30px" round />
                  </TwitterShareButton>
                </Stack>
              </div>
            </div>
          )}

          {accordion(
            cardStat(
              false,
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
              >
                <path
                  d="M44.2166 13.7814C43.076 12.6408 41.529 12 39.9159 12C38.3029 12 36.7559 12.6408 35.6152 13.7814L15.2984 34.0983C14.6079 34.7888 14.1224 35.6573 13.896 36.6073L12.0346 44.4301C11.9842 44.642 11.9889 44.8632 12.0483 45.0728C12.1077 45.2823 12.2198 45.4732 12.3739 45.6271C12.528 45.781 12.719 45.8929 12.9286 45.9521C13.1382 46.0112 13.3595 46.0157 13.5713 45.9651L21.3924 44.102C22.3429 43.8759 23.2121 43.3904 23.9031 42.6996L44.2166 22.3861C45.3572 21.2455 45.998 19.6985 45.998 18.0855C45.998 16.4724 45.3572 14.9254 44.2166 13.7848V13.7814ZM37.4171 15.5832C37.7453 15.2551 38.1348 14.9948 38.5636 14.8172C38.9923 14.6396 39.4518 14.5482 39.9159 14.5482C40.38 14.5482 40.8395 14.6396 41.2683 14.8172C41.697 14.9948 42.0866 15.2551 42.4147 15.5832C42.7429 15.9114 43.0032 16.301 43.1808 16.7297C43.3584 17.1584 43.4498 17.618 43.4498 18.0821C43.4498 18.5461 43.3584 19.0057 43.1808 19.4344C43.0032 19.8631 42.7429 20.2527 42.4147 20.5809L40.8984 22.0955L35.9008 17.0995L37.4171 15.5849V15.5832ZM34.099 18.9048L39.0966 23.899L22.0979 40.8977C21.7409 41.2547 21.2921 41.5046 20.8008 41.6219L14.9941 43.0056L16.3761 37.1988C16.4934 36.7059 16.745 36.2571 17.1019 35.9001L34.099 18.9014V18.9048Z"
                  fill="black"
                />
              </svg>,
              listLink("", "Votre profil", lorem)
            ),
            <Stack direction="column" spacing={2}>
              <div onClick={() => setOpenUploadImage(!openUploadImage)}>
                {cardStat(
                  false,
                  "",
                  listLink("listLink", "Modifier photo de profil", lorem)
                )}
              </div>

              <Modal
                open={openUploadImage}
                onClose={() => setOpenUploadImage(!openUploadImage)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <UploadImagePro
                    id={user.id}
                    image={`${BaseURL}${user.image_url}`}
                  />
                </Box>
              </Modal>

              <div onClick={() => setOpenDescription(!openDescription)}>
                {cardStat(
                  false,
                  "",
                  listLink("listLink", "Modifier la description", lorem)
                )}
              </div>

              <Modal
                open={openDescription}
                onClose={() => setOpenDescription(!openDescription)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <p style={{ fontSize: "18px", fontWeight: "600" }}>
                    Modifier votre description
                  </p>
                  <TextField
                    id="description"
                    label="Entrer la description"
                    margin="normal"
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    size="small"
                    style={{ marginTop: "14px" }}
                    InputLabelProps={{
                      style: {
                        fontSize: "14px",
                      },
                    }}
                    rows={3}
                    fullWidth
                    value={description}
                    autoComplete="false"
                  />
                  <button
                    onClick={handleUpdateDescription}
                    style={styleBtnDesc}
                  >
                    Enregistrer
                  </button>
                </Box>
              </Modal>
            </Stack>
          )}

          {/* Deconnecter */}
          <div className="logout" onClick={deconnecter}>
            {normalCardStat(
              false,
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 58 58"
                fill="none"
              >
                <path
                  d="M22.207 20.3906C22.2277 16.6455 22.3947 14.6172 23.7171 13.2948C25.2306 11.7812 27.6654 11.7812 32.5348 11.7812H34.2567C39.1279 11.7812 41.5626 11.7812 43.0762 13.2948C44.588 14.8066 44.588 17.243 44.588 22.1125V35.8875C44.588 40.757 44.588 43.1934 43.0762 44.7052C41.5609 46.2187 39.1279 46.2187 34.2567 46.2187H32.5348C27.6654 46.2187 25.2306 46.2187 23.7171 44.7052C22.3947 43.3828 22.2277 41.3545 22.207 37.6094"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M22.2031 41.9141C18.1447 41.9141 16.1146 41.9141 14.8542 40.6536C13.5938 39.3915 13.5938 37.3631 13.5938 33.3047V24.6953C13.5938 20.6369 13.5938 18.6068 14.8542 17.3463C16.1146 16.0859 18.1447 16.0859 22.2031 16.0859"
                  stroke="black"
                  strokeWidth="3"
                />
                <path
                  d="M34.2566 29.0001H18.7598M18.7598 29.0001L22.2035 32.4439M18.7598 29.0001L22.2035 25.5564"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>,
              listLink("", <p>Se déconnecter</p>, ""),
              false
            )}
          </div>
        </Stack>
      </div>

      {/* Alert after coping link */}
      <Snackbar open={state} onClose={handleClosed} autoHideDuration={4000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Le lien de votre profil a été copier!
        </Alert>
      </Snackbar>
    </LayoutDashboard>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  borderRadius: "12px",
  border: "1px solid #FFF",
  boxShadow: 24,
  padding: "24px",
};

const styleBtnDesc = {
  width: "100%",
  padding: "8px 24px",
  borderRadius: "8px",
  outline: "none",
  backgroundColor: "var(--bg)",
  fontSize: "14px",
  color: "#FFFFFF",
  border: "1px solid var(--bg)",
  marginTop: "12px",
  cursor: "pointer",
};
