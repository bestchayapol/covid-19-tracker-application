import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Account from "./components/Account";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account" element={<Account />} />
      </Routes> 
    </div>
  );
}

export default App;
