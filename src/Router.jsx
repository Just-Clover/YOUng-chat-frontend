import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import React from "react";
import Main from "./page/Main.jsx";

function AuthLayout() {
    return null;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signup" element={<Signup/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router
