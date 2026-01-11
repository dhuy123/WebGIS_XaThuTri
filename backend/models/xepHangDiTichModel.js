const {db}= require('../config/database');

const getXepHangDiTichPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT * FROM xep_hang_di_tich
             LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getXepHangDiTichById = async (ma_xep_hang) => {
    try {
        const result = await db.query(
            `SELECT * FROM xep_hang_di_tich WHERE ma_xep_hang = $1`, [ma_xep_hang]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createXepHangDiTich = async (data) => {
    try {
        const { ten, mo_ta } = data;
      
        const result = await db.query(
            `INSERT INTO xep_hang_di_tich (ten_xep_hang , mo_ta)
             VALUES ($1, $2) RETURNING *`,
            [ten, mo_ta]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateXepHangDiTich = async (ma_xep_hang, data) => {
    try {
        const data_old = await getXepHangDiTichById(ma_xep_hang);
        if (!data_old) {
            throw new Error('Xếp hạng di tích không tồn tại');
        }
        const { ten, mo_ta } = { ...data_old, ...data };
        const result = await db.query(
            `UPDATE xep_hang_di_tich 
             SET ten_xep_hang = $1, mo_ta = $2 , updated_at = NOW()
                WHERE ma_xep_hang = $3
                RETURNING *`,
            [ten, mo_ta, ma_xep_hang]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteXepHangDiTich = async (ma_xep_hang) => {
    try {
        const result = await db.query(
            `DELETE FROM xep_hang_di_tich WHERE ma_xep_hang = $1 RETURNING *`,
            [ma_xep_hang]
        );
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};




module.exports = {
    getXepHangDiTichPaginated,
    getXepHangDiTichById,
    createXepHangDiTich,
    updateXepHangDiTich,
    deleteXepHangDiTich
}