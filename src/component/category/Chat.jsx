import {Avatar, Checkbox, Dialog, DialogContent, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {createChatRoom, createGroupChatRoom, getChatRoomList} from "../../api/chat-room/chatRoomApi.js";
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
import InfiniteScroll from "react-infinite-scroll-component";


export const Chat = () => {
    const {setMainBody} = mainBodyStore();
    const {chatRoom, setChatRoom, chatRoomHasMore, setChatRoomHasMore} = chatRoomStore();
    const {messages, chatStatus} = chatStore();
    const {setSelectedChatRoomId, setSelectedChatRoomTitle} = selectedChatRoomStore();
    const [open, setOpen] = useState(false);
    const [friendList, setFriendList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setChatRoomHasMore(true);
        handleGetChatRoomList();
    }, [messages, chatStatus]);

    const handleGetChatRoomList = async () => {
        const response = await getChatRoomList("");
        await setChatRoom(response.data.data.content);
        console.log(chatRoom);
    };

    const fetchChatRoomList = async () => {
        if (loading || !chatRoomHasMore) return;

        const lastChatRoom = chatRoom[chatRoom.length - 1];
        const lastChatId = lastChatRoom?.chatId;

        try {
            setLoading(true);
            const response = await getChatRoomList(lastChatId)
            const newChatRoomList = response.data.data.content;

            if (newChatRoomList.length > 0) {
                setTimeout(() => {
                    setChatRoom(chatRoom.concat(newChatRoomList));
                }, 1000);
            } else {
                setChatRoomHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch chatroom:', error);
        } finally {
            setLoading(false);
        }
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
        setChecked([]);
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

    const handleCreateChatRoom = () => {
        if (checked.length === 0) {
            handleClose();
            return;
        }
        if (checked.length > 1) {
            createGroupChatRoom({
                friendIds: checked
            }).then((response) => {
                setOpen(false);
                setChecked([]);
                alert("채팅방이 생성되었습니다.");
                chatRoomClick(response.data.data);
            });
            return;
        }
        createChatRoom({friendId: checked[0]}).then((response) => {
            setOpen(false);
            setChecked([]);
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
                maxWidth="500"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{width: 500, background: "#9ccc65", fontWeight: "bold", color: "white"}}>
                    채팅방 생성
                </DialogContent>
                <Box sx={{maxHeight: "48vh", overflowY: "auto"}}>
                    {friendList.map((friend, index) => (
                        <ListItem
                            key={index}
                            divider
                        >
                            <ListItemButton onClick={handleToggle(friend.userId)}>
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
                                                width: '100%',
                                                mr: "10%"
                                            }}
                                            component="span"
                                        >
                                            {friend.username}
                                        </Typography>
                                    }
                                />
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(friend.userId) !== -1}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Box>
                <Button onClick={() => handleCreateChatRoom()} autoFocus variant="outlined"
                        sx={{ml: "20%", mb: "5%", mt: "5%", width: "60%"}}>생성하기</Button>
            </Dialog>
            <Divider/>
            <Box
                id="scrollableDiv2"
                style={{
                    overflowY: "auto",
                    height: 700
                }}>
                <InfiniteScroll
                    dataLength={chatRoom.length}
                    next={fetchChatRoomList}
                    hasMore={chatRoomHasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv2"
                >
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
                </InfiniteScroll>
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
