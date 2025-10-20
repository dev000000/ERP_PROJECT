import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/ngachluong";

// LAY TAT CA NGACH LUONG
export const getAllSalaryGradesAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY TRINH DO NGACH LUONG THEO ID
export const getSalaryGradeByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT NGACH LUONG
export const updateSalaryGradeAPI = (id,SalaryGradeObject ) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.put(url, SalaryGradeObject);
};
// TAO NGACH LUONG MOI
export const createSalaryGradeAPI = (SalaryGradeObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, SalaryGradeObject);
};
// XOA NGACH LUONG 
export const deleteSalaryGradeAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}