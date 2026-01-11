const {db}= require('../config/database');

const getLoaiDoiTuongPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT * FROM loai_doi_tuong
             LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getLoaiDoiTuongById = async (id) => {
    try {
        const result = await db.query(
            `SELECT * FROM loai_doi_tuong WHERE id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createLoaiDoiTuong = async (data) => {
    try {
        const { ma_doi_tuong, ten_doi_tuong, nhom_doi_tuong } = data;
      
        const result = await db.query(
            `INSERT INTO loai_doi_tuong (ma_doi_tuong, ten_doi_tuong, nhom_doi_tuong)
             VALUES ($1, $2, $3) RETURNING *`,
            [ma_doi_tuong, ten_doi_tuong, nhom_doi_tuong]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateLoaiDoiTuong = async (id, data) => {
    try {
        const data_old = await getLoaiDoiTuongById(id);
        if (!data_old) {
            throw new Error('Loại đối tượng không tồn tại');
        }
        const { ma_doi_tuong, ten_doi_tuong, nhom_doi_tuong } = { ...data_old, ...data };
        const result = await db.query(
            `UPDATE loai_doi_tuong 
             SET ma_doi_tuong = $1, ten_doi_tuong = $2, nhom_doi_tuong = $3
                WHERE id = $4
                RETURNING *`,
            [ma_doi_tuong, ten_doi_tuong, nhom_doi_tuong, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteLoaiDoiTuong = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM loai_doi_tuong WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};

const searchLoaiDoiTuong = async (data, page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const {nhom_doi_tuong,ma_doi_tuong, ten_doi_tuong} = data;

        let conditions = [];
        let values = [];
        let index = 1;

        if (nhom_doi_tuong) {
            conditions.push(`nhom_doi_tuong = $${index++}`);
            values.push(nhom_doi_tuong);
        }
        if (ma_doi_tuong) {
            conditions.push(`ma_doi_tuong = $${index++}`);
            values.push(ma_doi_tuong);
        }
        if (ten_doi_tuong) {
            conditions.push(`ten_doi_tuong = $${index++}`);
            values.push(ten_doi_tuong);
        }



        console.log("Search conditions:", conditions);
        console.log("Search values:", values);
       
       let query = 'SELECT * FROM loai_doi_tuong';
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Thêm pagination
        query += ` LIMIT $${index++} OFFSET $${index++}`;
        values.push(limit, offset);

        console.log('Final query:', query);
        console.log('Values:', values);

        const result = await db.query(query, values);
        return result.rows;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getLoaiDoiTuongPaginated,
    getLoaiDoiTuongById,
    createLoaiDoiTuong,
    updateLoaiDoiTuong,
    deleteLoaiDoiTuong,
    searchLoaiDoiTuong
}