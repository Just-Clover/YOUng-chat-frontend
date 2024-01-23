import {Avatar, Dialog, DialogContent, InputAdornment, ListItem, ListItemText, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import {deleteFriend, getFriendSearch} from "../../../api/friend/friendApi.js";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import friendStore from "../../../store/friend/FriendStore.js";
import {createChatRoom} from "../../../api/chat-room/chatRoomApi.js";
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import mainBodyStore from "../../../store/main/MainBodyStore.js";

const FriendSearch = () => {
    const {selectedFriend, setSelectedFriend} = friendStore();
    const {setSelectedChatRoomId, setSelectedChatRoomTitle} = selectedChatRoomStore();
    const {setMainBody} = mainBodyStore();
    const [keyword, setKeyword] = useState('');
    const [friendList, setFriendList] = useState([]);
    const [open, setOpen] = useState(false);

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
        getFriendSearch(keyword).then((response) => {
            setFriendList(response.data.data);
        });
    }

    const handleChattingFriend = (friendId) => {
        const friendData = {
            friendIds: [friendId],
            title: ""
        };

        createChatRoom(friendData).then(response => {
            setOpen(false);
            setMainBody('chatRoom');
            setSelectedChatRoomId(response.data.data['chatRoomId']);
            setSelectedChatRoomTitle(response.data.data['title']);
        });
    };

    const handleDeleteFriend = (friendData) => {
        deleteFriend(friendData.userId).then((response) => {
            alert(response.data.message);
            setOpen(false);
            window.location.reload();
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const friendClick = (f) => {
        setSelectedFriend(f);
        setOpen(true);
    };

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
                <ListItem key={index} divider onClick={() => friendClick(friend)}>
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
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xs'
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    {selectedFriend && (
                        <>
                            <Grid item>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Avatar
                                        src={selectedFriend.profileImage}
                                        loading="lazy"
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
                                        {selectedFriend.username}
                                    </Typography>
                                </Box>
                            </Grid>
                        </>
                    )}
                </DialogContent>
                <Button onClick={() => handleChattingFriend(selectedFriend.userId)} autoFocus variant="outlined"
                        sx={{ml: "20%", mb: "5%", width: "60%"}}>대화하기</Button>
                <Button variant="outlined" color="error" sx={{ml: "20%", mb: "5%", width: "60%", color: "#f44336"}}
                        onClick={() => handleDeleteFriend(selectedFriend)}>
                    친구삭제
                </Button>
            </Dialog>
        </Box>
    )
}

export default FriendSearch;
