import {useEffect, useRef, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Typography
} from "@mui/material";
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import {getDetailChatRoom} from "../../../api/chat-room/chatRoomApi.js";
import userStore from "../../../store/user/UserStore.js";
import PropTypes from "prop-types";
import {deleteChat} from "../../../api/chat/chatApi.js";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    // return `${date.getHours()}:${date.getMinutes()}`;
    return date.toTimeString().split(' ')[0];
};

const OtherUserMessage = ({chat, showAvatarAndName}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'start', mb: 2}}>
            <Box sx={{minWidth: 32, height: 32, mr: 1}}>
                {showAvatarAndName && <Avatar src={chat.profileImage} sx={{width: 30, height: 30}}></Avatar>}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', mr: 1}}>
                {showAvatarAndName && <Typography variant="caption" sx={{mb: 0.5}}>{chat.username}</Typography>}
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Paper sx={{p: 1, bgcolor: '#b3e5fc', borderRadius: '10px', mr: 1}}>
                        <Typography variant="body1">
                            {chat.isDeleted ? '삭제된 메세지입니다.' : chat.message}
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

OtherUserMessage.propTypes = {
    chat: PropTypes.shape({
        profileImage: PropTypes.string,
        username: PropTypes.string,
        message: PropTypes.string,
        messageTime: PropTypes.string,
        isDeleted: PropTypes.bool,
    }),
    showAvatarAndName: PropTypes.bool,
}

const MyMessage = ({chat, onOpenDeleteDialog}) => {

    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mb: 2, maxWidth: '100%' }}>
            <Typography minWidth="20%" textAlign="right" variant="caption">
                {formatDate(chat.messageTime)}
            </Typography>
            <Paper sx={{p: 1, bgcolor: '#f0f4c3', borderRadius: '10px', ml: 1, cursor: 'pointer'}}
                   onClick={onOpenDeleteDialog}>
                <Typography variant="body1">
                    {chat.isDeleted ? '삭제된 메세지입니다.' : chat.message}
                </Typography>
            </Paper>
        </Box>
    );
};

MyMessage.propTypes = {
    chat: PropTypes.shape({
        message: PropTypes.string,
        messageTime: PropTypes.string,
        isDeleted: PropTypes.bool,
    }),
    onOpenDeleteDialog: PropTypes.bool
}

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const {selectedChatRoomId} = selectedChatRoomStore();
    const {userId} = userStore();
    const messagesEndRef = useRef(null);

    const handleOpenDeleteDialog = (message) => {
        setMessageToDelete(message);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (messageToDelete) {
            await deleteChat(selectedChatRoomId, messageToDelete.chatId);
            updateMessagesAfterDelete();
        }
        setOpenDialog(false);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDialog(false);
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        }, 100);
    };

    const updateMessagesAfterDelete = () => {
        const updatedMessages = messages.map(message =>
            message.chatId === messageToDelete.chatId ? {...message, isDeleted: true} : message
        );
        setMessages(updatedMessages);
    };

    useEffect(() => {
        // 채팅방 ID가 변경될 때 초기 메시지를 불러오는 함수
        const fetchInitialMessages = async () => {
            if (!selectedChatRoomId) return;
            const response = await getDetailChatRoom(selectedChatRoomId);
            const formattedMessages = formatMessages(response.data.data.chatResList);
            setMessages(formattedMessages);
            scrollToBottom();
        };
        fetchInitialMessages();
    }, [selectedChatRoomId]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChatRoomId) return [];
            const response = await getDetailChatRoom(selectedChatRoomId);
            return formatMessages(response.data.data.chatResList);
        };

        const pollingInterval = setInterval(async () => {
            const newMessages = await fetchMessages();
            if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
                setMessages(newMessages);
                scrollToBottom();
            }
        }, 1000);
        return () => clearInterval(pollingInterval);
    }, [selectedChatRoomId, messages]);

    const formatMessages = (chatResList) => {
        return chatResList.map((message, index, array) => ({
            ...message,
            showAvatarAndName: index === 0 || array[index - 1].userId !== message.userId
        }));
    };

    return (
        <Box sx={{p: 2, maxHeight: 'calc(100vh - 400px)', overflowY: 'auto'}}>
            {messages.map((message, index) => (
                message.userId === userId ?
                    <MyMessage key={index} chat={message} onOpenDeleteDialog={() => handleOpenDeleteDialog(message)}/> :
                    <OtherUserMessage key={index} chat={message} showAvatarAndName={message.showAvatarAndName}/>
            ))}
            <div ref={messagesEndRef}/>

            <Dialog open={openDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle id="alert-dialog-title">{"메시지를 삭제하시겠습니까?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        이 메시지를 삭제하면 되돌릴 수 없습니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDelete} color="primary">확인</Button>
                    <Button onClick={handleCloseDeleteDialog} color="secondary" autoFocus>취소</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MessageList;
