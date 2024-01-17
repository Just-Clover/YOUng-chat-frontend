import {create} from 'zustand'
import {persist} from "zustand/middleware";

const userStore = create(persist(set => ({
    userId: 0,
    username: "",
    profileImage: "",
    email: "",

    setUserId: (userId) => set({userId: userId}),
    setUsername: (username) => set({username: username}),
    setProfileImage: (profileImage) => set({profileImage: profileImage}),
    setEmail: (email) => set({email: email})
}), {
    name: "user-store"
}));

export default userStore;
