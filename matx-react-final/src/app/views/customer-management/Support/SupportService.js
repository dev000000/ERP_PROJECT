import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT_2 + "/api/DVChamSocKhachHang";

// LAY TAT CA CHAM SOC KHACH HANG
export const getAllSupportsAPI = () => {
  var url = API_PATH + "/get-all";
  return authorizedAxiosInstance.get(url);
};

// CAP NHAT CHAM SOC KHACH HANG
export const updateSupportAPI = (id,SupportObject ) => {
  var url = API_PATH + "/update/" + id;
  return authorizedAxiosInstance.patch(url, SupportObject);
};
