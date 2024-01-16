import * as React from 'react';
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


const TextareaChat = () => (
    <Paper
        component="form"
        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
    >
        <InputBase
            sx={{ml: 1, flex: 1}}
            placeholder="Type something here…"
            inputProps={{'aria-label': 'message'}}
        />
        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
        <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
            <SendIcon/>
        </IconButton>
    </Paper>
);
export default TextareaChat;
