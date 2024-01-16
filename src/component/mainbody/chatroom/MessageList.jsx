import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";

// const [message, setMessage] = useState({
//     username: '',
//     message: '',
//     messageTime: ''
// });
const OtherUserMessage = ({showAvatarAndName}) => (

        <Box sx={{display: 'flex', alignItems: 'start', mb: 2}}>
            <Box sx={{minWidth: 32, height: 32, mr: 1}}>
                {showAvatarAndName && <Avatar sx={{width: 30, height: 30, mr: 1}}>U1</Avatar>}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', mr: 1}}>
                {showAvatarAndName && <Typography variant="caption" sx={{ml: 1, mb: 0.5}}>User1</Typography>}
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Paper sx={{p: 1, bgcolor: 'lightgrey', borderRadius: '10px', mr: 1}}>
                        <Typography variant="body1">dsadgasdgadsdgasdgdsasdasdafadsfas sad fda sdf adsadasd asdg adgs dsa
                            ads adgs dsChat room
                            message</Typography>
                    </Paper>
                    <Typography minWidth="20%" variant="caption">3:32 AM</Typography>
                </Box>
            </Box>
        </Box>
    )
;

const MyMessage = () => (
    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mb: 2, maxWidth: '100%'}}>
        <Typography minWidth="20%" textAlign="right" variant="caption">3:32 AM</Typography>
        <Paper sx={{p: 1, bgcolor: 'lightgrey', borderRadius: '10px', ml: 1}}>
            <Typography variant="body1">Chat room message Chat room message Chat room message Chat room message Chat
                room message Chat room message</Typography>
        </Paper>
    </Box>
);

// const SystemMessage = () => (
//     <Box sx={{textAlign: 'center', mb: 1}}>
//         <Typography variant="body2" color="text.secondary">
//             {message.message}
//         </Typography>
//     </Box>
// );
const MessageList = () => (
    // <Box sx={{padding: 2}}>
    //     {messages.map((message, index) =>
    //         message.type === 'other' ? (
    //             <OtherUserMessage key={index} message={message}/>
    //         ) : message.type === 'mine' ? (
    //             <MyMessage key={index} message={message}/>
    //         ) : (
    //             <SystemMessage key={index} message={message}/>
    //         )
    //     )}
    // </Box>
    <Box sx={{p: 2}}>
        <OtherUserMessage showAvatarAndName={true}/>
        <OtherUserMessage showAvatarAndName={false}/>
        <MyMessage/>
    </Box>
);

export default MessageList;
