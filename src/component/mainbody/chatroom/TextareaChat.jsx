import {useEffect, useState} from 'react';
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import stompStore from "../../../store/stomp/StompStore.js";
import chatStore from "../../../store/chat/ChatStore.js";
import userStore from "../../../store/user/UserStore.js";
import {getDetailChatRoom} from "../../../api/chat-room/chatRoomApi.js";


const TextareaChat = () => {
    const {userId} = userStore();
    const {selectedChatRoomId} = selectedChatRoomStore();
    const {stompClient} = stompStore();
    const [chat, setChat] = useState('');
    const {setMessages} = chatStore();
    const handleInputChange = (event) => {
        setChat(event.target.value);
    };

    useEffect(() => {
        getDetailChatRoom(selectedChatRoomId).then((response) => {
            const {chatResList} = response.data.data;
            const formattedMessages = formatMessages(chatResList);
            setMessages(formattedMessages);
        });
    }, [setMessages, setChat]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (chat.trim() === '') {
            return; // 빈 메시지는 전송하지 않음
        }
        if (stompClient && chat) {
            await stompClient.publish({
                destination: `/pub/chat-rooms.` + selectedChatRoomId,
                body: JSON.stringify({"message": chat, "userId": userId}),
            });
            setChat('');
        }
    };
    const formatMessages = (chatResList) => {
        return chatResList.map((message, index, array) => ({
            ...message,
            showAvatarAndName: index === 0 || array[index - 1].userId !== message.userId
        }));
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
