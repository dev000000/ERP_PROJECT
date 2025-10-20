import { makeAutoObservable, runInAction } from "mobx";
import { getAllSupportsAPI, updateSupportAPI } from "./SupportService";


export default class SupportStore {
  supportList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getSupportList() {
    const response = await getAllSupportsAPI();
    console.log(response);
    runInAction(() => {
      this.supportList = response?.data?.data || [];
      this.totalElements = response?.data?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async updateSupport(id, newData) {
    await updateSupportAPI(id, newData);
    await this.getSupportList();
  }
}
