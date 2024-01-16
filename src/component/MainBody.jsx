import {Avatar, Box, Button, Paper, Typography} from "@mui/material";
import React from "react";

const MainBody = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: 'calc(40%)',
                height: 'calc(100%)'
            }}
        >
            <Paper sx={{
                maxWidth: 500,
                my: 1,
                mx: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Avatar sx={{m: 1, bgcolor: 'secondary.main', width: 56, height: 56}}>
                    {/* Profile Image */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    프로필 이미지
                </Typography>
                <Typography variant="body1">사용자 이름</Typography>
                <Button variant="contained" sx={{mt: 3}}>
                    프로필 변경
                </Button>
            </Paper>
        </Box>
    )
};

export default MainBody;