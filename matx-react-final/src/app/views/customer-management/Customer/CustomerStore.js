import { makeAutoObservable, runInAction } from "mobx";
import { createCustomerAPI, getAllCustomersAPI, updateCustomerAPI } from "./CustomerService";


export default class CustomerStore {
  customerList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getCustomerList() {
    const response = await getAllCustomersAPI();
    console.log(response);
    runInAction(() => {
      this.customerList = response?.data?.data || [];
      this.totalElements = response?.data?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addCustomer(newData) {
    await createCustomerAPI(newData);
    await this.getCustomerList();
  }

  async updateCustomer(id, newData) {
    await updateCustomerAPI(id, newData);
    await this.getCustomerList();
  }
}
