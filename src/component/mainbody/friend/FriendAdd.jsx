import TextField from "@mui/material/TextField";
import {Avatar, Dialog, DialogContent, InputAdornment, Tooltip} from "@mui/material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SouthEastIcon from '@mui/icons-material/SouthEast';
import {userSearch} from "../../../api/user/userApi.js";
import {useState} from "react";
import {addFriend} from "../../../api/friend/friendApi.js";

const FriendAdd = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [userId, setUserId] = useState('');
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSearch = () => {
        console.log(email);
        userSearch(email).then((response) => {
            setOpen(true);
            setUserId(response.data.data.userId);
            setUsername(response.data.data.username);
            setProfileImage(response.data.data.profileImage);
            console.log(response);
        });
    }

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (event) => {
        const {value} = event.target;
        setEmail(value);
    };

    const handleDialog = () => {
        setDialogOpen(true);
    }

    const handleAddFriend = () => {
        addFriend(userId).then(() => {
            alert("친구 추가 되었습니다.");
            window.location.reload();
        })
    }

    return (
        <Box sx={{flexGrow: 1, width: "80%"}}>
            <SouthEastIcon sx={{color: "#00e676"}}/>
            <Tooltip title={
                <Typography color="inherit">{"추가하고자 하는 사용자를 검색하세요"}</Typography>
            } position="static" sx={{bgcolor: "#9ccc65"}} followCursor leaveDelay={500}>
                <Toolbar>
                    <PersonAddAltTwoToneIcon sx={{color: "white"}}/>
                    <Typography fontWeight="bold" color="white" variant="h6" component="div"
                                sx={{flexGrow: 1, ml: "1.5%"}}>
                        친구 추가
                    </Typography>
                </Toolbar>
            </Tooltip>
            <Grid container spacing={2} sx={{mt: "5%", ml: "5%"}}>
                <Grid item xs={8}>
                    <TextField label="Email"
                               onChange={handleInputChange}
                               value={email}
                               sx={{
                                   width: "100%"
                               }}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <MailOutlineOutlinedIcon/>
                                       </InputAdornment>
                                   ),
                               }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            ml: "12%",
                            mt: "2%",
                            width: "60%"
                        }}
                        onClick={handleSearch}
                    >이메일 검색</Button>
                </Grid>
            </Grid>

            <Grid container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  style={{ display: open ? 'flex' : 'none' }}
            >
                <Grid item>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                        <Avatar
                            src={profileImage}
                            onClick={handleDialog}
                            sx={{
                                mt: 5,
                                mb: 5,
                                width: 300,
                                height: 300
                            }}/>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{fontWeight: 'bold', mb: 2}}>
                            {username}
                        </Typography>
                        <Typography variant="body1">
                            {email}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogContent>
                    <Avatar
                        src={profileImage}
                        onClick={handleDialog}
                        sx={{
                            mt: 5,
                            mb: 5,
                            width: 300,
                            height: 300
                        }}/>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{fontWeight: 'bold', mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {username}
                    </Typography>
                    <Button
                        sx={{mt: 2}}
                        fullWidth
                        size="large"
                        onClick={handleAddFriend}
                        variant="outlined"
                    >친구 추가
                    </Button>

                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default FriendAdd;
