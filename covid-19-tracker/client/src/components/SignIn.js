import React from "react";
import { useRef, useState, useEffect } from "react";
import Axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { pink } from "@mui/material/colors";

function SignIn() {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [, setErrMsg] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;
  
  const login = () => {
    Axios.post("http://localhost:6105/login", {
      username: user,
      password: pwd,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        window.location.href = "/";
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:6105/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    })
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="container_signin">
      <section>
        <center>
          <AccountCircleIcon sx={{ fontSize: 100, color: pink }} />
        </center>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <center>
            <button onClick={login}>Sign In</button>
            <h1>{loginStatus}</h1>
          </center>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="/register">Register</a>
            </span>
          </p>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
