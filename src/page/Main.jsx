import React from 'react';
import {Box, CssBaseline} from '@mui/material';
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";

const Main = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <CssBaseline/>
            <Header/>
            <Box component="main" sx={{display: 'flex', flexGrow: 1, mt: 8}}>
                {/*<Sidebar/>*/}
                {/*<SecondColumn/>*/}
                {/*<MainBody/>*/}
            </Box>
            <Footer/>
        </Box>
    )
        ;
};

export default Main;