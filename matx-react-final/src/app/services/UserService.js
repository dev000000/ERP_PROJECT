// import axios from "axios";
// import ConstaintList from "app/configurations/appConfig";
// const API_PATH = ConstaintList.API_ENDPOINT + "/systemNhanSu/nhanvien";

// export const loginWithUserAndPass = (userObject) => {
//   var url = API_PATH + "/login";
//   return axios.post(url,userObject);
// }
// export const checkToken = (tokenObject) => {
//   var url = API_PATH + "/introspect";
//   return axios.post(url,tokenObject);
// }
// export const refreshToken = (refreshToken) => {
//   var url = API_PATH + "/refresh-token";
//   return axios.post(url, { refreshToken });
// }

// export const signUp = (userObject) => {
//   var url = API_PATH + "/register" ;
//   return axios.post(url,userObject);
// }
// export const getMyProfile = ({config = {}}) => {
//   var url = API_PATH_2 + "/my-profile";
//   return axios.get(url, config);
// };
// export const logOut = () => {
//   var url = API_PATH + "/logout";
//   return axios.post(url);
// }
// // HTTPS ONLY COOKIES
// export const refreshTokenCookie = () => {
//   var url = API_PATH + "/refresh-token";
//   return axios.post(url);
// }