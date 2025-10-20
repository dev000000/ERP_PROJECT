const dbPromise = require('../../config/db');

const createNcc = async (req, res) => {
    try {
        const {TenNCC, DiaChi, Email, SDT} = req.body;
        if (!TenNCC || !DiaChi || !Email || !SDT) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng cung cấp đầy đủ thông tin'
            });
        }
        const db = await dbPromise;
        const [data] = await db.query(`Insert into NhaCungCap(TenNCC, DiaChi, Email, SDT)
                                 values (?, ?, ?, ?)`, [TenNCC, DiaChi, Email, SDT]);
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Có lỗi xảy ra khi thêm nhà cung cấp'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Thêm mới nhà cung cấp thành công'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            success: false,
            error: e
        })
    }
}

const getAllNcc = async (req, res) => {
    try {
        const db = await dbPromise;
        const [data] = await db.query(`Select *
                                       from NhaCungCap`);
        if (data.length === 0) {
            return res.status(204).send({
                success: true,
                message: 'Không có nhà cung cấp nào'
            });
        }
        return res.status(200).send({
            success: true,
            data: data
        })
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API getAllNcc',
            error: e
        });
    }
}

const getNccById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({
            success: false,
            message: 'Không có Id'
        });
        const db = await dbPromise;
        const [data] = await db.query(`Select *
                                       from NhaCungCap
                                       where MaNhaCungCap = ?`, [id]);
        if (data.length === 0) {
            return res.status(204).send({
                success: true,
                message: `Không có nhà cung cấp nào với id = ${id}`
            });
        }
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API getNccById',
            error: e
        });
    }
}

const updateNcc = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({
            success: false,
            message: 'Không cugn cấp id'
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
        const [result] = await db.query(`Update NhaCungCap
                                         set ${setClause}
                                         where MaNhaCungCap = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: `Không tồn tại ncc với id = ${id}`
            });
        }
        res.status(200).send({
            success: true,
            message: 'Update ncc thành công!'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API updateNcc',
            error: e
        });
    }
}

const deleteNcc = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({
            success: false,
            message: 'Không cung cấp id'
        });
        const db = await dbPromise;
        const [result] = await db.query(`Delete
                                         from NhaCungCap
                                         where MaNhaCungCap = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: `Không tồn tại ncc với id = ${id}`
            });
        }
        res.status(200).send({
            success: true,
            message: 'Xóa ncc thành công'
        })
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Có lỗi xảy ra với API deleteNcc',
            error: e
        })
    }
}

module.exports = {
    getNccById, deleteNcc, updateNcc, getAllNcc, createNcc
}