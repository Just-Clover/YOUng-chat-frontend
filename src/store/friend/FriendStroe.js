import {create} from 'zustand'

const friendStore = create(set => ({
    friend: [{
        username: "",
        profileImage: "",
    }],

    setFriend: (username, profileImage) => set({username: username, profileImage: profileImage})
}));

export default friendStore;
