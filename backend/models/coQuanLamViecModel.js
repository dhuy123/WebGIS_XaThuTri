const { db } = require('../config/database');

const getCoQuanLamViecPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT lv.*,
                    dt.ten_doi_tuong AS ten_doi_tuong,
                    httg.ten_hien_trang AS ten_hien_trang
                FROM tru_so_co_quan_nha_nuoc lv
                JOIN loai_doi_tuong dt ON lv.ma_doi_tuong = dt.ma_doi_tuong AND lv.nhom_doi_tuong = dt.nhom_doi_tuong
                JOIN loai_hien_trang httg ON lv.loai_hien_trang = httg.ma_hien_trang
                LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getCoQuanLamViecById = async (id) => {
    try {
        const result = await db.query(
            `SELECT lv.*, dt.ten_doi_tuong AS ten_doi_tuong,
                    httg.ten_hien_trang AS ten_hien_trang
             FROM tru_so_co_quan_nha_nuoc lv
             JOIN loai_doi_tuong dt ON lv.ma_doi_tuong = dt.ma_doi_tuong AND lv.nhom_doi_tuong = dt.nhom_doi_tuong
             JOIN loai_hien_trang httg ON lv.loai_hien_trang = httg.ma_hien_trang
             WHERE lv.id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

const createCoQuanLamViec = async (data) => {
    try {
        const {
            ma_doi_tuong,
            ten,
            loai_hien_trang,
            dien_tich_m2,
            geom,
            longitude,
            latitude,
        } = data;

        let geomSQL = null;
        let geomParams = [];

        if (geom) {
            geomSQL = `ST_SetSRID(ST_GeomFromGeoJSON($9), 4326)`;
            geomParams.push(JSON.stringify(geom));
        }
        else if (longitude && latitude) {
            geomSQL = `ST_SetSRID(ST_MakePoint($9, $10), 4326)`;
            geomParams.push(longitude, latitude);
        }
        else {
            geomSQL = 'NULL';
        }


        const result = await db.query(
            `
      INSERT INTO tru_so_co_quan_nha_nuoc (
        ma_doi_tuong, ten, loai_hien_trang, dien_tich_m2, geom
      )
      VALUES (
        $1,$2,$3,$4,
        ${geomSQL}
      )
      RETURNING *
      `,
            [
                ma_doi_tuong,
                ten,
                loai_hien_trang,
                dien_tich_m2,
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

        if (geometry) {
            fields.push(`geom = ST_SetSRID(ST_GeomFromGeoJSON($${index}), 4326)`);
            values.push(JSON.stringify(geometry));
            index++;
        }

    
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
const deleteCoQuanLamViec = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM tru_so_co_quan_nha_nuoc
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
    getCoQuanLamViecPaginated,
    getCoQuanLamViecById,
    createCoQuanLamViec,
    // updateCoQuanLamViec,
    deleteCoQuanLamViec
};