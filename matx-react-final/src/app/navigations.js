const navigations = [
  { label: "TỔNG QUAN", type: "label" },
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { label: "QUẢN LÝ", type: "label" },
  {
    name: "QUẢN LÝ KHÁCH HÀNG",
    icon: "people",
    children: [
      { name: "KHÁCH HÀNG", iconText: "KH", path: "/customer/list" },
      { name: "CHĂM SÓC KHÁCH HÀNG", iconText: "CS", path: "/customer/support" },
      { name: "ĐƠN HÀNG", iconText: "DH", path: "/customer/order" }
    ]
  },
  {
    name: "QUẢN LÝ NHÀ CC",
    icon: "store",
    children: [
      { name: "NHÀ CUNG CẤP", iconText: "SI", path: "/supplier/list" },
      { name: "NGUYÊN VẬT LIỆU", iconText: "SU", path: "/supplier/materials" },
      { name: "HÓA ĐƠN NHẬP", iconText: "FP", path: "/supplier/purchase-invoices" },
    ]
  },
  {
    name: "QUẢN LÝ NHÂN SỰ",
    icon: "security",
    children: [
      { name: "TÀI KHOẢN", iconText: "SI", path: "/staff/account" },
      { name: "TRÌNH ĐỘ HỌC VẤN", iconText: "SU", path: "/staff/education-level" },
      { name: "TRÌNH ĐỘ NGOẠI NGỮ", iconText: "FP", path: "/staff/foreign-language-level" },
      { name: "NGẠCH LƯƠNG", iconText: "NL", path: "/staff/salary-grade" },
      { name: "BẬC LƯƠNG", iconText: "BL", path: "/staff/salary-rank" },
      { name: "CHỨC VỤ", iconText: "CV", path: "/staff/position" },
      { name: "PHÒNG BAN", iconText: "PB", path: "/staff/department" },
      { name: "NHÂN VIÊN", iconText: "NV", path: "/staff/employee" }
    ]
  },
  {
    name: "QUẢN LÝ THU CHI",
    icon: "security",
    path: "/finance"
  },
  {
    name: "QUẢN LÝ KHO HÀNG",
    icon: "security",
    path: "/inventory"
  },
  {
    name: "QUẢN LÝ BÁN HÀNG",
    icon: "security",
    path: "/sales"
  }
];

export default navigations;
