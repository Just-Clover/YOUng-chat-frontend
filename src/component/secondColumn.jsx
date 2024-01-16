import React from 'react';
import {Avatar, Box, Divider, List, ListItem, ListItemText, Typography} from '@mui/material';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

const SecondColumn = () => {
    return (
        <Box sx={{width: 240, bgcolor: 'background.paper'}}>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
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
                                    사용자님.
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