import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT + "/systemNhanSu/trinhdongoaingu";

// LAY TAT CA TRINH DO NGOAI NGU
export const getAllForeignLanguageLevelsAPI = () => {
  var url = API_PATH;
  return authorizedAxiosInstance.get(url);
};
// LAY TRINH DO NGOAI NGU THEO ID
export const getForeignLanguageLevelByIdAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.get(url);
};
// CAP NHAT TRINH DO NGOAI NGU
export const updateForeignLanguageLevelAPI = (id,ForeignLanguageLevelObject ) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.put(url, ForeignLanguageLevelObject);
};
// TAO TRINH DO NGOAI NGU MOI
export const createForeignLanguageLevelAPI = (ForeignLanguageLevelObject) => {
  var url = API_PATH;
  return authorizedAxiosInstance.post(url, ForeignLanguageLevelObject);
};
// XOA TRINH DO NGOAI NGU
export const deleteForeignLanguageLevelAPI = (id) => {
  var url = API_PATH + "/" + id;
  return authorizedAxiosInstance.delete(url);
}