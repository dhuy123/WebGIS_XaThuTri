const { db } = require('../config/database');

const getDuongDiaGioiHanhChinhById = async (id) => {
    console.log('ID nhận được trong model:');
    try {
        const result = await db.query(
            `SELECT tg.*, dt.ten_doi_tuong AS ten_doi_tuong
             FROM duong_dia_gioi_hanh_chinh tg
             JOIN loai_doi_tuong dt ON tg.ma_doi_tuong = dt.ma_doi_tuong AND tg.nhom_doi_tuong = dt.nhom_doi_tuong
             WHERE tg.id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getDuongDiaGioiHanhChinhById
};
