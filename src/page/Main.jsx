import {Box} from '@mui/material';
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import MainBody from "../component/MainBody.jsx";
import SecondColumn from "../component/SecondColumn.jsx";
import Sidebar from "../component/Sidebar.jsx";
import {useState} from "react";


const Main = () => {
    const [open, setOpen] = useState(true);
    const [category, setCategory] = useState('friend');


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header open={open} handleDrawerOpen={() => setOpen(true)}/>
            <Box component="main" sx={{display: 'flex', flexGrow: 1, mt: 8}}>
                <Sidebar
                    setCategory={setCategory} open={open} handleDrawerClose={() => setOpen(false)}/>
                <SecondColumn category={category}/>
                <MainBody/>
            </Box>
            <Footer/>
        </Box>
    );
};

export default Main;
