import {create} from "zustand";
import {persist} from "zustand/middleware";

const MainBodyStore = create(persist(set => ({
    mainBody: "friend",
    setMainBody: (mainBody) => set({mainBody: mainBody}),
}), {
    name: "main-body-store"
}));

export default MainBodyStore;
