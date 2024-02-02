import {create} from 'zustand'
import {persist} from "zustand/middleware";

const chatRoomStore = create(persist(set => ({
    chatRoom: [],
    setChatRoom: (chatRoom) => set({chatRoom: chatRoom}),
    chatRoomHasMore: true,
    setChatRoomHasMore: (chatRoomHasMore) => set({chatRoomHasMore: chatRoomHasMore}),
    isUpdated: false,
    setIsUpdated: (update) => set({isUpdated: update})
}), {
    name: "chat-room-store"
}));

export default chatRoomStore;
