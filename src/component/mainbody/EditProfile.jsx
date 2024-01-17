import {Avatar, Badge, Button, Grid} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import userStore from "../../store/user/UserStore.js";
import {editProfile, getProfile} from "../../api/user/userApi.js";

// eslint-disable-next-line react/prop-types
const EditProfile = ({setMainBody}) => {
    const {userId, username, profileImage, setUserId, setUsername, setProfileImage} = userStore();
    const [user, setUser] = useState({
        username: username
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        getProfile().then((response) => {
            setUserId(response.data.data["userId"]);
            setUsername(response.data.data["username"]);
            setProfileImage(response.data.data["profileImage"]);
        })
    }, [setUserId, setUsername, setProfileImage]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const file = fileInputRef.current?.files[0];

        await editProfile(userId, user.username, file).then(() => {
            alert("프로필 수정이 완료되었습니다.")
            setMainBody('profile');
        }).catch((error) => {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred');
            }
        })
    };

    const handleBadgeClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            accept="image/png"
                            onChange={handleImageChange}
                        />
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
                                src={selectedImage || profileImage}
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
                            defaultValue={username}
                            onChange={handleInputChange}
                        />
                        <Button onClick={handleSubmit} fullWidth variant="contained"
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