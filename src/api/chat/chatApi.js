import {chat} from "../index.js";

export const inputChat = (chatRoomId, userData) => {
    return chat.post(`/${chatRoomId}/chats`, userData);
}

export const deleteChat = (chatRoomId, chatId) => {
    return chat.delete(`/${chatRoomId}/chats/${chatId}`);
}