import * as React from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";

import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line react/prop-types
const LabDetails = ({ open, handleClose }) => {
  const lab = useSelector((state) => state.laboratory.lab);

  return (
    <>
      <React.Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Drug Details
              </Typography>
              <IconButton
                className="text-end"
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <IoMdClose />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <div className="details">
              <h4>Lab Item</h4>
              <p>{lab.lab_item}</p>
            </div>

            <div className="details">
              <h4>Lab Type</h4>
              <p>{lab.lab_type}</p>
            </div>
            <div className="details">
              <h4>Category</h4>
              <p>{lab.category}</p>
            </div>
            <div className="details">
              <h4>Sub Category</h4>
              <p>{lab.sub_category}</p>
            </div>
            <div className="details">
              <h4>Code</h4>
              <p>{lab.code}</p>
            </div>
            <div className="details">
              <h4>Price (Ghc)</h4>
              <p>{lab.price}</p>
            </div>
          </List>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default LabDetails;
