import { makeAutoObservable, runInAction } from "mobx";
import {
  createSalaryRankAPI,
  deleteSalaryRankAPI,
  getAllSalaryRanksAPI,
  updateSalaryRankAPI
} from "./SalaryRankService";

export default class SalaryRankStore {
  salaryRankList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getSalaryRankList() {
    const response = await getAllSalaryRanksAPI();
    runInAction(() => {
      this.salaryRankList = response?.data || [];
      this.totalElements = response?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addSalaryRank(newData) {
    await createSalaryRankAPI(newData);
    await this.getSalaryRankList();
  }

  async updateSalaryRank(id, newData) {
    await updateSalaryRankAPI(id, newData);
    await this.getSalaryRankList();
  }
  async deleteSalaryRank(id) {
    await deleteSalaryRankAPI(id);
    await this.getSalaryRankList();
  }
}
