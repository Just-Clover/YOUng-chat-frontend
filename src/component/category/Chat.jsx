import {List, Typography} from "@mui/material";


export const Chat = () => {
    return (
        <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
            <Typography variant="h6"
                        sx={{
                            fontWeight: 'bold'
                        }}>
                Chat
            </Typography>
        </List>
    )
}
