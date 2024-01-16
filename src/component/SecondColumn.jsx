import React, {useEffect, useState} from 'react';
import {Avatar, Box, Divider, ListItem, ListItemText, Typography} from '@mui/material';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {getProfile} from "../api/user/userApi.js";

// eslint-disable-next-line react/prop-types
const SecondColumn = ({category}) => {
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState("");
    useEffect(() => {
        getProfile().then((response) => {
            setUsername(response.data.data["username"]);
            setProfileImage(response.data.data["profileImage"]);
        });
    }, []);

    return (
        <Box sx={{flexGrow: 1, p: 3, flexBasis: '20%', bgcolor: 'background.paper', maxWidth: 'none'}}>
            <ListItem alignItems="flex-start" sx={{
                bgcolor: "#f9fbe7"
            }}>
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
            <Divider/>
            {category}
            {/*<MyPage/>*/}
        </Box>
    );
};

export default SecondColumn;
