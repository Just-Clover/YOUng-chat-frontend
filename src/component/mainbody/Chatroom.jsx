import Box from "@mui/material/Box";
import ChatHeader from "./chatroom/ChatHeader.jsx";
import TextareaChat from "./chatroom/TextareaChat.jsx";
import MessageList from "./chatroom/MessageList.jsx";
import Divider from "@mui/material/Divider";

const Chatroom = () => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <ChatHeader/>
            <Box sx={{flexGrow: 1, overflowY: 'auto'}}>
                <MessageList/>
            </Box>
            <Divider sx={{my: 2}}/>
            <TextareaChat/>
        </Box>
    );
}

export default Chatroom;