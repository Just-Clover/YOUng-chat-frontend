import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {editPassword} from "../../api/user/userApi.js";
import mainBodyStore from "../../store/main/MainBodyStore.js";

const EditPassword = () => {
    const {setMainBody} = mainBodyStore();
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const [user, setUser] = useState({
        prePassword: '',
        newPassword: '',
        checkNewPassword: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await editPassword(user).then(() => {
            alert("비밀번호 수정이 완료되었습니다.")
            setMainBody('profile');
        }).catch((error) => {
            for (let i = 0; i < error.response.data.data.length; i++) {
                alert(error.response.data.data[i].message);
            }
        });
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
            <Grid container maxWidth={500}
                  spacing={2} padding={5} flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h4" sx={{fontWeight: 'bold', mb: 5}}>
                    비밀번호 변경
                </Typography>
                <Box component="form" sx={{mt: 1}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="prePassword"
                                label="이전 비밀번호"
                                name="prePassword"
                                value={user.prePassword}
                                autoComplete="prePassword"
                                type="password"
                                autoFocus
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="newPassword"
                                label="새로운 비밀번호"
                                name="newPassword"
                                value={user.newPassword}
                                autoComplete="newPassword"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="checkNewPassword"
                                label="새로운 비밀번호 확인"
                                name="checkNewPassword"
                                value={user.checkNewPassword}
                                autoComplete="checkNewPassword"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        onClick={handleSubmit}
                        variant="outlined"
                        sx={{mt: 6, mb: 2, bgcolor: '#aed581', color: "white"}}
                    >
                        확인
                    </Button>
                </Box>
            </Grid>
        </Box>
    );
}

export default EditPassword;
