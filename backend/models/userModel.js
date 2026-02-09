const { db } = require('../config/database');

const login = async (email) => {
    try {
        // console.log('Attempting login for email:', email);
        const result = await db.query(
            `SELECT id, email, user_name, pass_word, role, ngay_sinh, phone, gmail FROM users WHERE email = $1`,
            [email]
        );
        // console.log('Login query result:', result.rows[0]);
        return result.rows[0];
    }
    catch (error) {
        throw new Error('Lỗi khi đăng nhập người dùng: ' + error.message);
    }
}

const register = async (data ) => {
    try {
       const normalize = (str) => {
        if (str === null || str === undefined || str === '' || str === 'string') {
            return null;
        }
        return str;
       }
        const result = await db.query(
            `INSERT INTO users (email, pass_word, user_name, role, phone, ngay_sinh, gioi_tinh, gmail) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                normalize(data.email), normalize(data.pass_word), normalize(data.user_name), normalize(data.role), normalize(data.phone), normalize(data.ngay_sinh), normalize(data.gioi_tinh), normalize(data.gmail)]
        );
        return result.rows[0];
    } catch (error) {
        if (error.code === '23505') {
            // PostgreSQL duplicate key
            throw new Error('Email đã tồn tại');
        }
        throw error;
    }
}


const getAllUser = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const totalResult = await db.query(`SELECT COUNT(*) FROM users`);
        const total = parseInt(totalResult.rows[0].count);
        const result = await db.query(
            `SELECT *
             FROM users`
        );
        return {
            data: result.rows,
            total,
            page,
            limit
        };
    }
    catch (error) {
        throw new Error('Lỗi khi lấy danh sách người dùng : ' + error.message);
    }
}

const getUserById = async (id) => {
    try {
        const result = await db.query(
            `SELECT *
                FROM users WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin người dùng: ' + error.message);
    }
}


const updateUser = async (id, data) => {
    try {
        const data_old = await getUserById(id);
        if (!data_old) {
            throw new Error('Người dùng không tồn tại');
        }
        const useNewOrOld = (newVal, oldVal) => (newVal != null && newVal !== "string") ? newVal : oldVal;

        const user_name = useNewOrOld(data.user_name, data_old.user_name);
        const ngay_sinh = useNewOrOld(data.ngay_sinh, data_old.ngay_sinh);
        const email = useNewOrOld(data.email, data_old.email);
        const gioi_tinh = useNewOrOld(data.gioi_tinh, data_old.gioi_tinh);
        const phone = useNewOrOld(data.phone, data_old.phone);
        const gmail = useNewOrOld(data.gmail, data_old.gmail);
        // const thumb = useNewOrOld(data.thumb, data_old.thumb);
        const role = useNewOrOld(data.role, data_old.role);

        const result = await db.query(
            `UPDATE users 
             SET user_name = $1, email = $2, ngay_sinh = $3, gioi_tinh = $4, phone = $5, gmail = $6, role = $7, updated_at = NOW()
             WHERE id = $8
             RETURNING user_name, email, ngay_sinh, gioi_tinh, phone, gmail, role, id`,
            [user_name, email, ngay_sinh, gioi_tinh, phone, gmail, role, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi khi cập nhật thông tin người dùng: ' + error.message);
    }
}

const deleteUser = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM users WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi khi xóa người dùng: ' + error.message);
    }
}



module.exports = {
    login,
    register,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
};