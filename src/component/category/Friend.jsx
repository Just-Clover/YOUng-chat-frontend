import React, {useEffect, useState} from 'react';
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

export const Friend = () => {
    const {friend, setFriend} = friendStore();
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleDeleteFriend = (friendId) => {
        deleteFriend(friendId).then((response) => {
            alert(response.data.message);
            setOpen(false);
        })
    }
    const handleClose = () => {
        setOpen(false);
    };
    const friendClick = (f) => {
        setOpen(true);
        setSelectedFriend(f);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            getFriendList().then((response) => {
                const list = response.data.data;
                setFriend(list);
                setIsLoaded(false);
            });
        }
    }, [isLoaded]);

    return (
        <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                Friend
            </Typography>
            <ListItemButton sx={{
                bgcolor: "#f9fbe3"
            }}>
                <PersonAddAltTwoToneIcon/>
                <ListItemText primary="친구 추가" sx={{
                    ml: 2,
                    fontWeight: 'bold'
                }}/>
            </ListItemButton>
            <Divider/>
            <ListItemButton sx={{
                bgcolor: "#f9fbe7"
            }}>
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
                    <Button onClick={handleClose}>대화하기</Button>
                    <Button sx={{color: "#f44336"}} onClick={() => handleDeleteFriend(selectedFriend.userId)} autoFocus>
                        친구삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </List>
    );
};
