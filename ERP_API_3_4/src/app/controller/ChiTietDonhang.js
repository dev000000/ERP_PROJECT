const dbPromise = require('../../config/db');

const getChiTietDonHangBy_DonHangId = async (req, res) => {
    try {
        const MaDonHang = req.params.id;
        if (!MaDonHang) {
            return res.status(400).send({
                success: false,
                message: 'Không cung cấp mã đơn hàng'
            });
        }
        const db = await dbPromise;
        const [data] = await db.query(`SELECT *
                                       from ChiTietDonHang
                                       WHERE ChiTietDonHang.MaDonHang = ?`, [MaDonHang]);
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

const updateChiTietDonHangBy_MaCTDHId = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({
            success: false,
            message: 'Không cung cấp MaCTDH'
        });
        const filed = req.body;
        const keys = Object.keys(filed);
        const values = Object.values(filed);
        if (keys.length === 0) return res.status(400).send({
            success: false,
            message: 'Không có dữ liệu cần update!'
        });
        const setClause = keys.map((key) => {
            return key + " = ?";
        }).join(', ');

        const db = await dbPromise;
        const [result] = await db.query(`Update ChiTietDonHang
                                         set ${setClause}
                                         where MaCTDH = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: 'Dữ liệu không được update'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Update thành công!'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: e.message,
        });
    }
}

const deleteChiTietDonHangBy_MaCTDHId = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'No id provided'
            });
        }
        const db = await dbPromise;
        const [result] = await db.query(`Delete
                                         from ChiTietDonHang
                                         where MaCTDH = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: 'Không tồn tại CTDH'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Delete ChiTietDonHang thành công!'
        })
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: e.message
        });
    }
}

module.exports = {
    getChiTietDonHangBy_DonHangId, updateChiTietDonHangBy_MaCTDHId, deleteChiTietDonHangBy_MaCTDHId
}