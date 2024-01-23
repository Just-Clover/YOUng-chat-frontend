import {useState} from 'react';
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {inputChat} from "../../../api/chat/chatApi.js";
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";


const TextareaChat = () => {

    const {selectedChatRoomId} = selectedChatRoomStore()

    const [message, setMessage] = useState('');
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            return; // 빈 메시지는 전송하지 않음
        }
        const chatMessage = {
            message: String(message)
        };
        await inputChat(selectedChatRoomId, chatMessage)
            .then(() => {
                setMessage('');
            });
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
                value={message}
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
