import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { createForeignLanguageLevelAPI, deleteForeignLanguageLevelAPI, getAllForeignLanguageLevelsAPI, updateForeignLanguageLevelAPI } from "./ForeignLanguageLevelService";

export default class ForeignLanguageLevelStore {
  foreignLanguageLevelList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getForeignLanguageLevelList() {
    try {
      const response = await getAllForeignLanguageLevelsAPI();
      runInAction(() => {
        this.foreignLanguageLevelList = response?.data || [];
        this.totalElements = response?.data.length || 0;
        this.isLoaded = true;
      });
    } catch (error) {
      console.error("Error loading.... ", error);
    }
  }
  async addForeignLanguageLevel(newData) {
    try {
      await createForeignLanguageLevelAPI(newData);
      await this.getForeignLanguageLevelList();
    } catch (error) {
      console.error("Error add..... ", error);
    }
  }
  
  async updateForeignLanguageLevel(id,newData) {
    try {
      await updateForeignLanguageLevelAPI(id,newData);
      await this.getForeignLanguageLevelList();
    } catch (error) {
      console.error("Error edit .....", error);
    }
  }
  async deleteForeignLanguageLevel(id) {
    try {
      await deleteForeignLanguageLevelAPI(id);
      await this.getForeignLanguageLevelList();
    } catch (error) {
      console.error("Error delete education level:", error);
      toast.error("Error delete .....");
    }
  }
}
