import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT_2 + "/api/KhachHang";

// LAY TAT CA KHACH HANG
export const getAllCustomersAPI = () => {
  var url = API_PATH + "/get-all";
  return authorizedAxiosInstance.get(url);
};
// LAY KHACH HANG THEO ID
export const getCustomerByIdAPI = (id) => {
  var url = API_PATH + "/get-by-id/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT KHACH HANG
export const updateCustomerAPI = (id,CustomerObject ) => {
  var url = API_PATH + "/update/" + id;
  return authorizedAxiosInstance.patch(url, CustomerObject);
};
// TAO KHACH HANG MOI
export const createCustomerAPI = (CustomerObject) => {
  var url = API_PATH +"/create";
  return authorizedAxiosInstance.post(url, CustomerObject);
};
// // XOA KHACH HANG 
// export const deleteCustomerAPI = (id) => {
//   var url = API_PATH + "/delete/" + id;
//   return authorizedAxiosInstance.delete(url);
// }