import { makeAutoObservable, runInAction } from "mobx";
import { createEmployeeAPI, deleteEmployeeAPI, getAllEmployeesAPI, updateEmployeeAPI } from "./EmployeeService";

export default class EmployeeStore {
  employeeList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getEmployeeList() {
    const response = await getAllEmployeesAPI();
    runInAction(() => {
      this.employeeList = response?.data || [];
      this.totalElements = response?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addEmployee(newData) {
    await createEmployeeAPI(newData);
    await this.getEmployeeList();
  }

  async updateEmployee(id, newData) {
    await updateEmployeeAPI(id, newData);
    await this.getEmployeeList();
  }
  async deleteEmployee(id) {
    await deleteEmployeeAPI(id);
    await this.getEmployeeList();
  }
}
