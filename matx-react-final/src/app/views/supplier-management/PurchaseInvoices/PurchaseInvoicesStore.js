import { makeAutoObservable, runInAction } from "mobx";
import { getAllPurchaseInvoicessAPI, updatePurchaseInvoicesAPI } from "./PurchaseInvoicesService";


export default class PurchaseInvoicesStore {
  purchaseInvoicesList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getPurchaseInvoicesList() {
    const response = await getAllPurchaseInvoicessAPI();
    console.log(response);
    runInAction(() => {
      this.purchaseInvoicesList = response?.data?.data || [];
      this.totalElements = response?.data?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async updatePurchaseInvoices(id, newData) {
    await updatePurchaseInvoicesAPI(id, newData);
    await this.getPurchaseInvoicesList();
  }
}
