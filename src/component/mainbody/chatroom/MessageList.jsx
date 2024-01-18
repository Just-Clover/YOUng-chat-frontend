import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import {getDetailChatRoom} from "../../../api/chat-room/chatRoomApi.js";
import userStore from "../../../store/user/UserStore.js";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes()}`;
};


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

    useEffect(() => {
        if (selectedChatRoomId) {
            getDetailChatRoom(selectedChatRoomId).then(response => {
                const formattedMessages = response.data.data.chatResList.map((message, index, array) => {
                    // 첫 번째 메시지이거나 이전 메시지의 사용자 ID가 현재 메시지의 사용자 ID와 다른 경우에만 프로필 표시
                    const showAvatarAndName = index === 0 || array[index - 1].userId !== message.userId;
                    return {...message, showAvatarAndName};
                });
                setMessages(formattedMessages);
            });
        }
    }, [selectedChatRoomId]);

    return (
        < Box sx={{p: 2}}>
            {
                messages.map((message, index) => (
                    message.userId === userId ?
                        <MyMessage key={index} chat={message}/> :
                        <OtherUserMessage key={index} chat={message} showAvatarAndName={message.showAvatarAndName}/>
                ))
            }
        </Box>
    );
};

export default MessageList;
