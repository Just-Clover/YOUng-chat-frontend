import {Avatar, Button, Grid, Typography} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


// const navigate = useNavigate();

const handleInputChange = (event) => {
    const {name, value} = event.target;
    setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
};
const handleSubmit = async (event) => {
    event.preventDefault();
    // await signup(user).then(() => {
    //     alert("회원가입을 축하드립니다!");
    //     navigate("/login");
    // }).catch((error) => {
    //     for (let i = 0; i < error.response.data.data.length; i++) {
    //         alert(error.response.data.data[i].message);
    //     }
    // });
};
const EditProfile = () => {
    return (
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar
                            sx={{
                                m: 1, bgcolor: 'secondary.main',
                                width: 200,
                                height: 200
                            }}/>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                fullWidth
                                disabled={disabled}
                                id="username"
                                label="Username"
                                name="username"
                                value={user.email}
                                autoComplete="username"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{fontWeight: 'bold', mb: 2}}>
                            사용자 이름
                        </Typography>
                        <Button fullWidth variant="contained"
                                sx={{
                                    fontSize: '15px',
                                    mt: 3,
                                    mb: 10,
                                    bgcolor: '#3f9df9'
                                }}>
                            프로필 변경
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EditProfile;