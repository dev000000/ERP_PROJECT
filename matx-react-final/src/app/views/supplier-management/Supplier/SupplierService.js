import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT_2 + "/api/NhaCungCap";

// LAY TAT CA NHA CUNG CAP
export const getAllSuppliersAPI = () => {
  var url = API_PATH + "/get-all";
  return authorizedAxiosInstance.get(url);
};
// LAY NHA CUNG CAP THEO ID
export const getSupplierByIdAPI = (id) => {
  var url = API_PATH + "/get-by-id/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT NHA CUNG CAP
export const updateSupplierAPI = (id,SupplierObject ) => {
  var url = API_PATH + "/update/" + id;
  return authorizedAxiosInstance.patch(url, SupplierObject);
};
// TAO NHA CUNG CAP MOI
export const createSupplierAPI = (SupplierObject) => {
  var url = API_PATH +"/create";
  return authorizedAxiosInstance.post(url, SupplierObject);
};
// XOA NHA CUNG CAP 
export const deleteSupplierAPI = (id) => {
  var url = API_PATH + "/delete/" + id;
  return authorizedAxiosInstance.delete(url);
}