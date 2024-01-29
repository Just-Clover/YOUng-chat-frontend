import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {useEffect} from "react";
import {getChatRoomList} from "../../api/chat-room/chatRoomApi.js";
import chatRoomStore from "../../store/chat-room/ChatRoomStore.js";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import mainBodyStore from "../../store/main/MainBodyStore.js";
import selectedChatRoomStore from "../../store/chat-room/SelectedChatRoomStore.js";
import chatStore from "../../store/chat/ChatStore.js";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";


export const Chat = () => {
    const {setMainBody} = mainBodyStore();
    const {chatRoom, setChatRoom} = chatRoomStore();
    const {messages} = chatStore();
    const {setSelectedChatRoomId, setSelectedChatRoomTitle} = selectedChatRoomStore();

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

    return (
        <List component="nav" aria-label="mailbox folders" sx={{
            ml: 2, height: "100%", display: "flex", flexDirection: "column"
        }}>
            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 2}}>
                Chat
            </Typography>
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
