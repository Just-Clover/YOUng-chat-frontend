import {Avatar, InputAdornment, ListItem, ListItemText, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import {getFriendSearch} from "../../../api/friend/friendApi.js";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {useEffect, useState} from "react";

const FriendSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        if (keyword.trim() !== '') {
            handleSearchFriend();
        } else {
            setFriendList([]); // Clear friend list when the keyword is empty
        }
    }, [keyword]);

    const handleInputChange = (event) => {
        const {value} = event.target;
        setKeyword(value);
    };


    const handleSearchFriend = () => {
        console.log(keyword);
        getFriendSearch(keyword).then((response) => {
            setFriendList(response.data.data);
            console.log(response.data.data);
        });
    }


    return (
        <Box sx={{flexGrow: 1, width: "80%"}}>
            <SouthEastIcon sx={{color: "#00e676"}}/>
            <Tooltip title={
                <Typography color="inherit">{"친구를 검색하세요"}</Typography>
            } position="static" sx={{bgcolor: "#9ccc65"}} followCursor leaveDelay={500}>
                <Toolbar>
                    <PersonAddAltTwoToneIcon sx={{color: "white"}}/>
                    <Typography fontWeight="bold" color="white" variant="h6" component="div"
                                sx={{flexGrow: 1, ml: "1.5%"}}>
                        친구 검색
                    </Typography>
                </Toolbar>
            </Tooltip>
            <Grid container spacing={2} sx={{mt: "5%", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextField label="name"
                           onChange={handleInputChange}
                           sx={{
                               width: "80%"
                           }}
                           value={keyword}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <PersonSearchOutlinedIcon/>
                                   </InputAdornment>
                               ),
                           }}
                />
            </Grid>
            {friendList.map((friend, index) => (
                <ListItem key={index} divider>
                    <ListItemAvatar>
                        <Avatar
                            alt="Travis Howard"
                            src={friend.profileImage}
                            sx={{
                                mr: 2
                            }}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={friend.username}/>
                </ListItem>
            ))}
        </Box>
    )
}

export default FriendSearch;
