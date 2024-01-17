import {create} from "zustand";
import {persist} from "zustand/middleware";

const MainBodyStore = create(persist(set => ({
    mainBody: "null",
    setMainBody: (mainBody) => set({mainBody: mainBody}),
}), {
    name: "main-body-store"
}));

export default MainBodyStore;
