import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT_2 + "/api/HoaDonNhap";

// LAY TAT CA HOA DON NHAP
export const getAllPurchaseInvoicessAPI = () => {
  var url = API_PATH + "/get-all";
  return authorizedAxiosInstance.get(url);
};

// CAP NHAT HOA DON NHAP
export const updatePurchaseInvoicesAPI = (id,PurchaseInvoicesObject ) => {
  var url = API_PATH + "/update/" + id;
  return authorizedAxiosInstance.patch(url, PurchaseInvoicesObject);
};
