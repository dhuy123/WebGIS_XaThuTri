const { db } = require('../config/database');

const login = async (email) => {
    try {
        const result = await db.query(
            `SELECT id, email, user_name, pass_word, role FROM users WHERE email = $1`,
            [email]
        );
        // console.log('Login query result:', result.rows[0]);
        return result.rows[0];
    }
    catch (error) {
        throw new Error('Lỗi khi đăng nhập người dùng: ' + error.message);
    }
}

const register = async (email, pass_word, user_name) => {
    try {

        const result = await db.query(
            `INSERT INTO users (email, pass_word, user_name) VALUES ($1, $2, $3) RETURNING id, email`,
            [email, pass_word, user_name]
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


const getAllUser = async () => {
    try {
        const result = await db.query(
            `SELECT *
             FROM users`
        );
        return result.rows;
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
        const useNewOrOld = (newVal, oldVal) => (newVal != null && newVal !== '' && newVal !== "string") ? newVal : oldVal;

        const user_name = useNewOrOld(data.user_name, data_old.user_name);
        const ngay_sinh = useNewOrOld(data.ngay_sinh, data_old.ngay_sinh);
        const gioi_tinh = useNewOrOld(data.gioi_tinh, data_old.gioi_tinh);
        const phone = useNewOrOld(data.phone, data_old.phone);
        const gmail = useNewOrOld(data.gmail, data_old.gmail);
        const thumb = useNewOrOld(data.thumb, data_old.thumb);

        const result = await db.query(
            `UPDATE users 
             SET user_name = $1, ngay_sinh = $2, gioi_tinh = $3, phone = $4, gmail = $5, thumb = $6
             WHERE id = $7
             RETURNING *`,
            [user_name, ngay_sinh, gioi_tinh, phone, gmail, thumb, id]
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