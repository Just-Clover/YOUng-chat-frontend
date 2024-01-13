// /**
//  * 오류 공통처리
//  * @param {Error} error
//  */
// export async function handleError(error) {
//   // 401
//   if (error && error == 401) {
//     const refreshToken = getRefreshTokenFromStorage();
//     if (refreshToken) {
//       await generateAccessToken({
//         refreshToken: refreshToken
//       }).then(async (response) => {
//         await saveAccessTokenToStorage('Bearer ', response.data.data);
//         error.config.headers.Authorization = getAccessTokenFromStorage();
//       });
//
//       return window.location.reload();
//     }
//     clearStorage();
//     await router.replace('/');
//   }
//   // 404
//   else if (error.response && error.response.status == 404) {
//     // createCustomAlert('알림', `${error.response.data.message}`, '확인');
//     await router.push('/not-found');
//   }
//   else {
//     // alert("서버 에러");
//   }
// }
