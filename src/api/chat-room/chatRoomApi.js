import {chatRoom} from "../index.js";

export const getChatRoomList = () => {
    return chatRoom.get();
}

export const getDetailChatRoom = (chatRoomId) => {
    return chatRoom.get(`/${chatRoomId}`);
};

export const createChatRoom = (chatRoomData) => {
    return chatRoom.post(chatRoomData)
}
