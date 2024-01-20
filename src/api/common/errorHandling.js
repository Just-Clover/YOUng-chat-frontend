import {deleteToken} from "./cookie.js";
import errors from "./code.js";

/**
 * 오류 공통처리
 * @param {Error} error
 */
export async function handleError(error) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (error.response.status === 401) {
        console.log(401);
        deleteToken();
        window.location.href = "/login";
        return;
    }
    const code = error.response.data.code;
    const message = errors()
        .find(error => error.code === code)
        .message
    alert(message);
    console.log(error);
}
