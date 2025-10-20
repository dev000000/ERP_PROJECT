import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT_2 + "/api/NguyenVatLieu";

// LAY TAT CA NGUYEN VAT LIEU
export const getAllMaterialssAPI = () => {
  var url = API_PATH + "/get-all";
  return authorizedAxiosInstance.get(url);
};

// CAP NHAT NGUYEN VAT LIEU
export const updateMaterialsAPI = (id,MaterialsObject ) => {
  var url = API_PATH + "/update/" + id;
  return authorizedAxiosInstance.patch(url, MaterialsObject);
};
// TAO NGUYEN VAT LIEU MOI
export const createMaterialsAPI = (MaterialsObject) => {
  var url = API_PATH +"/create";
  return authorizedAxiosInstance.post(url, MaterialsObject);
};
// XOA NGUYEN VAT LIEU 
export const deleteMaterialsAPI = (id) => {
  var url = API_PATH + "/delete/" + id;
  return authorizedAxiosInstance.delete(url);
}