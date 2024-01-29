import axios from 'axios';
import {setInterceptors} from "./common/interseptor.js";

const rootUrl = import.meta.env.VITE_API_ROOT;

function createInstance(url) {
    return axios.create({
        baseURL: rootUrl + url,
        headers: {
            "Content-Type": "application/json",
        }
    });
}

function createAuthInstance(url) {
    const instance = axios.create({
        baseURL: rootUrl + url,
    });
    return setInterceptors(instance);
}

export const noAuthInstance = createInstance('/api/v1');

export const user = createAuthInstance('/api/v1/users');

export const friend = createAuthInstance('/api/v1/friends');

export const chatRoom = createAuthInstance('/api/v1/chat-rooms');

export const chat = createAuthInstance('/api/v1/chat-rooms')
