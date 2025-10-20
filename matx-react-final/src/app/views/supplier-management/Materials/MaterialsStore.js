import { makeAutoObservable, runInAction } from "mobx";
import { createMaterialsAPI, deleteMaterialsAPI, getAllMaterialssAPI, updateMaterialsAPI } from "./MaterialsService";


export default class MaterialsStore {
  materialsList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getMaterialsList() {
    const response = await getAllMaterialssAPI();
    console.log(response);
    runInAction(() => {
      this.materialsList = response?.data?.data || [];
      this.totalElements = response?.data?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addMaterials(newData) {
    await createMaterialsAPI(newData);
    await this.getMaterialsList();
  }

  async updateMaterials(id, newData) {
    await updateMaterialsAPI(id, newData);
    await this.getMaterialsList();
  }
  async deleteMaterials(id) {
    await deleteMaterialsAPI(id);
    await this.getMaterialsList();
  }
}
