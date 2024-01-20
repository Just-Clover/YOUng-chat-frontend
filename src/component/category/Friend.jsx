import {useEffect, useState} from 'react';
import {
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import {deleteFriend, getFriendList} from "../../api/friend/friendApi.js";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import friendStore from "../../store/friend/FriendStore.js";
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import mainBodyStore from "../../store/main/MainBodyStore.js";
import {createChatRoom} from "../../api/chat-room/chatRoomApi.js";
import selectedChatRoomStore from "../../store/chat-room/SelectedChatRoomStore.js";

export const Friend = () => {
    const {friend, setFriend, selectedFriend, setSelectedFriend} = friendStore();
    const {setSelectedChatRoomId, setSelectedChatRoomTitle} = selectedChatRoomStore();
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const {setMainBody} = mainBodyStore();

    useEffect(() => {
        if (!isLoaded) {
            getFriendList().then((response) => {
                const list = response.data.data;
                setFriend(list);
                setIsLoaded(false);
            });
        }
    }, [isLoaded, setFriend]);

    const handleChattingFriend = (friendId) => {
        const friendData = {
            friendIds: [friendId]
        };

        createChatRoom(friendData).then(response => {
            setOpen(false);
            setMainBody('chatRoom');
            setSelectedChatRoomId(response.data.data['chatRoomId']);
            setSelectedChatRoomTitle(response.data.data['title']);
        });
    }
    const handleDeleteFriend = (friendData) => {
        deleteFriend(friendData.userId).then((response) => {
            alert(response.data.message);
            setOpen(false);
            window.location.reload();
        })
    }
    const handleClose = () => {
        setOpen(false);
    };
    const friendClick = (f) => {
        setSelectedFriend(f);
        setOpen(true);
        setIsLoaded(true);
    }

    return (
        <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                Friend
            </Typography>
            <ListItemButton
                onClick={() => setMainBody("friendAdd")}
            >
                <PersonAddAltTwoToneIcon/>
                <ListItemText primary="친구 추가" sx={{
                    ml: 2,
                    fontWeight: 'bold'
                }}/>
            </ListItemButton>
            <Divider/>
            <ListItemButton
                onClick={() => setMainBody("friendSearch")}
            >
                <PersonSearchTwoToneIcon/>
                <ListItemText primary="친구 검색" sx={{
                    fontWeight: 'bold',
                    ml: 2
                }}/>
            </ListItemButton>
            <Divider/>
            <Typography variant="h6" sx={{fontWeight: 'bold', mt: 2}}>
                친구 목록
            </Typography>
            {friend.map((friend, index) => (
                <ListItem key={index} divider onClick={() => friendClick(friend)}>
                    <ListItemButton>
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
                    </ListItemButton>
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
                            <img
                                src={`${selectedFriend.profileImage}`}
                                loading="lazy"
                                style={{width: 200, height: 200}}
                            />
                            <DialogTitle id="alert-dialog-title">
                                {selectedFriend.username}
                            </DialogTitle>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleChattingFriend(selectedFriend.userId)}>대화하기</Button>
                    <Button sx={{color: "#f44336"}} onClick={() => handleDeleteFriend(selectedFriend)} autoFocus>
                        친구삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </List>
    );
};
