import {deleteToken, getCookie, setAccessToken} from "./cookie.js";
import {handleError} from "./errorHandling.js";

export function setInterceptors(instance) {
    instance.interceptors.request.use(
        function (config) {
            // multipart/form-data 요청인 경우 Content-Type 헤더를 수정하지 않음
            if (!(config.data instanceof FormData)) {
                config.headers['Content-Type'] = 'application/json;charset=utf-8';
            }

            const accessToken = getCookie('AccessToken');
            const refreshToken = getCookie('RefreshToken');

            config.headers['AccessToken'] = accessToken;
            config.headers['RefreshToken'] = refreshToken;

            return config;
        },
        function (error) {
            console.log(error);
            deleteToken();
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        function (response) {
            const accessToken = response.headers.get("AccessToken");
            if (accessToken) {
                setAccessToken(accessToken);
            }
            return response;
        },
        async function (error) {
            await handleError(error);

            return Promise.reject(error);
        },
    );
    return instance;
}
