import AuthAdmin from "app/auth/AuthAdmin";
import { lazy } from "react";

const AccountIndex = lazy(() => import("./Account/AccountIndex"));
const EducationLevelIndex = lazy(() => import("./EducationLevel/EducationLevelIndex"));
const ForeignLanguageLevelIndex = lazy(() =>
  import("./ForeignLanguageLevel/ForeignLanguageLevelIndex")
);
const SalaryGradeIndex = lazy(() => import("./SalaryGrade/SalaryGradeIndex"));
const SalaryRankIndex = lazy(() => import("./SalaryRank/SalaryRankIndex"));
const PostionIndex = lazy(() => import("./Position/PositionIndex"));
const DepartmentIndex = lazy(() => import("./Department/DepartmentIndex"));
const EmployeeIndex = lazy(() => import("./Employee/EmployeeIndex"));

const staffRoutes = [
  {
    path: "/staff/account",
    element: (
      <AuthAdmin>
        <AccountIndex />
      </AuthAdmin>
    )
  },
  { path: "/staff/education-level", element: <EducationLevelIndex /> },
  { path: "/staff/foreign-language-level", element: <ForeignLanguageLevelIndex /> },
  { path: "/staff/salary-grade", element: <SalaryGradeIndex /> },
  { path: "/staff/salary-rank", element: <SalaryRankIndex /> },
  { path: "/staff/position", element: <PostionIndex /> },
  { path: "/staff/department", element: <DepartmentIndex /> },
  { path: "/staff/employee", element: <EmployeeIndex /> }
];

export default staffRoutes;
