// /**
//  * Kiểm tra xem bản ghi đã tồn tại trong danh sách hay chưa
//  * @param {Array<Object>} list - danh sách dữ liệu (mảng các object)
//  * @param {Object} target - đối tượng cần kiểm tra (các key-value tương ứng)
//  * @param {Array<string>} fields - danh sách tên trường cần so sánh
//  * @returns {boolean} true nếu tồn tại bản ghi trùng hoàn toàn, false nếu chưa
//  */
export const existsByFields = (list, target, fields) => {
  return list.some((item) =>
    fields.every((field) => item[field] == target[field])
  );
};


// cach su dung 

// const data = [
//   { MaTDHV: 1, LoaiTrinhDo: "Trung cấp 2", TenTrinhDo: "Giáo sư Công nghệ thông tin 8 2" },
//   { MaTDHV: 2, LoaiTrinhDo: "Đại học", TenTrinhDo: "Kỹ sư Công nghệ thông tin" },
//   { MaTDHV: 3, LoaiTrinhDo: "Thạc sĩ", TenTrinhDo: "Quản trị kinh doanh" },
//   { MaTDHV: 4, LoaiTrinhDo: "Cao đẳng", TenTrinhDo: "Cử nhân Kế toán" },
// ];

// const newRecord = {
//   LoaiTrinhDo: "Đại học",
//   TenTrinhDo: "Kỹ sư Công nghệ thông tin",
// };

// // ✅ Kiểm tra trùng 2 trường
// console.log(existsByFields(data, newRecord, ["LoaiTrinhDo", "TenTrinhDo"])); 
// // 👉 true

// // ✅ Kiểm tra trùng 3 trường (thêm cả MaTDHV)
// console.log(existsByFields(data, { MaTDHV: 5, ...newRecord }, ["MaTDHV", "LoaiTrinhDo", "TenTrinhDo"])); 
// // 👉 false