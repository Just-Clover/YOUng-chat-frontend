import {create} from 'zustand'

const userStore = create(set => ({
    username: "",
    profileImage: "",

    setUsername: (username) => set({username: username}),
    setProfileImage: (profileImage) => set({profileImage: profileImage})
}));

export default userStore;
