import { makeAutoObservable, runInAction } from "mobx";
import { createAccountAPI, deleteAccountAPI, getAllAccountsAPI, updateAccountAPI } from "./AccountService";


export default class AccountStore {
  accountList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getAccountList() {
    const response = await getAllAccountsAPI();
    runInAction(() => {
      this.accountList = response?.data || [];
      this.totalElements = response?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addAccount(newData) {
    await createAccountAPI(newData);
    await this.getAccountList();
  }

  async updateAccount(id, newData) {
    await updateAccountAPI(id, newData);
    await this.getAccountList();
  }
  async deleteAccount(id) {
    await deleteAccountAPI(id);
    await this.getAccountList();
  }
}
