import {friend} from "../index.js";

export const getFriendList = () => {
    return friend.get();
}

export const deleteFriend = (friendId) => {
    return friend.delete(`/${friendId}`);
}

export const addFriend = (friendId) => {
    return friend.post(`/${friendId}`);
}
