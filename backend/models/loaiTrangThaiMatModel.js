const {db}= require('../config/database');

const getLoaiTrangThaiMatPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT * FROM loai_trang_thai_nuoc_mat
             LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getLoaiTrangThaiMatById = async (id) => {
    try {
        const result = await db.query(
            `SELECT * FROM loai_trang_thai_nuoc_mat WHERE id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createLoaiTrangThaiMat = async (data) => {
    try {
        const { ten, mo_ta } = data;
      
        const result = await db.query(
            `INSERT INTO loai_trang_thai_nuoc_mat (ten, mo_ta)
             VALUES ($1, $2) RETURNING *`,
            [ten, mo_ta]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateLoaiTrangThaiMat = async (id, data) => {
    try {
        const data_old = await getLoaiTrangThaiMatById(id);
        if (!data_old) {
            throw new Error('Loại trạng thái mặt nước không tồn tại');
        }
        const { ten, mo_ta } = { ...data_old, ...data };
        const result = await db.query(
            `UPDATE loai_trang_thai_nuoc_mat 
             SET ten = $1, mo_ta = $2 , updated_at = NOW()
                WHERE id = $3
                RETURNING *`,
            [ten, mo_ta, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteLoaiTrangThaiMat = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM loai_trang_thai_nuoc_mat WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};




module.exports = {
    getLoaiTrangThaiMatPaginated,
    getLoaiTrangThaiMatById,
    createLoaiTrangThaiMat,
    updateLoaiTrangThaiMat,
    deleteLoaiTrangThaiMat
}