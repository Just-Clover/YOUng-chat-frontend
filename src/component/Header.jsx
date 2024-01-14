import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Header = () => {
  return (
    <AppBar position="static" sx={{bgcolor: '#9ccc65', mt: 3}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MessageIcon/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: {xs: 'none', md: 'flex'},
              ml: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: "#fff176",
              textDecoration: 'none',
            }}
          >
            YOU
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ngChat
          </Typography>
          <PersonAddAltIcon fontSize="large"/>
          <PersonSearchIcon fontSize="large"/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
