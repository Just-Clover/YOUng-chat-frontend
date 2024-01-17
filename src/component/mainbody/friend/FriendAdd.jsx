import TextField from "@mui/material/TextField";
import {InputAdornment, Tooltip} from "@mui/material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SouthEastIcon from '@mui/icons-material/SouthEast';

const FriendAdd = () => {


    return (
        <Box sx={{flexGrow: 1, width: "80%"}}>
            <SouthEastIcon sx={{color:"#00e676"}}/>
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
                    >이메일 검색</Button>
                </Grid>
            </Grid>

        </Box>
    )
}

export default FriendAdd;
