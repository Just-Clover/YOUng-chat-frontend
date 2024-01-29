import {useState} from 'react';
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import stompStore from "../../../store/stomp/StompStore.js";
import chatStore from "../../../store/chat/ChatStore.js";
import userStore from "../../../store/user/UserStore.js";


const TextareaChat = () => {
    const {userId} = userStore();
    const {selectedChatRoomId} = selectedChatRoomStore();
    const {stompClient} = stompStore();
    const [chat, setChat] = useState('');
    const {chatStatus, setChatStatus} = chatStore();

    const handleInputChange = (event) => {
        setChat(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (chat.trim() === '') {
            return;
        }
        if (stompClient && chat) {
            await stompClient.publish({
                destination: `/pub/chat-rooms.` + selectedChatRoomId,
                body: JSON.stringify({"message": chat, "userId": userId}),
            });
            setChat('');
            setChatStatus(!chatStatus);
        }
    };
    
    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
            onSubmit={handleSubmit}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="보낼 메세지를 입력해주세요"
                inputProps={{'aria-label': 'message'}}
                value={chat}
                onChange={handleInputChange}
            />
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <IconButton color="primary" sx={{p: '10px'}} aria-label="directions" onClick={handleSubmit}>
                <SendIcon/>
            </IconButton>
        </Paper>
    );
}

export default TextareaChat;
