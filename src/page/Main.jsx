import {Box, Snackbar} from '@mui/material';
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import MainBody from "../component/MainBody.jsx";
import SecondColumn from "../component/SecondColumn.jsx";
import Sidebar from "../component/Sidebar.jsx";
import {useEffect, useState} from "react";
import {deleteToken, getCookie} from "../api/common/cookie.js";
import {useNavigate} from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import {getChatRoomList, getDetailChatRoom} from "../api/chat-room/chatRoomApi.js";
import chatRoomStore from "../store/chat-room/ChatRoomStore.js";
import stompStore from "../store/stomp/StompStore.js";
import selectedChatRoomStore from "../store/chat-room/SelectedChatRoomStore.js";
import chatStore from "../store/chat/ChatStore.js";
import userStore from "../store/user/UserStore.js";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const Main = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState({});
    const {setChatRoom} = chatRoomStore();
    const {setStompClient} = stompStore();
    const {selectedChatRoomId} = selectedChatRoomStore();
    const {setMessages} = chatStore();
    const {userId} = userStore();

    const fetchInitialMessages = async () => {
        if (!selectedChatRoomId) return;
        const response = await getDetailChatRoom(selectedChatRoomId);
        const formattedMessages = formatMessages(response.data.data.chatResList);
        setMessages(formattedMessages);
    };

    const formatMessages = (chatResList) => {
        return chatResList.map((message, index, array) => ({
            ...message,
            showAvatarAndName: index === 0 || array[index - 1].userId !== message.userId
        }));
    };

    const handleClose = (event, reason) => {
        if (reason === 'timeout') {
            setSnackOpen(false);
            return;
        }
        setSnackOpen(false);
    };

    useEffect(() => {
        const token = getCookie("AccessToken");
        if (!token) {
            deleteToken();
            navigate("/login", {replace: true});
            return;
        }
        const client = new StompJs.Client({
            brokerURL: import.meta.env.VITE_SOCKET_ROOT,
            reconnectDelay: 500,
            onConnect: () => {
                console.log("WebSocket connected successfully");

                client.subscribe(`/exchange/chat.exchange/users.` + userId, (message) => {
                    getChatRoomList().then(response => {
                        setSnackOpen(false);
                        setChatRoom(response.data.data);
                        setSnackMessage(JSON.parse(message.body));
                        setSnackOpen(true);
                    });
                });
                if (selectedChatRoomId) {
                    client.subscribe(`/exchange/chat.exchange/chat-rooms.` + selectedChatRoomId, () => {
                        fetchInitialMessages().then(() => {
                        });
                    });
                }
            },
            connectHeaders: {
                AccessToken: getCookie("AccessToken"),
            },
            onStompError: (frame) => {
                console.error("WebSocket error:", frame);
            },
            onDisconnect: () => {
                console.log("WebSocket disconnected");
            },
        });
        client.activate();
        setStompClient(client);

    }, [selectedChatRoomId, userId]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '98vh'}}>
            <Header open={open} handleDrawerOpen={() => setOpen(true)}/>
            <Box component="main" sx={{display: 'flex', flexGrow: 1, mt: 8}}>
                <Sidebar open={open} handleDrawerClose={() => setOpen(false)}/>
                <SecondColumn/>
                <MainBody/>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={snackOpen}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={
                        <div>
                            <div>
                                <strong>{snackMessage.chatRoomName}</strong>
                            </div>
                            <Grid>
                                <Avatar src={snackMessage.profileImage}/>
                                <div>{snackMessage.username}</div>
                            </Grid>
                            <br/>
                            <div>{snackMessage.message}</div>
                        </div>
                    }
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{p: 0.5}}
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    }
                />
            </Box>
            <Footer/>
        </Box>
    );
};

export default Main;
