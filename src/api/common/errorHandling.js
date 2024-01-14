// /**
//  * 오류 공통처리
//  * @param {Error} error
//  */
// export async function handleError(error) {
//   // 401
//   if (error && error == 403) {
//
//     await router.replace('/');
//   }
//
//   // 404
//   else if (error.response && error.response.status == 404) {
//     // createCustomAlert('알림', `${error.response.data.message}`, '확인');
//     await router.push('/not-found');
//   }
//   else {
//     // alert("서버 에러");
//   }
// }
