import React from 'react';
import {Avatar, Box, Divider, List, ListItem, ListItemText, Typography} from '@mui/material';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

const SecondColumn = () => {
    return (
        <Box sx={{flexGrow: 1, p: 3, flexBasis: '33%', bgcolor: 'background.paper', maxWidth: 'none'}}>
            <List sx={{width: '100%', pt: 1, pb: 1}}>
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
            </List>
        </Box>
    );
};

export default SecondColumn;