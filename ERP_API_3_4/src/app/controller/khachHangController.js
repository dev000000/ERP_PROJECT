const dbPromise = require('../../config/db');

const createCustomers = async (req, res) => {
    try {
        const {TenKH, GioiTinh, NgaySinh, SDT, DiaChi} = req.body;
        if (!TenKH || !GioiTinh || !SDT || !DiaChi || !NgaySinh) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp đủ dữ liêu!'
            });
        }
        const db = await dbPromise;
        const [data] = await db.query(`Insert into KhachHang(TenKH, GioiTinh, NgaySinh, SDT, DiaChi)
                                       values (?, ?, ?, ?, ?)`, [TenKH, GioiTinh, NgaySinh, SDT, DiaChi]);
        if (!data) {
            return res.status(400).json({
                success: false,
                message: 'Có lỗi khi thêm Khách Hàng'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Thêm một Khách Hàng Thành công'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            success: false,
            error: e
        })
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const db = await dbPromise;
        const [data] = await db.query(`Select *
                                       from KhachHang`);
        if (data.length === 0) {
            return res.status(204).send({
                success: true,
                message: 'Không có khách hàng nào!'
            });
        }
        return res.status(200).send({
            success: true,
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API getAllNcc',
            error: e
        });
    }
}

const getCustomersById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({
            success: false,
            message: 'Không có Id'
        });
        const db = await dbPromise;
        const [data] = await db.query(`Select *
                                       from KhachHang
                                       where MaKH = ?`, [id]);
        if (data.length === 0) {
            return res.status(204).send({
                success: true,
                message: `Không có khách hàng nào với id = ${id}`
            });
        }
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API getKhachHangById',
            error: e
        });
    }
}

const updateCustomers = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({
            success: false,
            message: 'Không cung cấp id'
        });
        const field = req.body;
        const keys = Object.keys(field);
        const values = Object.values(field);
        if (keys.length === 0) return res.status(400).send({
            success: false,
            message: 'Không có dữ liệu để update'
        });
        const setClause = keys.map((key) => {
            return key + " = ?"
        }).join(', ');
        const db = await dbPromise;
        const [result] = await db.query(`Update KhachHang
                                         set ${setClause}
                                         where MaKH = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: `Không tồn tại customers với id = ${id}`
            });
        }
        res.status(200).send({
            success: true,
            message: 'Update customers thành công!'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API updateCustomers',
            error: e
        });
    }
}

const deleteCustomers = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({
            success: false,
            message: 'Không cung cấp id'
        });
        const db = await dbPromise;
        const [result] = await db.query(`Delete from KhachHang where MaKH = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: `Không tồn tại customers với id = ${id}`
            });
        }
        res.status(200).send({
            success: true,
            message: 'Xóa customers thành công'
        })
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API deleteCustomers',
            error: e
        })
    }
}

module.exports = {
    getCustomersById, deleteCustomers, updateCustomers, getAllCustomers, createCustomers
}