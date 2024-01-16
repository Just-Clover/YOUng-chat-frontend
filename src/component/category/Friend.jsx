import {Divider, List, Typography} from "@mui/material";
import {getFriendList} from "../../api/friend/friendApi.js";


export const Friend = () => {
    getFriendList().then((response) => {
        const list = response.data.data;
        console.log(list);
    });

    return (
        <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
            <Typography variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                Friend
            </Typography>
            <Divider/>

        </List>
    )
}

