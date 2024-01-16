import {Avatar, Badge, Button, Grid} from "@mui/material";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";

const EditProfile = () => {
    // const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        code: ''
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleBadgeClick = async (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            badgeContent={
                                <IconButton onClick={handleBadgeClick}
                                            sx={{
                                                bgcolor: 'black', color: 'white', borderRadius: '50%',
                                                '&:hover': {
                                                    bgcolor: 'primary.main'
                                                }
                                            }}>
                                    <EditIcon fontSize="large"/>
                                </IconButton>
                            }
                            sx={{m: 3}}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'secondary.main',
                                    width: 200,
                                    height: 200
                                }}/>
                        </Badge>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={handleInputChange}
                        />
                        <Button fullWidth variant="contained"
                                sx={{
                                    fontSize: '15px',
                                    mt: 3,
                                    mb: 10,
                                    bgcolor: '#3f9df9'
                                }}>
                            확인
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EditProfile;