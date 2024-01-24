import React, {useEffect} from 'react';
import {Avatar, Box, Divider, ListItem, ListItemText, Typography} from '@mui/material';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import userStore from "../store/user/UserStore.js";
import {getProfile} from "../api/user/userApi.js";
import {Friend} from "./category/Friend.jsx";
import {Chat} from "./category/Chat.jsx";
import {MyPage} from "./category/MyPage.jsx";
import categoryStore from "../store/category/CategoryStore.js";

const SecondColumn = () => {
    const {username, profileImage, setUserId, setUsername, setProfileImage} = userStore();
    const {category} = categoryStore();
    useEffect(() => {
        getProfile().then((response) => {
            setUserId(response.data.data["userId"]);
            setUsername(response.data.data["username"]);
            setProfileImage(response.data.data["profileImage"]);
        })
    }, [setUsername, setProfileImage]);

    const renderCategoryComponent = () => {
        switch (category) {
            case 'friend':
                return <Friend/>;
            case 'chat':
                return <Chat/>;
            case 'myPage':
                return <MyPage/>;
            default:
                return null; // 기본값 설정
        }
    };

    return (
        <Box sx={{flexGrow: 1, p: 3, flexBasis: '20%', maxWidth: '20%'}}>
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
            {renderCategoryComponent()}
        </Box>
    );
};

export default SecondColumn;
