const {db} = require('../config/database');

const getDuongBoPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT db.* , dt.ten_doi_tuong,  httg.ten_hien_trang
                FROM duong_bo db 
                JOIN loai_doi_tuong dt ON db.ma_doi_tuong = dt.ma_doi_tuong AND db.nhom_doi_tuong = dt.nhom_doi_tuong
                JOIN loai_hien_trang httg ON db.loai_hien_trang = httg.ma_hien_trang
                LIMIT $1 OFFSET $2`, [limit, offset]
        );
        
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getDuongBoById = async (id) => {
    try {
        const result = await db.query(
           `SELECT db.*, dt.ten_doi_tuong,  httg.ten_hien_trang
                FROM duong_bo db 
                JOIN loai_doi_tuong dt ON db.ma_doi_tuong = dt.ma_doi_tuong AND db.nhom_doi_tuong = dt.nhom_doi_tuong
                JOIN loai_hien_trang httg ON db.loai_hien_trang = httg.ma_hien_trang
                WHERE db.id = $1`, [id]
        );
        console.log('Query result:', result.rows);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

const createDuongBo = async (data) => {
    try {
        if (!data.geom) {
            throw new Error('Thiếu dữ liệu hình học (geom)');
        }

        const result = await db.query(
            `
            INSERT INTO duong_bo (
                ma_doi_tuong, nhom_doi_tuong, loai_hien_trang, loai_duong_bo, cap_ky_thuat,
                loai_chat_lieu, chieu_xe_chay, vi_tri, so_lan_duong, chieu_rong,
                lien_ket_giao_thong, ten_tuyen_quoc_gia, ten_quoc_lo, ten_duong_tinh,
                ten_duong_xa, ten_duong_do_thi,
                geom, chieu_dai_m
            )
            VALUES (
                $1,$2,$3,$4,$5,
                $6,$7,$8,$9,$10,
                $11,$12,$13,$14,
                $15,$16,
                ST_SetSRID(ST_GeomFromGeoJSON($17), 4326),
                $18
            )
            RETURNING *
            `,
            [
                data.ma_doi_tuong,
                data.nhom_doi_tuong,
                data.loai_hien_trang,
                data.loai_duong_bo,
                data.cap_ky_thuat,
                data.loai_chat_lieu,
                data.chieu_xe_chay,
                data.vi_tri,
                data.so_lan_duong,
                data.chieu_rong,
                data.lien_ket_giao_thong,
                data.ten_tuyen_quoc_gia,
                data.ten_quoc_lo,
                data.ten_duong_tinh,
                data.ten_duong_xa,
                data.ten_duong_do_thi,
                JSON.stringify(data.geom),
                data.chieu_dai_m
            ]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


 

module.exports = {
    getDuongBoPaginated,
    getDuongBoById,
    createDuongBo
};
