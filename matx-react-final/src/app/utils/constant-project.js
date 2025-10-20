const LOAI_TRINH_DO_OPTIONS = ["Trung cấp", "Cao đẳng", "Đại học", "Thạc sĩ", "Tiến sĩ"];

const LOAI_NGON_NGU_OPTIONS = [
  "Tiếng Anh",
  "Tiếng Nhật",
  "Tiếng Hàn",
  "Tiếng Trung",
  "Tiếng Pháp",
  "Tiếng Đức",
  "Tiếng Nga",
  "Tiếng Tây Ban Nha"
];
const TRANG_THAI_CHUC_VU_OPTIONS = ["Đang áp dụng", "Ngừng áp dụng"];

const TRANG_THAI_PHONG_BAN_OPTIONS = ["Hoạt động", "Ngừng hoạt động"];
const GIOI_TINH_OPTIONS = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ",  label: "Nữ" },
];
const TRANG_THAI_KHACH_HANG_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Block",  label: "Block" },
];
const TRANG_THAI_CHAM_SOC_KH_OPTIONS = [
  { value: "Đã ghi nhận", label: "Đã ghi nhận" },
  { value: "Chưa xử lí",  label: "Chưa xử lí" },
  { value: "Đang xử lý",  label: "Đang xử lý" },
  { value: "Đã liên hệ khách hàng",  label: "Đã liên hệ khách hàng" },
  { value: "Đã hoàn thành",  label: "Đã hoàn thành" },
];
const TRANG_THAI_HOA_DON_NHAP_OPTIONS = [
  { value: "Chưa nhập đủ hàng", label: "Chưa nhập đủ hàng" },
  { value: "Thiếu hàng",  label: "Thiếu hàng" },
  { value: "Nhập đủ hàng",  label: "Nhập đủ hàng" },
];
const TRANG_THAI_DON_HANG_OPTIONS = [
  { value: "Đã xử lí", label: "Đã xử lí" },
  { value: "Chờ xử lí",  label: "Chờ xử lí" },
];
const TRANG_THAI_KHACH_HANG_OPTIONS_2 = ["Active", "Block"];
const GIOI_TINH_OPTIONS_2 = ["Nam", "Nữ"];

const ROLE = ["Quản trị viên","Nhân viên kinh doanh", "Kế toán", "Nhân viên bán hàng", "Nhân viên thu mua", "Thủ kho"];

const ROLE_OPTIONS = [
  // { value: "Quản trị viên", label: "Quản trị viên" },
  { value: "Nhân viên kinh doanh", label: "Nhân viên kinh doanh" },
  { value: "Kế toán", label: "Kế toán" },
  { value: "Nhân viên bán hàng", label: "Nhân viên bán hàng" },
  { value: "Nhân viên thu mua", label: "Nhân viên thu mua" },
  { value: "Thủ kho", label: "Thủ kho" }
];
export {
  LOAI_TRINH_DO_OPTIONS,
  LOAI_NGON_NGU_OPTIONS,
  TRANG_THAI_CHUC_VU_OPTIONS,
  TRANG_THAI_PHONG_BAN_OPTIONS,
  GIOI_TINH_OPTIONS,
  TRANG_THAI_KHACH_HANG_OPTIONS,
  GIOI_TINH_OPTIONS_2,
  TRANG_THAI_CHAM_SOC_KH_OPTIONS,
  TRANG_THAI_DON_HANG_OPTIONS,
  TRANG_THAI_HOA_DON_NHAP_OPTIONS,
  ROLE_OPTIONS,
};
