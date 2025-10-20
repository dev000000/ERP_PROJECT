const dbPromise = require('../../config/db');
const e = require("express");

const getAllDichVuChamSocKhachHang = async (req, res) => {
    try {
        const db = await dbPromise;
        const [data] = await db.query(`Select KhachHang.TenKH,
                                              KhachHang.GioiTinh,
                                              KhachHang.NgaySinh,
                                              KhachHang.SDT,
                                              KhachHang.DiaChi,
                                              DVChamSocKhachHang.MaDVCSKH,
                                              DVChamSocKhachHang.LoaiPhanHoi,
                                              DVChamSocKhachHang.TrangThai,
                                              NhanVien.TenNV,
                                              NhanVien.Email as EmailNV
                                       from KhachHang
                                                join DVChamSocKhachHang on DVChamSocKhachHang.MaKH = KhachHang.MaKH
                                                join NhanVien on NhanVien.MaNV = DVChamSocKhachHang.MaNV
        `);
        if (data.length === 0) {
            return res.status(204).send({
                success: true,
                data: data
            });
        }
        res.status(200).send({
            success: true,
            data: data
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message,
        });
    }
}

const updateDichVuChamSocKhachHang = async (req, res) => {
    try {
        const id = req.params.id;
        const {TrangThai} = req.body;
        if (!TrangThai) {
            return res.status(400).send({
                success: false,
                message: 'Không có dữ liệu để update',
            });
        }
        const db = await dbPromise;
        const [result] = await db.query(`Update DVChamSocKhachHang
                                         set TrangThai = ?
                                         where MaDVCSKH = ?`, [TrangThai, id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: `Không tồn tại dịch vụ với id = ${id}`
            });
        }
        res.status(200).send({
            success: true,
            message: 'Update thành công!    '
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message,
        });
    }
}

module.exports = {
    getAllDichVuChamSocKhachHang, updateDichVuChamSocKhachHang
}