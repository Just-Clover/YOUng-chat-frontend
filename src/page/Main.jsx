import {Box} from '@mui/material';
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import MainBody from "../component/MainBody.jsx";
import SecondColumn from "../component/SecondColumn.jsx";
import Sidebar from "../component/Sidebar.jsx";
import {useEffect, useState} from "react";
import {deleteToken, getCookie} from "../api/common/cookie.js";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie("RefreshToken");
        if (!token) {
            deleteToken();
            navigate("/login", {replace : true});
        }
    }, []);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '98vh'}}>
            <Header open={open} handleDrawerOpen={() => setOpen(true)}/>
            <Box component="main" sx={{display: 'flex', flexGrow: 1, mt: 8}}>
                <Sidebar open={open} handleDrawerClose={() => setOpen(false)}/>
                <SecondColumn/>
                <MainBody/>
            </Box>
            <Footer/>
        </Box>
    );
};

export default Main;
