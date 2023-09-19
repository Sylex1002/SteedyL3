import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/message.scss";

import SkeletonHighlightSlide from "../../Components/SkeletonHighlightSlide";
import SlideItems from "../../../Etudiant/components/SwiperHighlight";
import { AppContext } from "../../../Context/AppContext";
import { SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";
import { Badge, Stack } from "@mui/material";
import PropTypes from "prop-types";
import {
  BaseURL,
  verificationCloudinaryHighlight,
} from "../../../Helpers/ServiceApi";

export default function ListUser({
  setUserDetMessage,
  user_matricule,
  highlightList,
  fonction,
  conversations,
}) {
  const { setInitialSliding } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleUserClick = async (user) => {
    setUserDetMessage(user);
  };

  return (
    <div className="User-list">
      <div className="search-bar">
        <div className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M21.75 21.1895L16.086 15.5255C17.4471 13.8915 18.1258 11.7957 17.981 9.67395C17.8361 7.55225 16.8789 5.56807 15.3084 4.13416C13.7379 2.70026 11.675 1.92703 9.54893 1.97534C7.42284 2.02365 5.39723 2.88977 3.89347 4.39353C2.38971 5.89729 1.52359 7.92291 1.47528 10.049C1.42697 12.1751 2.2002 14.2379 3.6341 15.8085C5.06801 17.379 7.05219 18.3362 9.17389 18.481C11.2956 18.6259 13.3914 17.9471 15.0255 16.586L20.6895 22.25L21.75 21.1895ZM2.99996 10.25C2.99996 8.915 3.39585 7.60996 4.13754 6.49993C4.87924 5.38989 5.93345 4.52473 7.16685 4.01384C8.40025 3.50295 9.75745 3.36927 11.0668 3.62973C12.3762 3.89018 13.5789 4.53305 14.5229 5.47706C15.4669 6.42106 16.1098 7.62379 16.3703 8.93317C16.6307 10.2425 16.497 11.5997 15.9862 12.8331C15.4753 14.0665 14.6101 15.1207 13.5001 15.8624C12.39 16.6041 11.085 17 9.74996 17C7.96036 16.998 6.24463 16.2862 4.97919 15.0208C3.71375 13.7554 3.00195 12.0396 2.99996 10.25Z"
              fill="#AFAFAF"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Faire un recherche…"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <div className="story-list">
        <Stack direction="column" spacing="24px">
          <p style={{ fontSize: "14px", fontWeight: "600" }}>HIGHLIGHT</p>
          <div className="story-list-container">
            <ListHightLight
              highlightList={highlightList}
              navigate={navigate}
              setInitialSliding={setInitialSliding}
            />
          </div>
        </Stack>
      </div>
      <div className="listUser-container">
        <Stack direction="column" spacing="24px">
          <p style={{ fontSize: "14px", fontWeight: "600" }}>MESSAGES</p>

          {conversations.length > 0 &&
            conversations
              .filter((item) =>
                `${item?.other_user.first_name} ${item?.other_user.last_name}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((chat, index) => (
                <CardUser
                  menuUrl={user_matricule}
                  handleUserClick={handleUserClick}
                  user={chat.other_user}
                  key={index}
                  fonction={fonction}
                  last_message={chat.last_message?.content}
                  chat={chat}
                />
              ))}
        </Stack>
      </div>
    </div>
  );
}

ListUser.propTypes = {
  highlightList: PropTypes.array.isRequired,
  profs: PropTypes.array.isRequired,
  baseUrl: PropTypes.string.isRequired,
  userID: PropTypes.object.isRequired,
  userDetMessage: PropTypes.object.isRequired,
  setUserDetMessage: PropTypes.object.isRequired,
  userDetected: PropTypes.string.isRequired,
  profsActive: PropTypes.bool.isRequired,
  user_matricule: PropTypes.string.isRequired,
  fonction: PropTypes.string.isRequired,
  conversations: PropTypes.array.isRequired,
};

const CardUser = (props) => {
  const { menuUrl, handleUserClick, user, fonction, last_message, chat } =
    props;
  const [readMessage, setreadMessage] = useState(false);
  useEffect(() => {
    if(chat.last_message){
      setreadMessage(chat.last_message.read);
    }
  }, [setreadMessage]);

  return (
    <Stack direction="column" spacing="12px">
      <Badge
        color={!readMessage ? "error" : "default"} // Condition de couleur
        badgeContent=" "
        variant={!readMessage ? "dot" : "standard"} // Condition de variante
        className={
          user?.matricule === menuUrl
            ? "listUser-card active-user"
            : "listUser-card"
        }
      >
        <Link
          to={`/${fonction}/messages/${user.matricule}`}
          onClick={() => {
            setreadMessage(true);
            handleUserClick(user);
          }}
        >
          <div className="profil-user">
            <Stack direction="row" spacing="12px">
              <div className="profil">
                <img
                  className="profil-content-image"
                  src={`${BaseURL}${user.image_url}`}
                  alt="Profil-image"
                />
              </div>
              <div className="profil-name">
                <span>
                  {user.first_name} {user.last_name}
                </span>
                <p>
                  {last_message?.length > 25
                    ? last_message.slice(0, 25) + "..."
                    : last_message}
                </p>
              </div>
            </Stack>
          </div>
        </Link>
      </Badge>
    </Stack>
  );
};

CardUser.propTypes = {
  user: PropTypes.object.isRequired,
  handleUserClick: PropTypes.func.isRequired,
  menuUrl: PropTypes.string.isRequired,
  fonction: PropTypes.string.isRequired,
  last_message: PropTypes.string.isRequired,
  chat: PropTypes.object.isRequired,
};

// highlight in messages
const ListHightLight = ({ highlightList, setInitialSliding, navigate }) => (
  <div className="list_highlight">
    <div className="highlightContent">
      {highlightList.length > 0 ? (
        <SlideItems className="SlideItemsActualite">
          {highlightList.map((high, index) => {
            return (
              <SwiperSlide
                key={index}
                className="swiperItem"
                onClick={() => {
                  setInitialSliding(index);
                  navigate(`/etudiant/Highlights/${high.id}`);
                }}
              >
                <Stack direction="column" spacing={1}>
                  {high.type ? (
                    <ReactPlayer
                      url={`${BaseURL + high.file}`}
                      playing={true}
                      controls={false}
                      loop
                      muted
                      width={60}
                      height={60}
                      className="highlight_video"
                    />
                  ) : (
                    <img
                      src={`${verificationCloudinaryHighlight(high.file)}`}
                      className="imgHihglight"
                      alt="story"
                      width="100%"
                      height="100%"
                    />
                  )}
                  {high.professionnel && (
                    <p>{high.professionnel.user.first_name.slice(0, 7)}</p>
                  )}
                </Stack>
              </SwiperSlide>
            );
          })}
        </SlideItems>
      ) : (
        <SkeletonHighlightSlide />
      )}
    </div>
  </div>
);

ListHightLight.propTypes = {
  highlightList: PropTypes.array.isRequired,
  setInitialSliding: PropTypes.number.isRequired,
  navigate: PropTypes.string.isRequired,
};
