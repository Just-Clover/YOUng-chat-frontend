import {chat} from "../index.js";

export const deleteChat = (chatRoomId, chatId) => {
    return chat.delete(`/${chatRoomId}/chats/${chatId}`);
}
