import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/chucvu";

// LAY TAT CA CHUC VU
export const getAllPositionsAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY CHUC VU THEO ID
export const getPositionByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT CHUC VU
export const updatePositionAPI = (id,PositionObject ) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.put(url, PositionObject);
};
// TAO CHUC VU MOI
export const createPositionAPI = (PositionObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, PositionObject);
};
// XOA CHUC VU 
export const deletePositionAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}