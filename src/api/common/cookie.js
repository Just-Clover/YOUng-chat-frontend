import {Cookies} from "react-cookie";

const cookies = new Cookies();


export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options});
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const setAccessToken = (value) => {
    cookies.remove("AccessToken");
    return cookies.set("AccessToken", value);
}

export const setRefreshToken = (value) => {
    cookies.remove("RefreshToken");
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000 * 24 * 14); // 2 week
    return cookies.set("RefreshToken", value, {
        expires: expirationTime
    });
}

