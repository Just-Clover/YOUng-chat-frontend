import {Avatar, Checkbox, Dialog, DialogContent, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {createGroupChatRoom, getChatRoomList} from "../../api/chat-room/chatRoomApi.js";
import chatRoomStore from "../../store/chat-room/ChatRoomStore.js";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import mainBodyStore from "../../store/main/MainBodyStore.js";
import selectedChatRoomStore from "../../store/chat-room/SelectedChatRoomStore.js";
import chatStore from "../../store/chat/ChatStore.js";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";
import {getFriendList} from "../../api/friend/friendApi.js";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";


export const Chat = () => {
    const {setMainBody} = mainBodyStore();
    const {chatRoom, setChatRoom} = chatRoomStore();
    const {messages} = chatStore();
    const {setSelectedChatRoomId, setSelectedChatRoomTitle} = selectedChatRoomStore();
    const [open, setOpen] = useState(false);
    const [friendList, setFriendList] = useState([]);
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        handleGetChatRoomList();
    }, [messages]);

    const handleGetChatRoomList = () => {
        getChatRoomList().then(response => {
            setChatRoom(response.data.data);
        });
    };

    const chatRoomClick = (room) => {
        setMainBody('chatRoom');
        setSelectedChatRoomId(room['chatRoomId']);
        setSelectedChatRoomTitle(room['title']);
    };

    const addChatRoom = () => {
        getFriendList().then((response) => {
            setFriendList(response.data.data);
            setOpen(true);
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const createChatRoom = () => {
        createGroupChatRoom({
            friendIds: checked
        }).then((response) => {
            setOpen(false);
            alert("채팅방이 생성되었습니다.");
            chatRoomClick(response.data.data);
        })
    };

    return (
        <List component="nav" aria-label="mailbox folders" sx={{
            ml: 2, height: "100%", display: "flex", flexDirection: "column"
        }}>
            <Grid container spacing={5}>
                <Grid item xs={8}>
                    <Typography variant="h6" sx={{fontWeight: 'bold', mb: 2, ml: 2, mt: 1}}>
                        Chat
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => addChatRoom()}>
                        <AddCircleOutlineIcon color="primary" fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{background: "#9ccc65", fontWeight: "bold", color: "white"}}>
                    채팅방 생성
                </DialogContent>
                <Box sx={{maxHeight: "48vh", overflowY: "auto"}}>
                    {friendList.map((friend, index) => (
                        <ListItem
                            key={index}
                            divider
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(friend.userId)}
                                    checked={checked.indexOf(friend.userId) !== -1}
                                />
                            }
                        >
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
                                    primary={
                                        <Typography
                                            sx={{
                                                display: 'block',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '100%'
                                            }}
                                            component="span"
                                        >
                                            {friend.username}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Box>
                <Button onClick={() => createChatRoom()} autoFocus variant="outlined"
                        sx={{ml: "20%", mb: "5%", mt: "5%", width: "60%"}}>생성하기</Button>
            </Dialog>
            <Divider/>
            <Box sx={{overflowY: "auto", maxHeight: "70vh"}}>
                {chatRoom.map((room, index) => (
                    <ListItem
                        disablePadding
                        key={index}
                        divider
                        onClick={() => chatRoomClick(room)}
                        sx={{width: '100%'}}
                    >
                        <ListItemButton>
                            <ListItemText
                                sx={{flex: 1, minWidth: 0}}
                                primary={
                                    <Typography
                                        sx={{
                                            display: 'block',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%'
                                        }}
                                        component="span"
                                        variant="h6"
                                        fontWeight="bold"
                                    >
                                        {room.title}<br/>
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        sx={{
                                            display: 'block',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%'
                                        }}
                                        component="span"
                                        variant="body2"
                                        color="gray"
                                    >
                                        {room.lastChatDeleted ? '삭제된 메세지입니다' : room.lastChat}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                        <Divider/>
                    </ListItem>
                ))}

            </Box>
        </List>

    )
}

Chat.propTypes = {
    chatRoom: PropTypes.shape({
        title: PropTypes.string,
        lastChat: PropTypes.string,
        lastChatTime: PropTypes.string,
        lastChatDeleted: PropTypes.bool,
    })
}
