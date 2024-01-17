import React, {useEffect} from 'react';
import {Avatar, Box, Button, Grid, Typography} from '@mui/material';
import userStore from "../../store/user/UserStore.js";
import {getMyProfile} from "../../api/user/userApi.js";

// eslint-disable-next-line react/prop-types
const Profile = ({setMainbody}) => {
    const {username, profileImage, email, setUsername, setProfileImage, setEmail} = userStore();


    useEffect(() => {
        getMyProfile().then((response) => {
            setUsername(response.data.data["username"]);
            setProfileImage(response.data.data["profileImage"]);
            setEmail(response.data.data["email"]);
        })
    }, []);

    return (
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar
                            src={profileImage}
                            sx={{
                                m: 1, bgcolor: 'secondary.main',
                                width: 200,
                                height: 200
                            }}/>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{fontWeight: 'bold', mb: 2}}>
                            {username}
                        </Typography>
                        <Typography variant="body1">
                            {email}
                        </Typography>
                        <Button onClick={() => setMainbody('editProfile')} fullWidth variant="contained"
                                sx={{
                                    fontSize: '15px',
                                    mt: 3,
                                    mb: 10,
                                    bgcolor: '#3f9df9'
                                }}>
                            프로필 변경
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;