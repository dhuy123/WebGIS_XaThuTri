const { db } = require('../config/database');

const getNhaById = async (id) => {
    try {
        const result = await db.query(
            `SELECT n.*, 
                    httg.ten_hien_trang AS ten_hien_trang
             FROM nha n
             JOIN loai_hien_trang httg ON n.loai_hien_trang = httg.ma_hien_trang
             WHERE n.id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

        

module.exports = {
    getNhaById
};