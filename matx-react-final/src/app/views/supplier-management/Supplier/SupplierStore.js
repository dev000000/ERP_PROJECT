import { makeAutoObservable, runInAction } from "mobx";
import { createSupplierAPI, deleteSupplierAPI, getAllSuppliersAPI, updateSupplierAPI } from "./SupplierService";


export default class SupplierStore {
  supplierList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getSupplierList() {
    const response = await getAllSuppliersAPI();
    console.log(response);
    runInAction(() => {
      this.supplierList = response?.data?.data || [];
      this.totalElements = response?.data?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addSupplier(newData) {
    await createSupplierAPI(newData);
    await this.getSupplierList();
  }

  async updateSupplier(id, newData) {
    await updateSupplierAPI(id, newData);
    await this.getSupplierList();
  }
  async deleteSupplier(id) {
    await deleteSupplierAPI(id);
    await this.getSupplierList();
  }
}
