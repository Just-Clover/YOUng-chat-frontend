import {List, ListItem, ListItemText, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getChatRoomList} from "../../api/chat-room/chatRoomApi.js";
import chatRoomStore from "../../store/chat-room/ChatRoomStore.js";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

export const Chat = () => {
    const {chatRoom, setChatRoom} = chatRoomStore();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            getChatRoomList().then((response) => {
                setChatRoom(response.data.data);
                setIsLoaded(true);
            });
        }
    }, []);

    const chatRoomClick = (room) => {
        console.log(room);
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
