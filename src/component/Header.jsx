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
    <AppBar position="static" sx={{bgcolor: '#9ccc65', mt: 3}}>
      <Container maxWidth="xl">
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
                display: {xs: 'none', md: 'flex'}
              }}
            >
              <span style={{color: "#fff176"}}>YOU</span>
              ngChat
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
