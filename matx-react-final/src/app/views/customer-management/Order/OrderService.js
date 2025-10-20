import authorizedAxiosInstance from "app/utils/authorizedAxiosInstance";
import ConstantList from "app/configurations/appConfig";
const API_PATH = ConstantList.API_ENDPOINT_2 + "/api/DonHang";
const API_PATH_2 = ConstantList.API_ENDPOINT_2 + "/api/ChiTietDonHang";


// LAY TAT CA DON HANG
export const getAllOrdersAPI = () => {
  var url = API_PATH + "/get-all";
  return authorizedAxiosInstance.get(url);
};

// CAP NHAT DON HANG ( CHI CAP NHAT TRANG THAI )
export const updateOrderAPI = (id,OrderObject ) => {
  var url = API_PATH + "/update/" + id;
  return authorizedAxiosInstance.patch(url, OrderObject);
};
// LAY CHI TIET DON HANG
export const getOrderDetailAPI = (id) => {
  var url = API_PATH_2 + "/get-by-MaDonHang/" + id;
  return authorizedAxiosInstance.get(url);
}
// CAP NHAT CHI TIET DON HANG
export const updateOrderDetailAPI = (id,OrderDetailObject ) => {
  var url = API_PATH_2 + "/update/" + id;
  return authorizedAxiosInstance.patch(url, OrderDetailObject);
};
// XOA CHI TIET DON HANG
export const deleteOrderDetailAPI = (id) => {
  var url = API_PATH_2 + "/delete/" + id;
  return authorizedAxiosInstance.delete(url);
};
