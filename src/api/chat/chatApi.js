import {chat} from "../index.js";

export const inputChat = (chatRoomId, userData) => {
    return chat.post(`/${chatRoomId}/chats`, userData);
}