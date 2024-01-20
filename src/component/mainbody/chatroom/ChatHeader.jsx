import {AppBar, Button, Dialog, DialogContent, DialogTitle, Toolbar, Typography} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import selectedChatRoomStore from "../../../store/chat-room/SelectedChatRoomStore.js";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import TextField from "@mui/material/TextField";
import {editChatRoom} from "../../../api/chat-room/chatRoomApi.js";
import IconButton from "@mui/material/IconButton";
import {useEffect, useState} from "react";

const ChatHeader = () => {
    const {selectedChatRoomId, selectedChatRoomTitle, setSelectedChatRoomTitle} = selectedChatRoomStore();
    const [title, setTitle] = useState(selectedChatRoomTitle);
    const [titleOpen, setTitleOpen] = useState(false);
    const handleClose = () => {
        setTitleOpen(false);
    };

    const handleEditTitle = () => {
        editChatRoom(selectedChatRoomId, title).then(() => {
            setTitleOpen(false);
            setSelectedChatRoomTitle(title);
            alert("변경이 완료되었습니다.");
        });
    };

    const handleInputChange = (event) => {
        const {value} = event.target;
        setTitle(value);
    };

    useEffect(() => {
    }, [title]);

    return (
        <AppBar position="static" sx={{bgcolor: "#9ccc65", mb:2}} >
            <Toolbar>
                <IconButton sx={{mr:1, color: "#1b5e20"}} onClick={() => setTitleOpen(true)}>
                    <EditNoteSharpIcon/>
                </IconButton>

                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    {selectedChatRoomTitle}
                </Typography>

                <Button color="inherit" edge="end">
                    <Typography sx={{mr: 1}}>채팅방 나가기</Typography>
                    <ExitToAppIcon/>
                </Button>
            </Toolbar>
            <Dialog
                open={titleOpen}
                onClose={handleClose}
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
        </AppBar>
    );
}

export default ChatHeader;
