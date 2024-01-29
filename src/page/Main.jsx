import {Box} from '@mui/material';
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

const Main = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
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

                if (selectedChatRoomId) {
                    client.subscribe(`/exchange/chat.exchange/chat-rooms.` + selectedChatRoomId, () => {
                        fetchInitialMessages().then(() => {
                        });
                    });
                }

                client.subscribe(`/exchange/chat.exchange/users.` + userId, () => {
                    getChatRoomList().then(response => {
                        console.log("test");
                        setChatRoom(response.data.data);
                    });
                });
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

    }, [selectedChatRoomId]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '98vh'}}>
            <Header open={open} handleDrawerOpen={() => setOpen(true)}/>
            <Box component="main" sx={{display: 'flex', flexGrow: 1, mt: 8}}>
                <Sidebar open={open} handleDrawerClose={() => setOpen(false)}/>
                <SecondColumn/>
                <MainBody/>
            </Box>
            <Footer/>
        </Box>
    );
};

export default Main;
