const { db } = require('../config/database');

const getLoaiHienTrangPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const totalResult = await db.query(`SELECT COUNT(*) FROM loai_hien_trang`);
        const total = parseInt(totalResult.rows[0].count);
        const result = await db.query(
            `SELECT * FROM loai_hien_trang
            order BY ma_hien_trang
             LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return {
            data: result.rows,
            total,
            page,
            limit
        };
    } catch (error) {
        throw error;
    }
};

const getLoaiHienTrangById = async (id) => {
    try {
        const result = await db.query(
            `SELECT * FROM loai_hien_trang WHERE id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createLoaiHienTrang = async (data) => {
    try {
        const { ma_hien_trang, ten_hien_trang, mo_ta } = data;

        const result = await db.query(
            `INSERT INTO loai_hien_trang (ma_hien_trang, ten_hien_trang, mo_ta)
             VALUES ($1, $2, $3) RETURNING *`,
            [ma_hien_trang, ten_hien_trang, mo_ta]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateLoaiHienTrang = async (id, data) => {
    try {
        const data_old = await getLoaiHienTrangById(id);
        if (!data_old) {
            throw new Error('Loại hiện trạng không tồn tại');
        }
        const { ma_hien_trang, ten_hien_trang, mo_ta } = { ...data_old, ...data };
        const result = await db.query(
            `UPDATE loai_hien_trang 
             SET ma_hien_trang = $1, ten_hien_trang = $2, mo_ta = $3
                WHERE id = $4
                RETURNING *`,
            [ma_hien_trang, ten_hien_trang, mo_ta, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteLoaiHienTrang = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM loai_hien_trang WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};

const searchLoaiHienTrang = async (keyword, page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const totalResult = await db.query(
            `SELECT COUNT(*) FROM loai_hien_trang 
             WHERE ma_hien_trang ILIKE $1 OR ten_hien_trang ILIKE $1`,
            [`%${keyword || ''}%`]
        );
        const total = parseInt(totalResult.rows[0].count);

        let query = `SELECT * FROM loai_hien_trang WHERE ma_hien_trang ILIKE $1 OR ten_hien_trang ILIKE $1
                     ORDER BY ma_hien_trang
                     LIMIT $2 OFFSET $3`;
        let values = [`%${keyword || ''}%`, limit, offset];
        const result = await db.query(query, values);
        return {
            data: result.rows,
            page,
            limit,
            total
        }
        
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getLoaiHienTrangPaginated,
    getLoaiHienTrangById,
    createLoaiHienTrang,
    updateLoaiHienTrang,
    deleteLoaiHienTrang,
    searchLoaiHienTrang
}