import { createContext, useContext } from "react";
import AccountStore from "./views/staff-management/Account/AccountStore";
import EducationLevelStore from "./views/staff-management/EducationLevel/EducationLevelStore";
import ForeignLanguageLevelStore from "./views/staff-management/ForeignLanguageLevel/ForeignLanguageLevelStore";
import SalaryGradeStore from "./views/staff-management/SalaryGrade/SalaryGradeStore";
import SalaryRankStore from "./views/staff-management/SalaryRank/SalaryRankStore";
import PositionStore from "./views/staff-management/Position/PositionStore";
import DepartmentStore from "./views/staff-management/Department/DepartmentStore";
import EmployeeStore from "./views/staff-management/Employee/EmployeeStore";
import CustomerStore from "./views/customer-management/Customer/CustomerStore";
import SupportStore from "./views/customer-management/Support/SupportStore";
import OrderStore from "./views/customer-management/Order/OrderStore";
import SupplierStore from "./views/supplier-management/Supplier/SupplierStore";
import MaterialsStore from "./views/supplier-management/Materials/MaterialsStore";
import PurchaseInvoicesStore from "./views/supplier-management/PurchaseInvoices/PurchaseInvoicesStore";

export const store = {
  accountStore: new AccountStore(),
  educationLevelStore: new EducationLevelStore(),
  foreignLanguageLevelStore: new ForeignLanguageLevelStore(),
  salaryGradeStore: new SalaryGradeStore(),
  salaryRankStore: new SalaryRankStore(),
  positionStore: new PositionStore(),
  departmentStore: new DepartmentStore(),
  employeeStore: new EmployeeStore(),
  customerStore: new CustomerStore(),
  supportStore: new SupportStore(),
  orderStore: new OrderStore(),
  supplierStore: new SupplierStore(),
  materialsStore: new MaterialsStore(),
  purchaseInvoicesStore: new PurchaseInvoicesStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}