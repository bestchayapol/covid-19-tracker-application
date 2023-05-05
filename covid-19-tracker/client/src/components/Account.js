import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import "../styles/Register.css";

function Account() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    const handleSignOut = () => {
        window.location.href = '/login';
    };

    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);

    const handleDeleteAccount = () => {
        window.location.href = "/signin";
      };
  return (
    <div className="container_account">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Do you want to Sign Out?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleSignOut}>SIGN OUT</Button>
          <Button onClick={handleClose} color="error">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle><b>Are you sure to delete this account</b></DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteAccount} color="error">DELETE</Button>
          <Button onClick={handleDeleteClose}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>

      <center>
        <AccountCircleIcon sx={{ fontSize: 150 }} />
      </center>

      <h2 className="accountUsername">Best</h2>

      <Button
        style={{ marginBottom: "1.5rem" }}
        href="/"
        className="materialButton"
        variant="contained"
        color="secondary"
        startIcon={<HomeIcon sx={{ fontSize: 100 }} />}
      >
        Home
      </Button>
      <Button
        onClick={handleDeleteOpen}
        style={{ marginBottom: "1.5rem" }}
        className="materialButton"
        variant="contained"
        color="secondary"
        startIcon={<DeleteForeverIcon sx={{ fontSize: 100 }} />}
      >
        Delete this Account
      </Button>
      <Button
        onClick={handleClickOpen}
        style={{ marginBottom: "1.5rem" }}
        className="materialButton"
        variant="contained"
        color="secondary"
        startIcon={<LogoutIcon sx={{ fontSize: 100 }} />}
      >
        Sign Out
      </Button>
    </div>
  );
}
export default Account;
