const dbPromise = require('../../config/db');

const getAllHoaDonNhap = async (req, res) => {
    try {
        const db = await dbPromise;
        const [data] = await db.query(`SELECT HoaDonNhap.MaHDN,
                                              HoaDonNhap.SoLuongYeuCau,
                                              HoaDonNhap.SoLuongThucNhan,
                                              HoaDonNhap.NgayNhap,
                                              HoaDonNhap.HSD,
                                              HoaDonNhap.LoSX,
                                              HoaDonNhap.TrangThai,
                                              HoaDonNhap.ThanhTien,
                                              NguyenVatLieu.TenNVL,
                                              NguyenVatLieu.DonViTinh,
                                              NguyenVatLieu.DonGia,
                                              NhaCungCap.TenNCC,
                                              NhanVien.TenNV,
                                              NhanVien.Email as EmailNV
                                       FROM HoaDonNhap
                                                join NguyenVatLieu on NguyenVatLieu.MaNVL = HoaDonNhap.MaNVL
                                                join NhaCungCap on NhaCungCap.MaNhaCungCap = NguyenVatLieu.MaNhaCungCap
                                                join NhanVien on NhanVien.MaNV = HoaDonNhap.MaNV`);
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
        return res.status(500).send({
            success: false,
            message: e.message,
        });
    }
}

const updateHoaDonNhap = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'id is required'
            });
        }
        const fields = req.body;
        const keys = Object.keys(fields);
        const values = Object.values(fields);
        if (keys.length === 0) return res.status(400).send({
            success: false,
            message: 'Không có dữ liệu để update'
        });
        const setClause = keys.map((key) => {
            return key + " = ? ";
        }).join(', ');

        const db = await dbPromise;
        const [result] = await db.query(`Update HoaDonNhap
                                         set ${setClause}
                                         where MaHDN = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: 'Không tồn tại HoaDonNhap'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Update thành công'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: e.message,
        });
    }
}

module.exports = {
    getAllHoaDonNhap, updateHoaDonNhap
}
