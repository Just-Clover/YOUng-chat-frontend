import * as React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {InputBase, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

export default function TextareaChat() {

    return (
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
                <SendRoundedIcon/>
            </IconButton>
        </Paper>
    );
}
