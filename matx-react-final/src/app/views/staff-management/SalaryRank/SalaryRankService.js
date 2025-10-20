import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/bacluong";

// LAY TAT CA BAC LUONG
export const getAllSalaryRanksAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY TRINH DO BAC LUONG THEO ID
export const getSalaryRankByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT BAC LUONG
export const updateSalaryRankAPI = (id,SalaryRankObject ) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.put(url, SalaryRankObject);
};
// TAO BAC LUONG MOI
export const createSalaryRankAPI = (SalaryRankObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, SalaryRankObject);
};
// XOA BAC LUONG 
export const deleteSalaryRankAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}