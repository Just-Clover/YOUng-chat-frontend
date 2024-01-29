import {AppBar, Button, Dialog, DialogContent, DialogTitle, Toolbar, Typography} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import TextField from "@mui/material/TextField";
import {editChatRoom, getChatRoomList, leaveChatRoom} from "../../../api/chat-room/chatRoomApi.js";
import IconButton from "@mui/material/IconButton";
import {useEffect, useState} from "react";
import mainBodyStore from "../../../store/main/MainBodyStore.js";
import chatRoomStore from "../../../store/chat-room/ChatRoomStore.js";

const ChatHeader = () => {
    const {selectedChatRoomId, setSelectedChatRoomId, selectedChatRoomTitle, setSelectedChatRoomTitle} = selectedChatRoomStore();
    const [title, setTitle] = useState(selectedChatRoomTitle);
    const [titleOpen, setTitleOpen] = useState(false);
    const [leaveOpen, setLeaveOpen] = useState(false);
    const {setMainBody} = mainBodyStore();
    const {setChatRoom} = chatRoomStore();

    const handleTitleClose = () => {
        setTitleOpen(false);
    };

    const handleLeaveClose = () => {
        setLeaveOpen(false);
    };

    const handleEditTitle = () => {
        editChatRoom(selectedChatRoomId, title).then(() => {
            setTitleOpen(false);
            setSelectedChatRoomTitle(title);
            alert("변경이 완료되었습니다.");
        });
    };

    const titleOpenDialog = () => {
        setTitleOpen(true);
        setTitle(selectedChatRoomTitle);
    };

    const handleInputChange = (event) => {
        const {value} = event.target;
        setTitle(value);
    };

    const handleLeaveChatRoom = () => {
        leaveChatRoom(selectedChatRoomId).then(() => {
            alert("채팅방을 나갔습니다.");
            setLeaveOpen(false);
            getChatRoomList().then(response => {
                setChatRoom(response.data.data);
            });
            setSelectedChatRoomId(null);
            setMainBody("");
        })
    };

    useEffect(() => {
    }, [title]);

    return (
        <AppBar position="static" sx={{bgcolor: "#9ccc65", mb:2}} >
            <Toolbar>
                <IconButton sx={{mr:1, color: "#1b5e20"}} onClick={titleOpenDialog}>
                    <EditNoteSharpIcon/>
                </IconButton>

                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    {selectedChatRoomTitle}
                </Typography>

                <Button color="inherit" edge="end" onClick={() => setLeaveOpen(true)}>
                    <Typography sx={{mr: 1}}>채팅방 나가기</Typography>
                    <ExitToAppIcon/>
                </Button>
            </Toolbar>
            <Dialog
                open={titleOpen}
                onClose={handleTitleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    채팅방 수정
                </DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        id="code"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <Button
                        sx={{mt: 2}}
                        fullWidth
                        size="large"
                        onClick={handleEditTitle}
                        variant="outlined"
                    >수정
                    </Button>
                </DialogContent>
            </Dialog>
            <Dialog
                open={leaveOpen}
                onClose={handleLeaveClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    정말로 나가시겠습니까?
                </DialogTitle>
                <DialogContent>
                    <Button
                        sx={{mt: 2}}
                        fullWidth
                        size="large"
                        onClick={handleLeaveClose}
                        variant="outlined"
                    >취소하기
                    </Button>
                    <Button
                        sx={{mt: 2}}
                        fullWidth
                        size="large"
                        color="error"
                        onClick={handleLeaveChatRoom}
                        variant="outlined"
                    >나가기
                    </Button>
                </DialogContent>
            </Dialog>
        </AppBar>
    );
}

export default ChatHeader;
