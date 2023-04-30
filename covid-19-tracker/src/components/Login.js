import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import "../styles/Register.css";

function Login() {
  return (
    <div className="container_login">
      <center>
        <AccountCircleIcon sx={{ fontSize: 75 }} />
      </center>

      <button><Link to={'/signin'}>Sign In</Link></button>
      <button><Link to={'/register'}>Register</Link></button>
    </div>
  );
}

export default Login;
