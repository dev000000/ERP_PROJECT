import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/nhanvien";

// LAY TAT CA NHAN VIEN
export const getAllEmployeesAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY NHAN VIEN THEO ID
export const getEmployeeByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT NHAN VIEN
export const updateEmployeeAPI = (id,EmployeeObject ) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.put(url, EmployeeObject);
};
// TAO NHAN VIEN MOI
export const createEmployeeAPI = (EmployeeObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, EmployeeObject);
};
// XOA NHAN VIEN 
export const deleteEmployeeAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}