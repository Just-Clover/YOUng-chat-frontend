import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {useEffect} from "react";
import {getChatRoomList} from "../../api/chat-room/chatRoomApi.js";
import chatRoomStore from "../../store/chat-room/ChatRoomStore.js";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import mainBodyStore from "../../store/main/MainBodyStore.js";
import selectedChatRoomStore from "../../store/chat-room/SelectedChatRoomStore.js";
import chatStore from "../../store/chat/ChatStore.js";

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
        <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
            <Typography variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2
                        }}>
                Chat
            </Typography>
            <Divider/>
            {chatRoom.map((room, index) => (
                <ListItem
                    disablePadding
                    key={index}
                    divider
                    onClick={() => chatRoomClick(room)}>
                    <ListItemButton>
                        <ListItemText
                            primary={
                                <Typography
                                    sx={{display: 'inline'}}
                                    component="span"
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    {room.title}<br/>
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="gray"
                                >
                                    {room.lastChat}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                    <Divider/>
                </ListItem>
            ))}
        </List>
    )
}
