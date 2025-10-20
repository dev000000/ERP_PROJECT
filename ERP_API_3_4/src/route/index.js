const nccController = require('../app/controller/nccController');
const khachHangController = require('../app/controller/khachHangController');
const DVChamSocKhachHang = require('../app/controller/DichVuChamSocKhachHang');
const DonHang = require('../app/controller/DonHang');
const ChiTietDonHang = require('../app/controller/ChiTietDonHang');
const NguyenVatLieu = require('../app/controller/NguyenVatLieu');
const HoaDonNhap = require('../app/controller/HoaDonNhap');


function api(app) {
    //Nhà cung cấp
    app.post('/api/NhaCungCap/create', nccController.createNcc);
    app.get('/api/NhaCungCap/get-all', nccController.getAllNcc);
    app.get('/api/NhaCungCap/get-by-id/:id', nccController.getNccById);
    app.patch('/api/NhaCungCap/update/:id', nccController.updateNcc);
    app.delete('/api/NhaCungCap/delete/:id', nccController.deleteNcc);

    //NguyenVatLieu
    app.get('/api/NguyenVatLieu/get-all', NguyenVatLieu.getAllNguyenVatLieu);
    app.post('/api/NguyenVatLieu/create', NguyenVatLieu.createNguyenVatLieu);
    app.delete('/api/NguyenVatLieu/delete/:id', NguyenVatLieu.deleteNguyenVatLieu);
    app.patch('/api/NguyenVatlieu/update/:id', NguyenVatLieu.updateNguyenVatLieu);

    //HoaDonNhap
    app.get('/api/HoaDonNhap/get-all', HoaDonNhap.getAllHoaDonNhap);
    app.patch('/api/HoaDonNhap/update/:id', HoaDonNhap.updateHoaDonNhap);

    //Khách hàng
    app.post('/api/KhachHang/create', khachHangController.createCustomers);
    app.get('/api/KhachHang/get-all', khachHangController.getAllCustomers);
    app.get('/api/KhachHang/get-by-id/:id', khachHangController.getCustomersById);
    app.patch('/api/KhachHang/update/:id', khachHangController.updateCustomers);
    app.delete('/api/KhachHang/delete/:id', khachHangController.deleteCustomers);

    //DVChamSocKhachHang
    app.get('/api/DVChamSocKhachHang/get-all', DVChamSocKhachHang.getAllDichVuChamSocKhachHang);
    app.patch('/api/DVChamSocKhachHang/update/:id', DVChamSocKhachHang.updateDichVuChamSocKhachHang);

    //DonHang
    app.get('/api/DonHang/get-all', DonHang.getAllDonHang);
    app.patch('/api/DonHang/update/:id', DonHang.updateDonHang);

    //ChiTietDonHang
    app.get('/api/ChiTietDonHang/get-by-MaDonHang/:id', ChiTietDonHang.getChiTietDonHangBy_DonHangId);
    app.patch('/api/ChiTietDonHang/update/:id', ChiTietDonHang.updateChiTietDonHangBy_MaCTDHId);
    app.delete('/api/ChiTietDonHang/delete/:id', ChiTietDonHang.deleteChiTietDonHangBy_MaCTDHId)
}

module.exports = api;