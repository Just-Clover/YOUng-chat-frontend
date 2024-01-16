import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Box from "@mui/material/Box";
import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }),
);


export default function Header({open, handleDrawerOpen}) {
    return (
        <AppBar position="fixed" open={open} sx={{bgcolor: '#9ccc65'}}>
            <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 2,
                            marginLeft: 2,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            marginLeft: 3,
                            fontWeight: 'bold',
                            color: "#ffffff",
                            textDecoration: 'none',
                            display: {xs: 'none', md: 'flex'},
                            '& span': {color: "#fff176"}, // Use nested selectors for styling
                        }}
                    >
                        <span>YOU</span>ngChat
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <PersonAddAltIcon fontSize="large" sx={{mr: 2}}/>
                    <PersonSearchIcon fontSize="large"/>
                </Box>
            </Toolbar>
        </AppBar>
    );
}