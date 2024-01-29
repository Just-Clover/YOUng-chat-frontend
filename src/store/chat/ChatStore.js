import {create} from "zustand";
import {persist} from "zustand/middleware";

const chatStore = create(persist(set => ({
    messages: [],
    chatStatus: false,
    setMessages: (messages) => set({messages: messages}),
    setChatStatus: (status) => set({chatStatus: status})
}), {
    name: "chat-store"
}));

export default chatStore;
