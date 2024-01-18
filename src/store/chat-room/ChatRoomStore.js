import {create} from 'zustand'
import {persist} from "zustand/middleware";

const chatRoomStore = create(persist(set => ({
    chatRoom: [],
    setChatRoom: (chatRoom) => set({chatRoom: chatRoom})
}), {
    name: "friend-store"
}));

export default chatRoomStore;
