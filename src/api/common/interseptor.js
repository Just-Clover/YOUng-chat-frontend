import {getCookie, setAccessToken} from "./cookie.js";
import {handleError} from "./errorHandling.js";

export function setInterceptors(instance) {
    instance.interceptors.request.use(
        function (config) {
            const accessToken = getCookie('AccessToken');
            const refreshToken = getCookie('RefreshToken');

            config.headers = {
                'Content-Type': 'application/json;charset=utf-8',
                'AccessToken': accessToken,
                'RefreshToken': refreshToken
            };
            return config;
        },
        function (error) {
            console.log(error);
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
