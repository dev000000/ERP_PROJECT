const dbPromise = require('../../config/db');
const e = require("express");

const getAllDonHang = async (req, res) => {
    try {
        const db = await dbPromise;
        const [data] = await db.query(`SELECT DonHang.MaDonHang,
                                              DonHang.NgayMua,
                                              DonHang.TongTien,
                                              DonHang.UuDai,
                                              DonHang.GhiChu,
                                              DonHang.Status,
                                              KhachHang.TenKH,
                                              KhachHang.GioiTinh,
                                              KhachHang.NgaySinh,
                                              KhachHang.SDT,
                                              KhachHang.DiaChi
                                       from DonHang
                                            join KhachHang on KhachHang.MaKH = DonHang.MaKH`);
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

const updateDonHang = async (req, res) => {
    try {
        const MaDonHang = req.params.id;
        const fields = req.body;
        const keys = Object.keys(fields);
        const values = Object.values(fields);
        if (keys.length === 0) return res.status(400).send({
            success: false,
            message: "Không có thông tin để update",
        });
        const setClause = keys.map((key) => {
            return key + " = ?"
        }).join(", ");

        const db = await dbPromise;
        const [result] = await db.query(`Update DonHang
                                         set ${setClause}
                                         where MaDonHang = ?`, [...values, MaDonHang]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: `Không tồn tại đơn hàng với mã là ${MaDonHang}`
            });
        }
        res.status(200).send({
            success: true,
            message: 'Update DonHang Thanh Cong'
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message,
        });
    }
}

module.exports = {
    getAllDonHang, updateDonHang
}