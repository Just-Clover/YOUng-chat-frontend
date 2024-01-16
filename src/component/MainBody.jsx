import {Box, Paper} from "@mui/material";
import React from "react";
import EditProfile from "./mainbody/EditProfile.jsx";

const MainBody = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                flexBasis: '67%'
            }}
        >
            <Paper sx={{
                height: '100%',
                my: 'auto',
                mx: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/*<Profile/>*/}
                <EditProfile/>
                {/*<EditPassword/>*/}
                {/*<Chatroom/>*/}
            </Paper>
        </Box>
    )
};

export default MainBody;