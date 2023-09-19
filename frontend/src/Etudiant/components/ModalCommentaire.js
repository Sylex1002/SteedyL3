import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import { AppContext } from "../../Context/AppContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { post_focus_comment_Action } from "../../Actions/ActionFocus";
import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
import { useDispatch, useSelector } from "react-redux";
import "./style/ModalCommentaire.scss";
import PropTypes from "prop-types";

export default function ModalCommentaire({
  focus,
  CommentData,
  setCommentData,
}) {
  // Modal open close commentaire
  const { openModalComment, toggleOpenModal, setOpenModal } =
    useContext(AppContext);
  const [CommentError, setCommentError] = useState("");
  const user = useSelector(GET_USER_INFO_CONNECT);
  const [Comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (Comment !== "") {
      const formdata = {
        focus_id: focus.id,
        user_id: user.id,
        comment_text: Comment,
      };
      await dispatch(post_focus_comment_Action(formdata)).then((res) => {
        setCommentData([...CommentData, res]);
        setOpenModal(false);
        setComment("");
      });
    } else {
      setCommentError("Focus vide");
    }
  };

  return (
    <div className="ModalCommentaire" style={{ zIndex: "9999 !important" }}>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openModalComment}
        onClose={() => toggleOpenModal()}
      >
        <DialogTitle>Commentaire</DialogTitle>
        <DialogContent>
          <DialogContentText className="DialogContentText">
            {CommentError.length > 0 && CommentError}
          </DialogContentText>
          <TextField
            id="outlined-multiline-static"
            label="Commentaire"
            multiline
            fullWidth
            rows={5}
            // cols={25}
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpenModal()}>Cancel</Button>
          <Button variant="contain" onClick={handleSubmit}>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalCommentaire.propTypes = {
    focus: PropTypes.object.isRequired,
    CommentData: PropTypes.array.isRequired,
    setCommentData: PropTypes.array.isRequired,
  };