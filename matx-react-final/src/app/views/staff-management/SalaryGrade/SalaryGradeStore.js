import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import {
  createSalaryGradeAPI,
  deleteSalaryGradeAPI,
  getAllSalaryGradesAPI,
  updateSalaryGradeAPI
} from "./SalaryGradeService";

export default class SalaryGradeStore {
  salaryGradeList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getSalaryGradeList() {
    const response = await getAllSalaryGradesAPI();
    runInAction(() => {
      this.salaryGradeList = response?.data || [];
      this.totalElements = response?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addSalaryGrade(newData) {
    await createSalaryGradeAPI(newData);
    await this.getSalaryGradeList();
  }

  async updateSalaryGrade(id, newData) {
    await updateSalaryGradeAPI(id, newData);
    await this.getSalaryGradeList();
  }
  async deleteSalaryGrade(id) {
    await deleteSalaryGradeAPI(id);
    await this.getSalaryGradeList();
  }
}
