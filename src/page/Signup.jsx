import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {codeCheck, mailSend, signup} from "../api/user/userApi.js";
import {useState} from "react";
import {Dialog, DialogContent,  DialogTitle} from "@mui/material";

const SignUp = () => {
  // const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    code: ''
  });
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const codeCheckClick = async () => {
    setOpen(false);
    await codeCheck(user.email, user.code)
      .then((response) => {
        console.log(user.code);
        setDisabled(true);
        console.log(response+"성공");
      }).catch((error) => {
        console.log(error+"실패");
        console.log(error.data);
      });
  }
  const handleClickOpen = async () => {
    if (!user.email.match(EMAIL_REGEX)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    setOpen(true);
    await mailSend(user.email).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(user).then((response) => {
      console.log(response);
    }).catch((error) => {
      for (let i = 0; i < error.data.data.length; i++) {
        alert(error.data.data[i].message);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 2, bgcolor: '#9ccc65'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={user.username}
                autoComplete="username"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                disabled={disabled}
                id="email"
                label="Email Address"
                name="email"
                value={user.email}
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                sx={{mt: 1}}
                fullWidth
                size="large"
                onClick={handleClickOpen}
                variant="outlined"
              >인증
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  이메일 인증
                </DialogTitle>
                <DialogContent>
                  <TextField
                    required
                    fullWidth
                    id="code"
                    label="Code"
                    name="code"
                    value={user.code}
                    autoComplete="code"
                    onChange={handleInputChange}
                  />
                  <Button
                    sx={{mt: 2}}
                    fullWidth
                    size="large"
                    onClick={codeCheckClick}
                    variant="outlined"
                  >확인
                  </Button>

                </DialogContent>
              </Dialog>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={user.password}
                type="password"
                autoComplete="password"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            sx={{mt: 3, mb: 2, bgcolor: '#3f9df9'}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Link herf="" variant="body2">
              Already have an account? Login
            </Link>
            <Grid item>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography sx={{mt: 5}} color="text.secondary" align="center">
        {'Corp © '}
        <Link color="inherit" href="https://mui.com/">
          Just Clover
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
}

export default SignUp;
