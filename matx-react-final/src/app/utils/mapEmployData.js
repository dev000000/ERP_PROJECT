const initialValuesEmployee = {
  MaNV: "",
  HoTen: "",
  GioiTinh: "",
  NgaySinh: "",
  ThuongTru: "",
  TamTru: "",
  SoCMND: "",
  SDT: "",
  Email: "",
  MaChucVu: null,
  MaPhong: null,
  MaTDHV: null,
  MaTDNN: null,
  MaBac: null,
  SoTaiKhoan: "",
  NganHang: ""
};
export const mapEmployeeData = (data, stores) => {
  if (!data) return initialValuesEmployee;

  const {
    positionStore,
    departmentStore,
    educationLevelStore,
    foreignLanguageLevelStore,
    salaryRankStore
  } = stores;

  // Hàm tìm id từ danh sách bằng tên
  const findIdByName = (list, nameField, valueField, nameValue) => {
    const match = list?.find((item) =>
      String(item[nameField]).trim().toLowerCase() === String(nameValue).trim().toLowerCase()
    );
    return match ? match[valueField] : null;
  };

  return {
    MaNV: data.MaNV ?? "",
    HoTen: data.HoTen ?? "",
    GioiTinh: data.GioiTinh ?? "",
    NgaySinh: data.NgaySinh ? data.NgaySinh.split("T")[0] : "",
    ThuongTru: data.ThuongTru ?? "",
    TamTru: data.TamTru ?? "",
    SoCMND: data.SoCMND ?? "",
    SDT: data.SDT ?? "",
    Email: data.Email ?? "",
    MaChucVu: findIdByName(positionStore.positionList, "TenChucVu", "MaChucVu", data.TenChucVu),
    MaPhong: findIdByName(departmentStore.departmentList, "TenPhongBan", "MaPhongBan", data.TenPhongBan),
    MaTDHV: findIdByName(educationLevelStore.educationLevelList, "TenTrinhDo", "MaTDHV", data.TenTrinhDo),
    MaTDNN: findIdByName(foreignLanguageLevelStore.foreignLanguageLevelList, "CapDoNgoaiNgu", "MaTDNN", data.CapDoNgoaiNgu),
    MaBac: findIdByName(salaryRankStore.salaryRankList, "TenBac", "MaBac", data.TenBac),
    SoTaiKhoan: data.SoTaiKhoan ?? "",
    NganHang: data.NganHang ?? ""
  };
};
