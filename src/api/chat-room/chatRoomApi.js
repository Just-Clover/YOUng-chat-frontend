import {chatRoom} from "../index.js";

export const getChatRoomList = () => {
    return chatRoom.get();
}
