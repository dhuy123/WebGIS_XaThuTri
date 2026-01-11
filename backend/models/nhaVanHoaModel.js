const { db } = require('../config/database');

const getNhaVanHoaPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT vh.*,
                    httg.ten_hien_trang AS ten_hien_trang
                FROM nha_van_hoa vh
                JOIN loai_hien_trang httg ON vh.loai_hien_trang = httg.ma_hien_trang
                LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getNhaVanHoaById = async (id) => {
    try {
        const result = await db.query(
            `SELECT vh.*, 
                    httg.ten_hien_trang AS ten_hien_trang
             FROM nha_van_hoa vh
             JOIN loai_hien_trang httg ON vh.loai_hien_trang = httg.ma_hien_trang
             WHERE vh.id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

const createNhaVanHoa = async (data) => {
    try {
        const {
            ma_doi_tuong,
            danh_tu_chung,
            ten,
            loai_hien_trang,
            dia_chi,
            geom,
            longitude,
            latitude,
        } = data;



        let geomSQL = null;
        let geomParams = [];

        if (geom) {
            geomSQL = `ST_SetSRID(ST_GeomFromGeoJSON($6), 4326)`;
            geomParams.push(JSON.stringify(geom));
        }
        else if (longitude && latitude) {
            geomSQL = `ST_SetSRID(ST_MakePoint($7, $8), 4326)`;
            geomParams.push(longitude, latitude);
        }
        else {
            throw new Error('Dữ liệu hình học không hợp lệ');
        }
        console.log(geomSQL, geomParams);


        const result = await db.query(
            `
      INSERT INTO nha_van_hoa (
        ma_doi_tuong, danh_tu_chung, ten , loai_hien_trang,
            dia_chi,
        geom
      )
      VALUES (
        $1, $2, $3, $4, $5,
        ${geomSQL}
      )
      RETURNING *
      `,
            [
                ma_doi_tuong,
                danh_tu_chung,
                ten,
                loai_hien_trang,
                dia_chi,
                ...geomParams
            ]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateNhaVanHoa = async (id, data) => {
    try {
        const data_old = await getNhaVanHoaById(id);
        if (!data_old) {
            throw new Error('Nhà văn hóa không tồn tại');
        }
        const {
            ma_doi_tuong,
            ten,
            loai_hien_trang,
            danh_tu_chung,
            dia_chi,
            geom,
            longitude,
            latitude,
        } = { ...data_old, ...data };

        let geomSQL = null;
        let geomParams = [];
        if (geom) {
            geomSQL = `ST_SetSRID(ST_GeomFromGeoJSON($7), 4326)`;
            geomParams.push(JSON.stringify(geom));
        }
        else if (longitude && latitude) {
            geomSQL = `ST_SetSRID(ST_MakePoint($8, $9), 4326)`;
            geomParams.push(longitude, latitude);
        } else {
            geomSQL = `geom`;
        }

        const result = await db.query(
            `
        UPDATE nha_van_hoa 
        SET
            ma_doi_tuong = $1,
            ten = $2,
            loai_hien_trang = $3,   
            danh_tu_chung = $4,
            dia_chi = $5,
            geom = ${geomSQL},
            updated_at = NOW()
        WHERE id = $6
        RETURNING *
        `,
            [
                ma_doi_tuong,
                ten,
                loai_hien_trang,
                danh_tu_chung,
                dia_chi,
                id,
                ...geomParams
            ]
        );
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};
const deleteNhaVanHoa = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM nha_van_hoa
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
    getNhaVanHoaPaginated,
    getNhaVanHoaById,
    createNhaVanHoa,
    updateNhaVanHoa,
    deleteNhaVanHoa
};