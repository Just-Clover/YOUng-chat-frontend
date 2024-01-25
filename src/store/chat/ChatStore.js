import {create} from "zustand";
import {persist} from "zustand/middleware";

const chatStore = create(persist(set => ({
    messages: [],
    setMessages: (messages) => set({messages: messages}),
}), {
    name: "chat-store"
}));

export default chatStore;
