import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {useEffect} from "react";
import {getChatRoomList} from "../../api/chat-room/chatRoomApi.js";
import chatRoomStore from "../../store/chat-room/ChatRoomStore.js";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import mainBodyStore from "../../store/main/MainBodyStore.js";
import selectedChatRoomStore from "../../store/chat-room/SelectedChatRoomStore.js";

export const Chat = () => {
    const {setMainBody} = mainBodyStore();
    const {chatRoom, setChatRoom} = chatRoomStore();
    const {setSelectedChatRoomId, setSelectedChatRoomTitle} = selectedChatRoomStore();
    // const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            getChatRoomList().then(response => {
                setChatRoom(response.data.data);
            });
        }, 1000); // 1초마다 실행

        return () => clearInterval(interval); // 컴포넌트 해제 시 인터벌 정지
    }, []);

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
