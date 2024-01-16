import {create} from 'zustand'
import {persist} from "zustand/middleware";

const userStore = create(persist(set => ({
    username: "",
    profileImage: "",

    setUsername: (username) => set({username: username}),
    setProfileImage: (profileImage) => set({profileImage: profileImage})
}), {
    name: "user-store"
}));

export default userStore;
