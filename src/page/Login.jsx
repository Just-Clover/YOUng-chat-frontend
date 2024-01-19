import {useState} from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LoginIcon from '@mui/icons-material/Login';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Footer from "../component/Footer.jsx";
import {login} from "../api/user/userApi.js";
import {setAccessToken, setRefreshToken} from "../api/common/cookie.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        await login(user).then((response) => {
            alert("로그인에 성공하였습니다!");
            const accessToken = response.headers.get("AccessToken");
            const refreshToken = response.headers.get("RefreshToken");
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            navigate("/");
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
                    <LoginIcon/>
                </Avatar>
                <Typography component="h1" variant="h4" sx={{fontWeight: 'bold'}}>
                    YOUngChat!
                </Typography>
                <Box component="form" sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={user.email}
                                autoComplete="email"
                                onChange={handleInputChange}
                            />
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
                        onClick={handleLogin}
                        variant="contained"
                        sx={{mt: 3, mb: 2, bgcolor: '#3f9df9'}}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Link href="/signup" variant="body2">
                            가입하신 적이 없으시나요? 회원가입
                        </Link>
                    </Grid>
                </Box>
            </Box>
            <Footer/>
        </Container>
    );
}

export default Login;
