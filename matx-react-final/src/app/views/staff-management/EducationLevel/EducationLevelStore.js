import { makeAutoObservable, runInAction } from "mobx";
import { createEducationLevelAPI, deleteEducationLevelAPI, getAllEducationLevelsAPI, updateEducationLevelAPI } from "./EducationLevelService";
import { toast } from "react-toastify";

export default class EducationLevelStore {
  educationLevelList = [];
  keyword = "";
  totalElements = 0;
  isLoaded= false;

  constructor() {
    makeAutoObservable(this);
  }
  async getEducationLevelList() {
    try {
      const response = await getAllEducationLevelsAPI();
      console.log("Education level list response:", response);
      runInAction(() => {
        this.educationLevelList = response?.data || [];
        this.totalElements = response?.data.length || 0;
        this.isLoaded = true;
      });
    } catch (error) {
      console.error("Error loading education levels:", error);
    }
  }
  async addEducationLevel(newData) {
    try {
      await createEducationLevelAPI(newData);
      await this.getEducationLevelList();
    } catch (error) {
      console.error("Error add education level:", error);
    }
  }
  
  async updateEducationLevel(id,newData) {
    try {
      await updateEducationLevelAPI(id,newData);
      await this.getEducationLevelList();
    } catch (error) {
      console.error("Error edit education level:", error);
    }
  }
  async deleteEducationLevel(id) {
    try {
      await deleteEducationLevelAPI(id);
      await this.getEducationLevelList();
    } catch (error) {
      console.error("Error delete education level:", error);
      toast.error("Error delete education level:");
    }
  }
}
