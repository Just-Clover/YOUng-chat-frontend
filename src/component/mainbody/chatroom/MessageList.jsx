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
import {getPaginationDetailChatRoom} from "../../../api/chat-room/chatRoomApi.js";
import userStore from "../../../store/user/UserStore.js";
import PropTypes from "prop-types";
import {deleteChat} from "../../../api/chat/chatApi.js";
import {addFriend} from "../../../api/friend/friendApi.js";
import chatStore from "../../../store/chat/ChatStore.js";
import InfiniteScroll from "react-infinite-scroll-component";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toTimeString().split(' ')[0];
};

const OtherUserMessage = ({chat, showAvatarAndName}) => {
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenProfileDialog = (chat) => {
        setSelectedUser({
            userId: chat.userId,
            username: chat.username,
            profileImage: chat.profileImage
        });
        setOpenProfileDialog(true);
    };

    const handleCloseProfileDialog = () => {
        setOpenProfileDialog(false);
    };

    const handleAddFriend = () => {
        addFriend(selectedUser.userId).then(() => {
            alert("친구 추가 되었습니다.");
            window.location.reload();
        });
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'start', mb: 2}}>
            <Box sx={{minWidth: 32, height: 32, mr: 1}}>
                {showAvatarAndName && <Avatar src={chat.profileImage} sx={{width: 30, height: 30}}
                                              onClick={() => handleOpenProfileDialog(chat)}></Avatar>}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', mr: 1}}>
                {showAvatarAndName && <Typography variant="caption" sx={{mb: 0.5}}>{chat.username}</Typography>}
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Paper sx={{p: 1, bgcolor: '#b3e5fc', borderRadius: '10px', mr: 1}}>
                        <Typography variant="body1" sx={{wordBreak: 'break-word'}}>
                            {chat.deleted ? '삭제된 메세지입니다.' : chat.message}
                        </Typography>
                    </Paper>
                    <Typography minWidth="20%" variant="caption">
                        {formatDate(chat.messageTime)}
                    </Typography>
                </Box>
            </Box>
            <Dialog
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
                maxWidth='xs'
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    {selectedUser && (<>
                            <Avatar
                                src={selectedUser.profileImage}
                                sx={{
                                    mt: 5,
                                    mb: 5,
                                    width: 300,
                                    height: 300
                                }}/>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                {selectedUser.username}
                            </Typography>
                            <Button
                                sx={{mt: 2}}
                                fullWidth
                                size="large"
                                onClick={handleAddFriend}
                                variant="outlined"
                            >친구 추가
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

OtherUserMessage.propTypes = {
    chat: PropTypes.shape({
        userId: PropTypes.any,
        profileImage: PropTypes.string,
        username: PropTypes.string,
        message: PropTypes.string,
        messageTime: PropTypes.string,
        deleted: PropTypes.bool,
    }),
    showAvatarAndName: PropTypes.bool,
};

const MyMessage = ({chat, onOpenDeleteDialog}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mr: 2, mb: 2, maxWidth: '100%'}}>
            <Typography minWidth="20%" textAlign="right" variant="caption">
                {formatDate(chat.messageTime)}
            </Typography>
            <Paper sx={{p: 1, bgcolor: '#f0f4c3', borderRadius: '10px', ml: 1, cursor: 'pointer'}}
                   onClick={onOpenDeleteDialog}>
                <Typography variant="body1" sx={{wordBreak: 'break-word'}}>
                    {chat.deleted ? '삭제된 메세지입니다.' : chat.message}
                </Typography>
            </Paper>
        </Box>
    );
};

MyMessage.propTypes = {
    chat: PropTypes.shape({
        message: PropTypes.string,
        messageTime: PropTypes.string,
        deleted: PropTypes.bool,
    }),
    onOpenDeleteDialog: PropTypes.func
};

const MessageList = () => {
    const {messages, setMessages, chatStatus, hasMore, setHasMore} = chatStore();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const {selectedChatRoomId} = selectedChatRoomStore();
    const {userId} = userStore();
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleOpenDeleteDialog = (message) => {
        setMessageToDelete(message);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (messageToDelete) {
            deleteChat(selectedChatRoomId, messageToDelete.chatId).then(() => {
                updateMessagesAfterDelete();
            });
        }
        setOpenDeleteDialog(false);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        }, 100);
    };
    const updateMessagesAfterDelete = () => {
        const updatedMessages = messages.map(message =>
            message.chatId === messageToDelete.chatId ? {...message, deleted: true} : message
        );
        setMessages(updatedMessages);
    };

    const fetchInitialMessages = async () => {
        if (!selectedChatRoomId) return;
        const response = await getPaginationDetailChatRoom(selectedChatRoomId, "");
        const formattedMessages = formatMessages(response.data.data.chatResList.content);
        setHasMore(true);
        setMessages(formattedMessages);
    };


    const fetchBeforeMessages = async () => {
        if (!selectedChatRoomId || loading || !hasMore) return;

        setLoading(true);

        const lastMessage = messages[messages.length - 1]; // 가장 오래된 메시지
        const lastMessageId = lastMessage?.chatId;

        try {
            const response = await getPaginationDetailChatRoom(selectedChatRoomId, lastMessageId);
            const newMessages = response.data.data.chatResList.content;

            if (newMessages.length > 0) {
                setTimeout(() => {
                    setMessages(formatMessages(messages.concat(newMessages)));
                }, 1000);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setHasMore(true);
        fetchInitialMessages().then(() => {
            scrollToBottom();
        });
    }, [selectedChatRoomId, chatStatus]);

    const formatMessages = (chatResList) => {
        return chatResList.map((message, index, array) => ({
            ...message,
            showAvatarAndName: index === (array.length - 1) || array[index + 1].userId !== message.userId
        }));
    };

    return (

        <Box
            id="scrollableDiv"
            style={{
                height: "60vh",
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse"
            }}
            ref={messagesEndRef}
        >
            <InfiniteScroll
                dataLength={messages.length}
                next={fetchBeforeMessages}
                style={{display: "flex", flexDirection: "column-reverse"}}
                inverse={true}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                {messages.map((message, index) => (
                    message.userId === userId ?
                        <MyMessage key={index} chat={message}
                                   onOpenDeleteDialog={() => handleOpenDeleteDialog(message)}/> :
                        <OtherUserMessage key={index} chat={message} showAvatarAndName={message.showAvatarAndName}/>
                ))}
                <div ref={messagesEndRef}/>

                <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                    <DialogTitle id="alert-dialog-title">{"메시지를 삭제하시겠습니까?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            이 메시지를 삭제하면 되돌릴 수 없습니다.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmDelete} color="error" autoFocus>확인</Button>
                        <Button onClick={handleCloseDeleteDialog} color="primary">취소</Button>
                    </DialogActions>
                </Dialog>
            </InfiniteScroll>
        </Box>
    );
};

export default MessageList;
