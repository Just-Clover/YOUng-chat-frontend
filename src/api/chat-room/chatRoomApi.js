import {chatRoom} from "../index.js";

export const getChatRoomList = () => {
    return chatRoom.get();
}

export const getDetailChatRoom = (chatRoomId) => {
    return chatRoom.get(`/${chatRoomId}`);
};

export const editChatRoom = (chatRoomId, title) => {
    return chatRoom.patch(`/${chatRoomId}`, {
        title: title
    });
};

export const leaveChatRoom = (chatRoomId) => {
    return chatRoom.delete(`/${chatRoomId}`);
};

