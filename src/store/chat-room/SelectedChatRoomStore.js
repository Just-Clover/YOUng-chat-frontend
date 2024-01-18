import {create} from "zustand";
import {persist} from "zustand/middleware";

const selectedChatRoomStore = create(persist((set) => ({
    selectedChatRoomId: 0,
    selectedChatRoomTitle: "",
    setSelectedChatRoomId: (chatRoomId) => set({selectedChatRoomId: chatRoomId}),
    setSelectedChatRoomTitle: (chatRoomTitle) => set({selectedChatRoomTitle: chatRoomTitle})
}), {
    name: 'selected-chat-room-store'
}));

export default selectedChatRoomStore;