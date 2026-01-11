const { db } = require('../config/database');

const getCongTrinhTonGiaoPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT tg.id, tg.ma_doi_tuong, tg.ten, tg.xep_hang_di_tich, tg.nam_xep_hang, tg.nhom_doi_tuong, tg.loai_hien_trang, tg.dien_tich, tg.dia_chi, tg.created_at, tg.updated_at,
                    dt.ten_doi_tuong AS ten_doi_tuong,
                    httg.ten_hien_trang AS ten_hien_trang
                FROM cong_trinh_ton_giao tg
                JOIN loai_doi_tuong dt ON tg.ma_doi_tuong = dt.ma_doi_tuong AND tg.nhom_doi_tuong = dt.nhom_doi_tuong
                JOIN loai_hien_trang httg ON tg.loai_hien_trang = httg.ma_hien_trang
                LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getCongTrinhTonGiaoById = async (id) => {
    try {
        const result = await db.query(
            `SELECT tg.*, dt.ten_doi_tuong AS ten_doi_tuong,
                    httg.ten_hien_trang AS ten_hien_trang
             FROM cong_trinh_ton_giao tg
             JOIN loai_doi_tuong dt ON tg.ma_doi_tuong = dt.ma_doi_tuong AND tg.nhom_doi_tuong = dt.nhom_doi_tuong
             JOIN loai_hien_trang httg ON tg.loai_hien_trang = httg.ma_hien_trang
             WHERE tg.id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

const createCongTrinhTonGiao = async (data) => {
    try {
        const {
            ma_doi_tuong,
            ten,
            xep_hang_di_tich,
            nam_xep_hang,
            nhom_doi_tuong,
            loai_hien_trang,
            dien_tich,
            dia_chi,
            geometry,
            longitude,
            latitude,
        } = data;

        let geomSQL = null;
        let geomParams = [];

        if (geometry) {
            geomSQL = `ST_SetSRID(ST_GeomFromGeoJSON($9), 4326)`;
            geomParams.push(JSON.stringify(geometry));
        }
        else if (longitude && latitude) {
            geomSQL = `ST_SetSRID(ST_MakePoint($9, $10), 4326)`;
            geomParams.push(longitude, latitude);
        }
        else {
            return res.status(400).json({
                message: 'Phải cung cấp geomtry hoặc longitude/latitude'
            });
        }


        const result = await db.query(
            `
      INSERT INTO cong_trinh_ton_giao (
        ma_doi_tuong, ten, xep_hang_di_tich, nam_xep_hang,
        nhom_doi_tuong, loai_hien_trang, dien_tich, dia_chi, geom
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,
        ${geomSQL}
      )
      RETURNING *
      `,
            [
                ma_doi_tuong,
                ten,
                xep_hang_di_tich,
                nam_xep_hang,
                nhom_doi_tuong,
                loai_hien_trang,
                dien_tich,
                dia_chi,
                ...geomParams
            ]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateCongTrinhTonGiao = async (id, data) => {
    try {
        const fields = [];
        const values = [];
        let index = 1;

        const {
            geometry,
            longitude,
            latitude,
            ...normalFields
        } = data;

        // ===== 1. Update các field thường =====
        for (const key in normalFields) {
            if (
                normalFields[key] !== undefined &&
                normalFields[key] !== null &&
                normalFields[key] !== '' &&
                normalFields[key] !== 'string'
            ) {
                fields.push(`${key} = $${index}`);
                values.push(normalFields[key]);
                index++;
            }
        }

        // ===== 2. Update geometry từ GeoJSON =====
        if (geometry) {
            fields.push(`geom = ST_SetSRID(ST_GeomFromGeoJSON($${index}), 4326)`);
            values.push(JSON.stringify(geometry));
            index++;
        }

        // ===== 3. Update geometry từ tọa độ =====
        else if (longitude && latitude) {
            fields.push(`geom = ST_SetSRID(ST_MakePoint($${index}, $${index + 1}), 4326)`);
            values.push(longitude, latitude);
            index += 2;
        }
        if (fields.length === 0) {
            throw new Error('Không có dữ liệu để cập nhật');
        }

        const result = await db.query(
            `UPDATE cong_trinh_ton_giao
             SET ${fields.join(', ')}, updated_at = NOW()
             WHERE id = $${index}
             RETURNING *`,
            [...values, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
const deleteCongTrinhTonGiao = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM cong_trinh_ton_giao
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
    getCongTrinhTonGiaoPaginated,
    getCongTrinhTonGiaoById,
    createCongTrinhTonGiao,
    updateCongTrinhTonGiao,
    deleteCongTrinhTonGiao

};