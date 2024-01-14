import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import Main from "./page/Main.jsx";

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
