import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IoAlertCircleOutline } from "react-icons/io5";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line react/prop-types
const EditModal = ({ open, handleClose, handleEdit }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        backdrop="static"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="text-center text-warning" >
          <IoAlertCircleOutline className="w-25 h-25 mx-auto" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-dark">
            Are you sure you want to update this item
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleEdit}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditModal;
