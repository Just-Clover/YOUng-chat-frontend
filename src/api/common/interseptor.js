export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      config.headers = {
        'Content-Type': 'application/json;charset=utf-8',
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

      return response;
    },
    async function (error) {
      // await handleError(error);
      console.log(error);
      return Promise.reject(error);
    },
  );
  return instance;
}
