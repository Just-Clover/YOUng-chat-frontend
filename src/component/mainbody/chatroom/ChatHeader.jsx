import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ChatHeader = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                채팅방제목
            </Typography>
            <IconButton color="inherit" edge="end">
                <CloseIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>
);

export default ChatHeader;