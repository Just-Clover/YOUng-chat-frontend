import {create} from "zustand";
import {persist} from "zustand/middleware";

const selectedChatRoomStore = create(persist(set => ({
    selectedChatRoomId: 0,
    setSelectedChatRoom: (chatRoomId) => set({selectedChatRoomId: chatRoomId})
}), {
    name: 'selected-chat-room-store'
}));

export default selectedChatRoomStore;