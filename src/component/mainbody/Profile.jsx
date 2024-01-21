import {useEffect} from 'react';
import {Avatar, Box, Button, Grid, Typography} from '@mui/material';
import userStore from "../../store/user/UserStore.js";
import {getProfile} from "../../api/user/userApi.js";
import mainBodyStore from "../../store/main/MainBodyStore.js";

const Profile = () => {
    const {username, profileImage, email, setUsername, setProfileImage, setEmail} = userStore();

    const {setMainBody} = mainBodyStore();

    useEffect(() => {
        getProfile().then((response) => {
            setUsername(response.data.data["username"]);
            setProfileImage(response.data.data["profileImage"]);
            setEmail(response.data.data["email"]);
        })
    }, [setUsername, setProfileImage, setEmail]);

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
                        <Button onClick={() => setMainBody('editProfile')} fullWidth  variant="outlined"
                                sx={{
                                    fontSize: '15px',
                                    mt: 3,
                                    mb: 10
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
