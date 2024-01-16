import React from 'react';
import {Avatar, Box, Button, Grid, Typography} from '@mui/material';

const Profile = () => {
    return (
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar
                            sx={{
                                m: 1, bgcolor: 'secondary.main',
                                width: 200,
                                height: 200
                            }}/>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{fontWeight: 'bold', mb: 2}}>
                            사용자 이름
                        </Typography>
                        <Typography variant="body1">test@test.com</Typography>
                        <Button fullWidth variant="contained"
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