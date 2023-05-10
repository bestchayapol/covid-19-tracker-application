import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import Axios from "axios";

import "../styles/Register.css";

function Account() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [warningOpen, setWarningOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:6105/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setUsername(response.data.user[0].username);
        setIsLogin(true);
      } else {
        setWarningOpen(true);
        setIsLogin(false);
      }
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await Axios.post("http://localhost:6105/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error Sign Out: ", error);
    }
  };

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDeleteAccount = async () => {
    try {
      await Axios.post("http://localhost:6105/delete-account");
      window.location.href = "/signin";
    } catch (error) {
      console.error("Error Delete Account: ", error);
    }
  };

  const handleWarningAccount = () => {
    window.location.href = "/signin";
  };

  const handleWarningClose = () => setWarningOpen(false);

  return (
    <>
      {isLogin ? (
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
            <DialogTitle>
              <b>Are you sure to delete this account</b>
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleDeleteAccount} color="error">
                DELETE
              </Button>
              <Button onClick={handleDeleteClose}>CANCEL</Button>
            </DialogActions>
          </Dialog>

          <center>
            <AccountCircleIcon sx={{ fontSize: 150 }} />
          </center>

          <h2 className="accountUsername">{username}</h2>

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
      ) : (
        <Dialog open={warningOpen} onClose={handleWarningClose}>
          <DialogTitle>
            <b>Our application need user to login at first</b>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleWarningAccount} color="error">
              Redirect Me
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
export default Account;
