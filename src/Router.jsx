import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import React from "react";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router
