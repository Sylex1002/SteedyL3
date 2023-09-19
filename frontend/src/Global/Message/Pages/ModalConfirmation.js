import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { GET_USER_INFO_CONNECT } from "../../../Reducers/ReducerUser";
import { useDispatch, useSelector } from "react-redux";
import { delete_Conversations_Action } from "../../../Actions/ActionMessage";
import PropTypes from "prop-types";

const AlertDialog = ({
  handleCloseModal,
  openModal,
  userDetMessage,
  setMessages,
}) => {
  // get user from redux
  const user_connect = useSelector(GET_USER_INFO_CONNECT);
  const dispatch = useDispatch();

  const handleAgree = async () => {
    const res = await dispatch(
      delete_Conversations_Action(userDetMessage.id, user_connect.id)
    );
    if (res.status === 204) {
      setMessages([]);
    }
    handleCloseModal();
  };

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cette conversation ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Annuler</Button>
          <Button onClick={handleAgree} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  userDetMessage: PropTypes.object.isRequired,
  setMessages: PropTypes.array.isRequired,
};

export default AlertDialog;
