import {chatRoom} from "../index.js";

export const getChatRoomList = (cursorChatId) => {
    return chatRoom.get(`/chat-rooms?cursorChatId=${cursorChatId}`);
}

export const getDetailChatRoom = (chatRoomId) => {
    return chatRoom.get(`/chat-rooms/${chatRoomId}`);
};

export const getPaginationDetailChatRoom = (chatRoomId, lastChatId) => {
    return chatRoom.get(`/chat-rooms/slice/${chatRoomId}?lastChatId=${lastChatId}`);
};

export const editChatRoom = (chatRoomId, title) => {
    return chatRoom.patch(`/chat-rooms/${chatRoomId}`, {
        title: title
    });
};

export const leaveChatRoom = (chatRoomId) => {
    return chatRoom.delete(`/chat-rooms/${chatRoomId}`);
};


export const createChatRoom = (userId) => {
    return chatRoom.post('/chat-rooms/personal', userId);
}

export const createGroupChatRoom = (userIds) => {
    return chatRoom.post('/group', userIds);
}
