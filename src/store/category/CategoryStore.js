import {create} from 'zustand'
import {persist} from "zustand/middleware";

const categoryStore = create(persist(set => ({
    category: "friend",
    setCategory: (category) => set({category: category})
}), {
    name: "category-store"
}));

export default categoryStore;
