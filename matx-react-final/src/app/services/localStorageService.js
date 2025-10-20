// const KEY_ACCESS_TOKEN = "accessToken";
// const KEY_REFRESH_TOKEN = "refreshToken";
const KEY_USERNAME = "Username";
const KEY_PASSWORD = "Pass";
const KEY_AUTH = "isAuthenticated";
// export const setAccessToken = (token) => {
//   localStorage.setItem(KEY_ACCESS_TOKEN,token);
// }
// export const setRefreshToken = (token) => {
//   localStorage.setItem(KEY_REFRESH_TOKEN,token);
// }
// export const getAccessToken = () => {
//   return localStorage.getItem(KEY_ACCESS_TOKEN);
// }
// export const getRefreshToken = () => {
//   return localStorage.getItem(KEY_REFRESH_TOKEN);
// }
// export const removeAccessToken = () => {
//   localStorage.removeItem(KEY_ACCESS_TOKEN);
// }
// export const removeRefreshToken = () => {
//   localStorage.removeItem(KEY_REFRESH_TOKEN);
// }
export const setAuthenticatedLocalStorage = (boolean) => {
  localStorage.setItem(KEY_AUTH,boolean);
}
export const getAuthenticatedLocalStorage = () => {
  return localStorage.getItem(KEY_AUTH);
}
export const setUsernameLocalStorage = (username) => {
  localStorage.setItem(KEY_USERNAME,username);
}
export const getUsernameLocalStorage = () => {
  return localStorage.getItem(KEY_USERNAME);
}
export const setPasswordLocalStorage = (password) => {
  localStorage.setItem(KEY_PASSWORD,password);
}
export const getPasswordLocalStorage = () => {
  return localStorage.getItem(KEY_PASSWORD);
}
export const removeUsernameLocalStorage = () => {
  localStorage.removeItem(KEY_USERNAME);
}
export const removePasswordLocalStorage = () => {
  localStorage.removeItem(KEY_PASSWORD);
}

