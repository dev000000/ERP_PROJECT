import { makeAutoObservable, runInAction } from "mobx";
import { deleteOrderDetailAPI, getAllOrdersAPI, getOrderDetailAPI, updateOrderAPI, updateOrderDetailAPI } from "./OrderService";

export default class OrderStore {
  orderList = [];
  orderDetailList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getOrderList() {
    const response = await getAllOrdersAPI();
    console.log(response);
    runInAction(() => {
      this.orderList = response?.data?.data || [];
      this.totalElements = response?.data?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async getOrderDetailList(id) {
    const response = await getOrderDetailAPI(id);
    console.log(response);
    runInAction(() => {
      this.orderDetailList = response?.data?.data || [];
    });
  }
  async updateOrder(id, newData) {
    await updateOrderAPI(id, newData);
    await this.getOrderList();
  }
  async updateOrderDetail(id, newData) {
    await updateOrderDetailAPI(id, newData);
    await this.getOrderDetailList();
    await this.getOrderList();
  }
  async deleteOrderDetail(id) {
    await deleteOrderDetailAPI(id);
    await this.getOrderDetailList();
    await this.getOrderList();
  }
}
