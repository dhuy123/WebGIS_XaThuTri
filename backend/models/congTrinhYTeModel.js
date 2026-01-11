const {db} = require('../config/database');

const getCongTrinhYTePaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const result = await db.query(
            `SELECT ctyt.* , dt.ten_doi_tuong, lht.ten_hien_trang
                FROM cong_trinh_y_te ctyt
                JOIN loai_doi_tuong dt ON ctyt.ma_doi_tuong = dt.ma_doi_tuong AND ctyt.nhom_doi_tuong = dt.nhom_doi_tuong
                JOIN loai_hien_trang lht ON ctyt.loai_hien_trang = lht.ma_hien_trang
                LIMIT $1 OFFSET $2`, [limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getCongTrinhYTeById = async (id) => {
    try {
        const result = await db.query(
              `SELECT ctyt.* , dt.ten_doi_tuong, lht.ten_hien_trang
                FROM cong_trinh_y_te ctyt
                JOIN loai_doi_tuong dt ON ctyt.ma_doi_tuong = dt.ma_doi_tuong AND ctyt.nhom_doi_tuong = dt.nhom_doi_tuong
                JOIN loai_hien_trang lht ON ctyt.loai_hien_trang = lht.ma_hien_trang
                WHERE ctyt.id = $1`, [id]
        );
        console.log('Query result:', result.rows);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}

const createCongTrinhYTe = async (data) => {
    try {
       const { ma_doi_tuong,
            ten,
            loai_hien_trang,
            cap_y_te,
            so_giuong,
            so_bac_sy,
            so_y_ta,
            so_dien_thoai,
            dien_tich,
            dia_chi,
            geom, 
            long, 
            lat } = data;

            console.log('Received data for creating CongTrinhYTe:', data.geom);

            let geomSQL = null;
            let geomParams = [];
              console.log('Received data for creating CongTrinhYTe:', geomParams);

            if (geom) {
                geomSQL = `ST_SetSRID(ST_GeomFromGeoJSON($11 ), 4326)`;
                geomParams.push(JSON.stringify(geom));
            } else if (long && lat) {
                geomSQL = `ST_SetSRID(ST_MakePoint($11, $12), 4326)`;
                geomParams.push(long, lat);
            } else {
                throw new Error('Thiếu dữ liệu tọa độ cho công trình y tế');
            }
        const result = await db.query(
            `
            INSERT INTO cong_trinh_y_te (
                ma_doi_tuong, ten, loai_hien_trang, cap_y_te, so_giuong, 
                so_bac_sy, so_y_ta, so_dien_thoai, dien_tich, dia_chi,
                geom )  
                VALUES (
                $1,$2,$3,$4,$5,$6,
                $7,$8,$9,$10,
               ${geomSQL}
            )
            RETURNING *
            `,
            [
                ma_doi_tuong,
                ten,
                loai_hien_trang,
                cap_y_te,
                so_giuong,
                so_bac_sy,
                so_y_ta,
                so_dien_thoai,
                dien_tich,
                dia_chi,
                ...geomParams
            ]
        );
        return result.rows[0];
    }   catch (error) {
        throw error;
    }
}

// const upadateCongTrinhYTe = async (id, data) => {
//     try{
//         const data_old = await getCongTrinhYTeById(id);
//         if (!data_old) {
//             throw new Error('Công trình y tế không tồn tại');
//         }
//         const useNewOrOld = (newVal, oldVal) => (newVal != null && newVal !== '' && newVal !== "string") ? newVal : oldVal;

//         const ma_doi_tuong = useNewOrOld(data.ma_doi_tuong, data_old.ma_doi_tuong);
//         const ten = useNewOrOld(data.ten, data_old.ten);
//         const loai_hien_trang = useNewOrOld(data.loai_hien_trang, data_old.loai_hien_trang);
//         const cap_y_te = useNewOrOld(data.cap_y_te, data_old.cap_y_te);
//         const so_giuong = useNewOrOld(data.so_giuong, data_old.so_giuong);
//         const so_bac_sy = useNewOrOld(data.so_bac_sy, data_old.so_bac_sy);
//         const so_y_ta = useNewOrOld(data.so_y_ta, data_old.so_y_ta);
//         const so_dien_thoai = useNewOrOld(data.so_dien_thoai, data_old.so_dien_thoai);
//         const dien_tich = useNewOrOld(data.dien_tich, data_old.dien_tich);
//         const dia_chi = useNewOrOld(data.dia_chi, data_old.dia_chi);

//         const result = await db.query(
//             `UPDATE cong_trinh_y_te 
//              SET ma_doi_tuong = $1, ten = $2, loai_hien_trang = $3, cap_y_te = $4, so_giuong = $5, so_bac_sy = $6, so_y_ta = $7, so_dien_thoai = $8, dien_tich = $9, dia_chi = $10
//              WHERE id = $11
//              RETURNING *`,

//     }

//             [ma_doi_tuong, ten, loai_hien_trang, cap_y_te, so_giuong, so_bac_sy, so_y_ta, so_dien_thoai, dien_tich, dia_chi, id]
//         );
//         return result.rows[0];
//     } catch (error) {
//         throw new Error('Lỗi khi cập nhật công trình y tế: ' + error.message);
//     }
// }

const deleteCongTrinhYTe = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM cong_trinh_y_te WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi khi xóa công trình y tế: ' + error.message);
    }   
};






module.exports = {
    getCongTrinhYTePaginated,
    getCongTrinhYTeById,
    createCongTrinhYTe,
    deleteCongTrinhYTe
};