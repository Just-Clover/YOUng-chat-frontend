import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";

const ChatHeader = () => {
    const {selectedChatRoomTitle} = selectedChatRoomStore();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    {selectedChatRoomTitle}
                </Typography>
                <Button color="inherit" edge="end">
                    <Typography sx={{mr: 1}}>채팅방 나가기</Typography>
                    <ExitToAppIcon/>
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default ChatHeader;
