import {create} from "zustand";
import {persist} from "zustand/middleware";

const stompStore = create(persist(set => ({
    stompClient: null,
    setStompClient: (stompClient) => set({stompClient: stompClient}),
}), {
    name: "stomp-client-store"
}));

export default stompStore;
