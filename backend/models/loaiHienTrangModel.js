const {db}= require('../config/database');

const getLoaiHienTrangPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT * FROM loai_hien_trang
             LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
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

// const searchLoaiHienTrang = async (data, page, limit) => {
//     try {
//         const offset = (page - 1) * limit;
//         const {ma_hien_trang, ten_hien_trang, mo_ta} = data;

//         let query = `SELECT * FROM loai_hien_trang WHERE 1=1`;
//         let queryParams = [];
//         let paramIndex = 1;
//         if (ma_hien_trang) {
//             query += ` AND ma_hien_trang ILIKE $${paramIndex}`;
//             queryParams.push(`%${ma_hien_trang}%`);
//             paramIndex++;
//         }
//         if (ten_hien_trang) {
//             query += ` AND ten_hien_trang ILIKE $${paramIndex}`;
//             queryParams.push(`%${ten_hien_trang}%`);
//             paramIndex++;
//         }
//     } catch (error) {
//         throw error;
//     }
// };


module.exports = {
    getLoaiHienTrangPaginated,
    getLoaiHienTrangById,
    createLoaiHienTrang,
    updateLoaiHienTrang,
    deleteLoaiHienTrang,
    // searchLoaiHienTrang
}