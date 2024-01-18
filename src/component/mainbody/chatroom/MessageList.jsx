import React, {useEffect, useRef, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import {getDetailChatRoom} from "../../../api/chat-room/chatRoomApi.js";
import userStore from "../../../store/user/UserStore.js";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes()}`;
};

// eslint-disable-next-line react/prop-types
const OtherUserMessage = ({chat, showAvatarAndName}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'start', mb: 2}}>
            <Box sx={{minWidth: 32, height: 32, mr: 1}}>
                {showAvatarAndName && <Avatar sx={{width: 30, height: 30, mr: 1}}>U1</Avatar>}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', mr: 1}}>
                {showAvatarAndName && <Typography variant="caption" sx={{ml: 1, mb: 0.5}}>{chat.userId}</Typography>}
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Paper sx={{p: 1, bgcolor: 'lightgrey', borderRadius: '10px', mr: 1}}>
                        <Typography variant="body1">
                            {chat.message}
                        </Typography>
                    </Paper>
                    <Typography minWidth="20%" variant="caption">
                        {formatDate(chat.messageTime)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};


const MyMessage = ({chat}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mb: 2, maxWidth: '100%'}}>
            <Typography minWidth="20%" textAlign="right" variant="caption">
                {formatDate(chat.messageTime)}
            </Typography>
            <Paper sx={{p: 1, bgcolor: 'lightgrey', borderRadius: '10px', ml: 1}}>
                <Typography variant="body1">
                    {chat.message}
                </Typography>
            </Paper>
        </Box>
    );
};

// const SystemMessage = () => (
//     <Box sx={{textAlign: 'center', mb: 1}}>
//         <Typography variant="body2" color="text.secondary">
//             {message.message}
//         </Typography>
//     </Box>
// );

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const {selectedChatRoomId} = selectedChatRoomStore();
    const {userId} = userStore();
    const messagesEndRef = useRef(null); // 새 메시지로 스크롤하기 위한 ref

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        }, 100);
    };

    useEffect(() => {
        // 채팅방 ID가 변경될 때 초기 메시지를 불러오는 함수
        const fetchInitialMessages = async () => {
            if (selectedChatRoomId) {
                const response = await getDetailChatRoom(selectedChatRoomId);
                const initialMessages = response.data.data.chatResList.map((message, index, array) => {
                    const showAvatarAndName = index === 0 || array[index - 1].userId !== message.userId;
                    return {...message, showAvatarAndName};
                });
                setMessages(initialMessages);
                scrollToBottom();
            }
        };
        fetchInitialMessages();
    }, [selectedChatRoomId]);

    useEffect(() => {
        // 새 메시지를 주기적으로 확인하는 함수
        const interval = setInterval(async () => {
            if (selectedChatRoomId) {
                const response = await getDetailChatRoom(selectedChatRoomId);
                const newMessages = response.data.data.chatResList.map((message, index, array) => {
                    const showAvatarAndName = index === 0 || array[index - 1].userId !== message.userId;
                    return {...message, showAvatarAndName};
                });

                if (newMessages.length > messages.length) {
                    setMessages(newMessages);
                    scrollToBottom();
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedChatRoomId, messages]);

    return (
        <Box sx={{p: 2, maxHeight: 'calc(100vh - 400px)', overflowY: 'auto'}}>
            {messages.map((message, index) => (
                message.userId === userId ?
                    <MyMessage key={index} chat={message}/> :
                    <OtherUserMessage key={index} chat={message} showAvatarAndName={message.showAvatarAndName}/>
            ))}
            <div ref={messagesEndRef}/>
        </Box>
    );
};

export default MessageList;
