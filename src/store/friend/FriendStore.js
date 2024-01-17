import {create} from 'zustand'
import {persist} from "zustand/middleware";

const friendStore = create(persist(set => ({
    friend: [],
    setFriend: (friend) => set({friend: friend}),
}), {
    name: "friend-store"
}));

export default friendStore;
