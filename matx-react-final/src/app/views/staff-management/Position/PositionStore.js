import { makeAutoObservable, runInAction } from "mobx";
import { createPositionAPI, deletePositionAPI, getAllPositionsAPI, updatePositionAPI } from "./PositionService";

export default class PositionStore {
  positionList = [];
  keyword = "";
  totalElements = 0;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getPositionList() {
    const response = await getAllPositionsAPI();
    runInAction(() => {
      this.positionList = response?.data || [];
      this.totalElements = response?.data.length || 0;
      this.isLoaded = true;
    });
  }
  async addPosition(newData) {
    await createPositionAPI(newData);
    await this.getPositionList();
  }

  async updatePosition(id, newData) {
    await updatePositionAPI(id, newData);
    await this.getPositionList();
  }
  async deletePosition(id) {
    await deletePositionAPI(id);
    await this.getPositionList();
  }
}
