import errors from "./code.js";

/**
 * 오류 공통처리
 * @param {Error} error
 */
export async function handleError(error) {
    if (error.response.status === 403) {
        console.log(403);
    }
    const code = error.response.data.code;
    const message = errors()
        .find(error => error.code === code)
        .message
    alert(message);
    console.log(error);
}
