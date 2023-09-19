import React, { useContext, useEffect, useState } from "react";
import HeaderBlock from "../components/HeaderBlock";
import { Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { AudioContext } from "../../Context/AudioContext ";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FooterFocus from "../components/FooterFocus";
import { dataParser } from "../../Helpers/Utils";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";

import {
  focusLikeAction,
  getOneFocusAction,
  getFocusByCategory,
  getAllFocusProfAction,
  post_focus_comment_Action,
  get_all_focus_comment_Action,
} from "../../Actions/ActionFocus";
import {
  BaseURL,
  verificationCloudinaryFocus,
  verificationCloudinaryHighlight,
} from "../../Helpers/ServiceApi";
import "./style/CommentFocus.scss";

export default function CommentFocus() {
  const match = useMatch("/etudiant/Focus/:id/listen");
  const { id } = match.params;

  const {
    focusData,
    setDataNext,
    setfocusData,
    setActiveModal,
    setActiveFootFocus,
    setCancelButtonFocus,
    setWavesurferLoad,
    handleChangeAudio,
  } = useContext(AudioContext);

  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);
  const [Like_Active, setLike_Active] = useState(false);
  const [CommentData, setCommentData] = useState(null);
  const [Comment, setComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // active like
  useEffect(() => {
    if (focusData) {
      if (focusData.liked_by.includes(user_connect.id)) {
        setLike_Active(true);
      } else {
        setLike_Active(false);
      }
    }
  }, [focusData, setLike_Active, user_connect]);

  // active modal
  useEffect(() => {
    setActiveModal(false);
    setCancelButtonFocus(true);
  }, [id, setCancelButtonFocus, setActiveModal]);

  // get information focus
  useEffect(() => {
    if (focusData && focusData.id !== id) {
      // get info focus
      dispatch(getOneFocusAction(id))
        .then((res) => {
          setCommentData(res.comments);
          // add data of focus
          setfocusData({ ...res });
          const audioLink = verificationCloudinaryFocus(res.podcast);
          handleChangeAudio(audioLink);
        })
        .catch(() => {
          setActiveFootFocus(false);
          navigate("/etudiant/decouvrir");
        });
    }
  }, [
    dispatch,
    setfocusData,
    id,
    focusData,
    navigate,
    handleChangeAudio,
    setActiveFootFocus,
  ]);

  // get one focus information
  useEffect(() => {
    if (isPageRefreshed) {
      if (id && focusData === null) {
        // get info focus
        dispatch(getOneFocusAction(id))
          .then((res) => {
            setCommentData(res.comments);
            // add data of focus
            setfocusData({ ...res });
            const audioLink = verificationCloudinaryFocus(res.podcast);
            handleChangeAudio(audioLink);
          })
          .catch(() => {
            setActiveFootFocus(false);
            navigate("/etudiant/decouvrir");
          });
      }
    } else {
      setIsPageRefreshed(true);
    }
  }, [
    dispatch,
    setfocusData,
    isPageRefreshed,
    id,
    focusData,
    navigate,
    setActiveFootFocus,
    handleChangeAudio,
  ]);

  // get information comment
  useEffect(() => {
    async function fetchComment() {
      if (id) {
        // get info focus
        await dispatch(get_all_focus_comment_Action(id)).then((res) => {
          setCommentData([...res]);
        });
      }
    }
    // call function
    fetchComment();
  }, [dispatch, id]);

  // add focus data
  useEffect(() => {
    return async () => {
      setActiveFootFocus(true);
      setWavesurferLoad(false);
    };
  }, [setActiveFootFocus, setWavesurferLoad]);

  // get data next //vita
  useEffect(() => {
    return async () => {
      if (focusData) {
        if (focusData.categorie) {
          await dispatch(getFocusByCategory(focusData.categorie.id)).then(
            (res) => {
              setDataNext([...res]);
            }
          );
        } else {
          await dispatch(
            getAllFocusProfAction(focusData.professionnel.id)
          ).then((res) => {
            setDataNext([...res]);
          });
        }
      }
    };
  }, [dispatch, focusData, setDataNext]);

  // handle like focus //vita
  const handleLikeFocus = async () => {
    const user_id = user_connect.id;
    const focus_id = focusData.id;
    const formdata = { user_id, focus_id };
    await dispatch(focusLikeAction(formdata)).then((res) => {
      // add data
      setfocusData({ ...res });
      //  if user like
      if (res.liked_by.includes(user_connect.id)) {
        setLike_Active(true);
      } else {
        setLike_Active(false);
      }
    });
  };

  // submit comment //vita
  const handleSubmit = async () => {
    if (Comment !== "") {
      const formdata = {
        focus_id: focusData.id,
        user_id: user_connect.id,
        comment_text: Comment,
      };
      // post comment
      await dispatch(post_focus_comment_Action(formdata)).then((res) => {
        if (CommentData === null) {
          setCommentData([res]);
        } else {
          setCommentData([res, ...CommentData]);
        }
        setComment("");
      });
    }
  };

  // handle change comment
  const handleChangeComment = (e) => {
    setComment(e.target.value);
    if (e.target.value.slice(0, 2)) {
      // console.log('yes', e.target.value.length)
    } else {
      // console.log('no')
    }
  };

  const handleNavigateProf = () => {
    navigate(`/etudiant/createur/${focusData.professionnel.id}`);
  };

  return (
    <div className="commentFocus">
      <HeaderBlock />
      <div
        className="showDetails"
        style={{
          background: `url(${
            focusData && verificationCloudinaryHighlight(focusData.bg)
          }) center/cover no-repeat `,
        }}
      >
        <div className="informations">
          <div className="profil">
            <Stack direction="row" spacing={2}>
              <div className="image">
                {focusData ? (
                  <img
                    onClick={handleNavigateProf}
                    src={`${BaseURL + focusData.professionnel.user.image_url}`}
                    alt="profil"
                  />
                ) : (
                  <Skeleton variant="rounded" width={40} height={40} />
                )}
              </div>
              <div className="name">
                <Stack direction="column" spacing={1}>
                  {focusData && (
                    <p>
                      {focusData.professionnel.user.first_name}{" "}
                      {focusData.professionnel.user.last_name}
                    </p>
                  )}
                  {focusData && (
                    <span>{focusData.professionnel.user.domain} </span>
                  )}
                </Stack>
              </div>
            </Stack>
          </div>

          <div className="aboutFocus">
            <div className="title">{focusData && <p>{focusData.titre}</p>}</div>
            <div className="description">
              {focusData && <p>{focusData.description.slice(0, 700)}</p>}
            </div>
          </div>

          <div className="actions">
            <Stack direction="row" spacing={2} className="btns">
              <div className="like_content">
                <div className="like">
                  <Stack direction="row" spacing={4}>
                    <div className="icon">
                      {Like_Active ? (
                        <FavoriteOutlinedIcon
                          className="Active_focus"
                          onClick={handleLikeFocus}
                          sx={{ fontSize: "16px" }}
                        />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          className="UnActive_focus"
                          onClick={handleLikeFocus}
                          sx={{ fontSize: "16px" }}
                        />
                      )}
                    </div>
                    <p>J`aime</p>
                  </Stack>
                </div>
                <div className="like_nb">
                  {focusData && <span>{focusData.liked_by_count}</span>}
                </div>
              </div>

              <div className="comment_content">
                <div className="comment">
                  <Stack direction="row" spacing={2}>
                    <div className="icon">
                      <ChatBubbleOutlinedIcon sx={{ fontSize: "16px" }} />
                    </div>
                    <p>Commentaire</p>
                  </Stack>
                </div>
                <div className="comment_nb">
                  <span>{CommentData ? CommentData.length : 0}</span>
                </div>
              </div>

              <div className="share_content">
                <div className="share">
                  <Stack direction="row" spacing={2}>
                    <div className="icon">
                      <ShareOutlinedIcon sx={{ fontSize: "16px" }} />
                    </div>
                    <p>Partager</p>
                  </Stack>
                </div>
                <div className="share_nb">
                  <span>02</span>
                </div>
              </div>
            </Stack>
          </div>
        </div>
      </div>

      <div className="barFocus">
        <FooterFocus />
      </div>

      {/* Commentaire */}
      <div className="commentPlace">
        <div className="boxComment">
          <div className="scrollableComment">
            {CommentData ? (
              <Stack direction="column" spacing={2}>
                {CommentData.map((comment, i) => (
                  <CommentCard comment={comment} key={i} />
                ))}
              </Stack>
            ) : (
              <div>vide</div>
            )}
          </div>
          <div className="area">
            <div className="ownImage">
              <div className="image">
                {user_connect ? (
                  <img
                    src={`${BaseURL + user_connect.image_url}`}
                    alt="profil"
                  />
                ) : (
                  <Skeleton variant="rounded" width={50} height={50} />
                )}
              </div>
            </div>

            <div className="inputArea">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                type="text"
                value={Comment}
                onChange={(e) => handleChangeComment(e)}
                placeholder="Ajouter un commentaire"
              />
              <Send onClick={handleSubmit} className="comment_send_icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CommentCard = ({ comment }) => (
  <div className="comments">
    <div className="photo">
      <div className="image">
        <img src={`${BaseURL + comment.user.image_url}`} alt="profil" />
      </div>
    </div>
    <div className="infos">
      <Stack direction="column" spacing={1}>
        <div className="nameDate">
          <div className="nom">
            <p>
              {comment.user.first_name} {comment.user.last_name}
            </p>
          </div>
          <div className="date">
            <span>{dataParser(comment.createdAt)}</span>
          </div>
        </div>
        <div className="textComment">
          <p>{comment.comment_text}</p>
        </div>
      </Stack>
    </div>
  </div>
);

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
};