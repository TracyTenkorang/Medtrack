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
const DrugDetails = ({ open, handleClose }) => {


  const drug = useSelector((state) => state.pharmacy.drug);

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
              <h4>Drug Name</h4>
              <p>{drug.drug_name}</p>
            </div>

            <div className="details">
              <h4>Description</h4>
              <p>{drug.description}</p>
            </div>
            <div className="details">
              <h4>Drug Code</h4>
              <p>{drug.drug_code}</p>
            </div>
            <div className="details">
              <h4>Unit of Pricing</h4>
              <p>{drug.unit_of_pricing}</p>
            </div>
            <div className="details">
              <h4>Price (Ghc)</h4>
              <p>{drug.price}</p>
            </div>
          </List>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default DrugDetails;
