import {create} from 'zustand'
import {persist} from "zustand/middleware";

const userStore = create(persist(set => ({
    username: "",
    profileImage: "",
    email: "",

    setUsername: (username) => set({username: username}),
    setProfileImage: (profileImage) => set({profileImage: profileImage}),
    setEmail: (email) => set({email: email})
}), {
    name: "user-store"
}));

export default userStore;
