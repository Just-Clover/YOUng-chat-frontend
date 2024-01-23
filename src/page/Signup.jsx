import {useState} from 'react';
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
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Footer from "../component/Footer.jsx";

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        code: ''
    });
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
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
            .then(() => {
                setDisabled(true);
            });
    };

    const handleClickOpen = async () => {
        if (!user.email.match(EMAIL_REGEX)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }
        setOpen(true);
        alert("이메일에 코드가 전송되었습니다.")
        await mailSend(user.email);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup(user).then((response) => {
            if (response.data.code === 0) {
                alert("회원가입을 축하드립니다!");
                navigate("/login");
            }
        }).catch((error) => {
            const response = error.response.data.data;
            for (let i = 0; i < response.length; i++) {
                alert(response[i].message);
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
                }}>
                <Avatar sx={{m: 2, bgcolor: '#9ccc65'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h4" sx={{fontWeight: 'bold'}}>
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
                                helperText="사용자 이름은 영소문자, 한글, 숫자 4 - 10글자 입니다."
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
                                helperText="비밀번호는 영소문자, 숫자, 특수문자(@$!%*?&)를 포함한 8글자 - 15글자 입니다."
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
                        sx={{mt: 3, mb: 2, bgcolor: '#9ccc65'}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Link href="/login" variant="body2">
                            이미 가입하신 아이디가 존재하나요? 로그인
                        </Link>
                    </Grid>
                </Box>
            </Box>
            <Footer/>
        </Container>
    );
}

export default Signup;
