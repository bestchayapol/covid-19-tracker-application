import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { pink } from "@mui/material/colors";

const LOGIN_URL = "/auth";

function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      LOGIN_URL,
      JSON.stringify({ user, pwd }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        validateStatus: false,
      }
    );
    console.log(JSON.stringify(response?.data));
    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    setSuccess(true);
    setAuth({ user, pwd, accessToken, roles });
    setUser("");
    setPwd("");
  };

  return (
    <div className="container_login">
      <>
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <p>
              <a href="/">Go to Home</a>
            </p>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <center>
              <AccountCircleIcon sx={{ fontSize: 75, color: pink }} />
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
                <button>Sign In</button>
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
        )}
      </>
    </div>
  );
}

export default SignIn;
