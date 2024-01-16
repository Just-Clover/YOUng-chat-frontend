import React, {useEffect, useState} from 'react';
import {Avatar, Box, Divider, List, ListItem, ListItemText, Typography} from '@mui/material';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import {getProfile} from "../api/user/userApi.js";

const SecondColumn = () => {
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState("");
    useEffect(() => {

        getProfile().then((response) => {
            setUsername(response.data.data.username);
            setProfileImage(response.data.data.profileImage);
        });
    }, []);
    return (
        <Box sx={{flexGrow: 1, p: 3, flexBasis: '33%', bgcolor: 'background.paper', maxWidth: 'none'}}> <List
            sx={{width: '100%', pt: 1, pb: 1}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt="Travis Howard"
                        src={profileImage}/>
                </ListItemAvatar>
                <ListItemText
                    primary="반갑습니다"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {username} 님
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
            <Divider/>

            <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
                <Typography variant="h6"
                            sx={{
                                fontWeight: 'bold'
                            }}>
                    My Page
                </Typography>

                <ListItemButton>
                    <ListItemText primary="- 내 정보 변경"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="- 비밀번호 변경"/>
                </ListItemButton>
                {/* Add more items if necessary */}
            </List>
        </Box>
    );
};

export default SecondColumn;
