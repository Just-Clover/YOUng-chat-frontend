import {chatRoom} from "../index.js";

export const getChatRoomList = () => {
    return chatRoom.get();
}

export const getDetailChatRoom = (chatRoomId) => {
    return chatRoom.get(`/${chatRoomId}`);
};

export const getPaginationDetailChatRoom = (chatRoomId, lastChatId) => {
    return chatRoom.get(`/slice/${chatRoomId}?lastChatId=${lastChatId}`);
};

export const editChatRoom = (chatRoomId, title) => {
    return chatRoom.patch(`/${chatRoomId}`, {
        title: title
    });
};

export const leaveChatRoom = (chatRoomId) => {
    return chatRoom.delete(`/${chatRoomId}`);
};


export const createChatRoom = (userId) => {
    return chatRoom.post('/personal', userId);
}

export const createGroupChatRoom = (userIds) => {
    return chatRoom.post('/group', userIds);
}
