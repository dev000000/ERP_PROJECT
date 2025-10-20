const dbPromise = require('../../config/db');
const e = require("express");

const getAllNguyenVatLieu = async (req, res) => {
    try {
        const db = await dbPromise;
        const [data] = await db.query(`Select NguyenVatLieu.MaNVL,
                                              NguyenVatLieu.TenNVL,
                                              NguyenVatLieu.DonViTinh,
                                              NguyenVatLieu.DonGia,
                                              NhaCungCap.TenNCC
                                       from NguyenVatLieu
                                            join NhaCungCap on NhaCungCap.MaNhaCungCap = NguyenVatLieu.MaNhaCungCap;`);
        if (data.length === 0) {
            return res.status(204).send({
                success: false,
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
            message: e.message
        });
    }
}

const createNguyenVatLieu = async (req, res) => {
    try {
        const {TenNVL, DonViTinh, DonGia, MaNhaCungCap} = req.body;
        if (!TenNVL || !DonViTinh || !DonGia || !MaNhaCungCap) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng cung cấp đủ thông tin'
            });
        }
        const db = await dbPromise;
        const [result] = await db.query(`Insert into NguyenVatLieu(TenNVL, DonViTinh, DonGia, MaNhaCungCap)
                                         values (?, ?, ?, ?)`, [TenNVL, DonViTinh, DonGia, MaNhaCungCap]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: 'Nguyên vật liệu chưa được thêm!'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Thêm nguyên vật liệu thành công!'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: e.message
        });
    }
}

const deleteNguyenVatLieu = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'No Id provide'
            });
        }
        const db = await dbPromise;
        const [result] = await db.query(`Delete
                                         from NguyenVatLieu
                                         where MaNVL = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: 'Không có NVL nào được xóa'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Xóa NVL thành công!'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: e.message
        });
    }
}

const updateNguyenVatLieu = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'No Id provide'
            });
        }
        const filed = req.body;
        const keys = Object.keys(filed);
        const values = Object.values(filed);
        if (keys.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Không có dữ liệu để update!'
            });
        }
        const setClause = keys.map((key) => {
            return key + " = ? "
        }).join(', ');

        const db = await dbPromise;
        const [result] = await db.query(`Update NguyenVatLieu
                                         set ${setClause}
                                         where MaNVL = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: 'Không tồn tại Nguyên Vật Liệu'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Update nguyên vật liệu thành công !'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: e.message
        });
    }
}

module.exports = {
    getAllNguyenVatLieu, createNguyenVatLieu, deleteNguyenVatLieu, updateNguyenVatLieu
}