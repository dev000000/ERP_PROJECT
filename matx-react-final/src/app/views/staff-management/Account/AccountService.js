import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/taikhoan";

// DANG NHAP
export const loginAPI = (Username, Password) => {
  var url = API_PATH + "/login";
  return authorizedAxiosInstance.post(url, { Username: Username, Pass: Password });
};
// LAY TAT CA TAI KHOAN
export const getAllAccountsAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY TAI KHOAN THEO ID
export const getAccountByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT TAI KHOAN
export const updateAccountAPI = (accountObject) => {
  var url = API_PATH + "/" + accountObject.id;
  return authorizedAxiosInstance.put(url, accountObject);
};
// TAO TAI KHOAN MOI
export const createAccountAPI = (accountObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, accountObject);
};
// XOA TAI KHOAN
export const deleteAccountAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}