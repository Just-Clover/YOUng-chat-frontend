import errors from "./code.js";
import {deleteToken} from "./cookie.js";

/**
 * 오류 공통처리
 * @param {Error} error
 */
export async function handleError(error) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (error.response.status === 403) {
        console.log(403);
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
