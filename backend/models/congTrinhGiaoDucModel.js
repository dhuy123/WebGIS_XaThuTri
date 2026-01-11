const { db } = require('../config/database');

const getCongTrinhGiaoDucPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT dg.*, dt.ten_doi_tuong AS ten_doi_tuong,
                    httg.ten_hien_trang AS ten_hien_trang
                FROM cong_trinh_giao_duc dg
                JOIN loai_doi_tuong dt ON dg.ma_doi_tuong = dt.ma_doi_tuong AND dg.nhom_doi_tuong = dt.nhom_doi_tuong
                JOIN loai_hien_trang httg ON dg.loai_hien_trang = httg.ma_hien_trang
                LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getCongTrinhGiaoDucById = async (id) => {
    try {
        const result = await db.query(
            `SELECT dg.*, dt.ten_doi_tuong AS ten_doi_tuong,
                    httg.ten_hien_trang AS ten_hien_trang
             FROM cong_trinh_giao_duc dg
             JOIN loai_doi_tuong dt ON dg.ma_doi_tuong = dt.ma_doi_tuong AND dg.nhom_doi_tuong = dt.nhom_doi_tuong
             JOIN loai_hien_trang httg ON dg.loai_hien_trang = httg.ma_hien_trang
             WHERE dg.id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

const createCongTrinhGiaoDuc = async (data) => {
    try {
        const {
            ma_doi_tuong,
            ten,
            loai_hien_trang,
            so_dien_thoai,
            email,
            url,
            so_lop,
            so_hoc_sinh,
            so_giao_vien,
            nam_hoc,
            dia_chi,
            dien_tich,
            geom,
            longitude,
            latitude,
        } = data;

        

        let geomSQL = null;
        let geomParams = [];

        if (geom) {
            geomSQL = `ST_SetSRID(ST_GeomFromGeoJSON($13), 4326)`;
            geomParams.push(JSON.stringify(geom));
        }
        else if (longitude && latitude) {
            geomSQL = `ST_SetSRID(ST_MakePoint($14, $15), 4326)`;
            geomParams.push(longitude, latitude);
        }
        else {
           throw new Error('Dữ liệu hình học không hợp lệ');
        }


        const result = await db.query(
            `
      INSERT INTO cong_trinh_giao_duc (
        ma_doi_tuong, ten, loai_hien_trang, so_dien_thoai,
            email,
            url,
            so_lop,
            so_hoc_sinh,
            so_giao_vien,
            nam_hoc,
            dia_chi,
            dien_tich,
        geom
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        ${geomSQL}
      )
      RETURNING *
      `,
            [
                ma_doi_tuong,
                ten,
                loai_hien_trang,
                so_dien_thoai,
                email,
                url,
                so_lop,
                so_hoc_sinh,
                so_giao_vien,
                nam_hoc,
                dia_chi,
                dien_tich,
                ...geomParams
            ]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateCongTrinhGiaoDuc  = async (id, data) => {
    try {
        const data_old = await getCongTrinhGiaoDucById(id);
        if (!data_old) {
            throw new Error('Công trình giáo dục không tồn tại');
        } 
        const {
            ma_doi_tuong,
            ten,
            loai_hien_trang,
            so_dien_thoai,
            email,
            url,
            so_lop,
            so_hoc_sinh,
            so_giao_vien,
            nam_hoc,
            dia_chi,
            dien_tich,
            geom,
            longitude,
            latitude,
        } = { ...data_old, ...data };
        let geomSQL = null;
        let geomParams = [];
        if (geom) {
            geomSQL = `ST_SetSRID(ST_GeomFromGeoJSON($14), 4326)`;
            geomParams.push(JSON.stringify(geom));
        }
        else if (longitude && latitude) {
            geomSQL = `ST_SetSRID(ST_MakePoint($15, $16), 4326)`;
            geomParams.push(longitude, latitude);
        }   else {
            geomSQL = `geom`;
        }

        const result = await db.query(
            `
        UPDATE cong_trinh_giao_duc 
        SET
            ma_doi_tuong = $1,
            ten = $2,
            loai_hien_trang = $3,   
            so_dien_thoai = $4,
            email = $5,
            url = $6,
            so_lop = $7,
            so_hoc_sinh = $8,
            so_giao_vien = $9,
            nam_hoc = $10,
            dia_chi = $11,
            dien_tich = $12,
            updated_at = NOW(),
            geom = ${geomSQL}
        WHERE id = $13
        RETURNING *
        `,
            [
                ma_doi_tuong,
                ten,
                loai_hien_trang,
                so_dien_thoai,
                email,
                url,
                so_lop,
                so_hoc_sinh,
                so_giao_vien,
                nam_hoc,
                dia_chi,
                dien_tich,
                id,
                ...geomParams
            ]
        );
        return result.rows[0];
        
    } catch (error) {
        throw error;
    }
};
const deleteCongTrinhGiaoDuc = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM cong_trinh_giao_duc
                WHERE id = $1
                RETURNING *`, [id]
        );
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};

module.exports = {
    getCongTrinhGiaoDucPaginated,
    getCongTrinhGiaoDucById,
    createCongTrinhGiaoDuc,
    updateCongTrinhGiaoDuc,
    deleteCongTrinhGiaoDuc
};