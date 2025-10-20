import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/phongban";

// LAY TAT CA PHONG BAN
export const getAllDepartmentsAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY PHONG BAN THEO ID
export const getDepartmentByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT PHONG BAN
export const updateDepartmentAPI = (id,DepartmentObject ) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.put(url, DepartmentObject);
};
// TAO PHONG BAN MOI
export const createDepartmentAPI = (DepartmentObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, DepartmentObject);
};
// XOA PHONG BAN 
export const deleteDepartmentAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}