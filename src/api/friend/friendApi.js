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

export const getFriendSearch = (keyword) => {
    return friend.get("/search", {
        params: {keyword: keyword}
    })
}
