import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People'; // For "Friend"
import ChatIcon from '@mui/icons-material/Chat'; // For "Chat"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For "My"
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // For "Logout"

const drawerWidth = 140;

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(() => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
}));

export default function PermanentDrawer() {
    return (
        <Box sx={{display: 'flex'}}>
            <Drawer variant="permanent" sx={{'& .MuiDrawer-paper': {top: `64px`}}}>
                <List>
                    {/* List of Drawer Items */}
                    {[
                        {icon: <PeopleIcon/>, text: 'Friend'},
                        {icon: <ChatIcon/>, text: 'Chat'},
                        {icon: <AccountCircleIcon/>, text: 'My'},

                    ].map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Divider/>
                    <ListItem key='Logout' disablePadding>
                        <ListItemButton>
                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                            <ListItemText primary='Logout'/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            {/* Main content goes here */}
        </Box>
    );
}