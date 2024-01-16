import React, {useEffect, useState} from 'react';
import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {getFriendList} from "../../api/friend/friendApi.js";

export const Friend = () => {
    const [friends, setFriends] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            getFriendList().then((response) => {
                const list = response.data.data;
                setFriends(list); // Update state with fetched friends list
                setIsLoaded(true);
                console.log(list);
            });
        }
    }, [isLoaded]); // Empty dependency array means this effect runs once after the initial render

    return (
        <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                Friend
            </Typography>
            <Divider/>
            {friends.map((friend, index) => (
                <ListItem key={index} divider>
                    <ListItemText
                        primary={friend.username}/> {/* Replace 'friend.name' with the appropriate property */}
                </ListItem>
            ))}
        </List>
    );
};