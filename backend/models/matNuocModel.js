const {db} = require('../config/database');

const getMatNuocPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT mn.* , dt.ten_doi_tuong,  lttnm.ten
                FROM mat_nuoc mn
                JOIN loai_doi_tuong dt ON mn.ma_doi_tuong = dt.ma_doi_tuong AND mn.nhom_doi_tuong = dt.nhom_doi_tuong
              
                JOIN loai_trang_thai_nuoc_mat lttnm ON mn.loai_trang_thai = lttnm.ma
                LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    } 
};

const getMatNuocById = async (id) => {
    try {
        const result = await db.query(
           `SELECT mn.*, dt.ten_doi_tuong,  lttnm.ten
                FROM mat_nuoc mn
                JOIN loai_doi_tuong dt ON mn.ma_doi_tuong = dt.ma_doi_tuong AND mn.nhom_doi_tuong = dt.nhom_doi_tuong
                
                JOIN loai_trang_thai_nuoc_mat lttnm ON mn.loai_trang_thai = lttnm.ma
                WHERE mn.id = $1`, [id]
        );
        console.log('Query result:', result.rows);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}

const createMatNuoc = async (data) => {
    try {
        if (!data.geom) {
            throw new Error('Thiếu dữ liệu hình học (geom)');
        }
        const result = await db.query(
            `
            INSERT INTO mat_nuoc (
                ma_doi_tuong, nhom_doi_tuong, loai_trang_thai, geom )
                VALUES (
                $1,$2,$3,
                ST_SetSRID(ST_GeomFromGeoJSON($4), 4326)
            )
            RETURNING *
            `,
            [
                data.ma_doi_tuong,
                data.nhom_doi_tuong,
                data.loai_trang_thai,
                JSON.stringify(data.geom)
            ]
        );
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}

const updateMatNuoc = async (id, data) => {
    try {
        // Cập nhật mặt nước theo id
        const fields = [];
        const values = [];
        let index = 1;
        for (const key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                if (key === 'geom') {
                    fields.push(`geom = ST_SetSRID(ST_GeomFromGeoJSON($${index}), 4326)`);
                    values.push(JSON.stringify(data[key]));
                } else {
                    fields.push(`${key} = $${index}`);
                    values.push(data[key]);
                }
                index++;
            }
        }
        if (fields.length === 0) {
            throw new Error('Không có dữ liệu để cập nhật');
        }
        const result = await db.query(
            `
            UPDATE mat_nuoc
            SET ${fields.join(', ')}
            WHERE id = $${index}
            RETURNING *
            `,
            [...values, id]
        );
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const deleteMatNuoc = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM mat_nuoc WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};



module.exports = {
    getMatNuocPaginated,
    getMatNuocById,
    createMatNuoc,
    updateMatNuoc,
    deleteMatNuoc
};


            