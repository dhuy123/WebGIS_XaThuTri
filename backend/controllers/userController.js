const userModel = require('../models/userModel');

const getAllUser = async (req, res) => {
    try {
        const users = await userModel.getAllUser();
        return res.status(200).json({ message: 'Lấy danh sách người dùng thành công', users });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng: ' + error.message });
    }   
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        return res.status(200).json({ message: 'Lấy thông tin người dùng thành công', user });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng: ' + error.message });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    try {
        const updatedUser = await userModel.updateUser(id, data);
        return res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật thông tin người dùng: ' + error.message });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await userModel.deleteUser(id);
        return res.status(200).json({ message: 'Xóa người dùng thành công' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa người dùng: ' + error.message });
    }
};


module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
};