import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/trinhdohocvan";

// LAY TAT CA TRINH DO HOC VAN
export const getAllEducationLevelsAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY TRINH DO HOC VAN THEO ID
export const getEducationLevelByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT TRINH DO HOC VAN
export const updateEducationLevelAPI = (id,educationLevelObject ) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.put(url, educationLevelObject);
};
// TAO TRINH DO HOC VAN MOI
export const createEducationLevelAPI = (educationLevelObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, educationLevelObject);
};
// XOA TRINH DO HOC VAN
export const deleteEducationLevelAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}