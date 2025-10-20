import { makeAutoObservable, runInAction } from "mobx";
import { createDepartmentAPI, deleteDepartmentAPI, getAllDepartmentsAPI, updateDepartmentAPI } from "./DepartmentService";

export default class DepartmentStore {
  departmentList = [];
  keyword = "";
  totalElements = 0;
  isLoaded= false;

  constructor() {
    makeAutoObservable(this);
  }
  async getDepartmentList() {
    const response = await getAllDepartmentsAPI();
    runInAction(() => {
      this.departmentList = response?.data || [];
      this.totalElements = response?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addDepartment(newData) {
    await createDepartmentAPI(newData);
    await this.getDepartmentList();
  }

  async updateDepartment(id, newData) {
    await updateDepartmentAPI(id, newData);
    await this.getDepartmentList();
  }
  async deleteDepartment(id) {
    await deleteDepartmentAPI(id);
    await this.getDepartmentList();
  }
}
