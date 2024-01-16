import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Box from "@mui/material/Box";

const Header = () => {
    return (
        <AppBar position="fixed" sx={{bgcolor: '#9ccc65'}}>
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <MessageIcon sx={{mr: 2}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontWeight: 'bold',
                                color: "#ffffff",
                                textDecoration: 'none',
                                display: {xs: 'none', md: 'flex'},
                                '& span': {color: "#fff176"}, // Use nested selectors for styling
                            }}
                        >
                            YOUngChat
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <PersonAddAltIcon fontSize="large" sx={{mr: 2}}/>
                        <PersonSearchIcon fontSize="large"/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;