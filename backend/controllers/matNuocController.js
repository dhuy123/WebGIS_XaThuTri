const matNuocModel = require('../models/matNuocModel');

const getMatNuocPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const matNuoc = await matNuocModel.getMatNuocPaginated(page, limit);
        return res.status(200).json({ 
            message: 'Lấy danh sách mặt nước thành công',
            data: matNuoc });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách mặt nước:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách mặt nước: ' + error.message });
    }
};

const getMatNuocById = async (req, res) => { 
    try {
        const id = req.params.id;
        const matNuoc = await matNuocModel.getMatNuocById(id);
        if (!matNuoc) {
            return res.status(404).json({ message: 'Không tìm thấy mặt nước' });
        }
        return res.status(200).json({
            message: 'Lấy mặt nước thành công',
            data: matNuoc });
    } catch (error) {
        console.error('Lỗi khi lấy mặt nước:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy mặt nước: ' + error.message });
    }
};

const createMatNuoc = async (req, res) => {
    try {
        const data = req.body;
        const newMatNuoc = await matNuocModel.createMatNuoc(data);
        return res.status(201).json({
            message: 'Tạo mặt nước thành công',
            data: newMatNuoc });
    }
    catch (error) {
        console.error('Lỗi khi tạo mặt nước:', error);
        return res.status(500).json({ message: 'Lỗi khi tạo mặt nước: ' + error.message });
    }
};

const updateMatNuoc = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedMatNuoc = await matNuocModel.updateMatNuoc(id, data);
        if (!updatedMatNuoc) {
            return res.status(404).json({ message: 'Không tìm thấy mặt nước để cập nhật' });
        }
        return res.status(200).json({
            message: 'Cập nhật mặt nước thành công',
            data: updatedMatNuoc });
    }
    catch (error) {
        console.error('Lỗi khi cập nhật mặt nước:', error);
        return res.status(500).json({ message: 'Lỗi khi cập nhật mặt nước: ' + error.message });
    }
};

const deleteMatNuoc = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMatNuoc = await matNuocModel.deleteMatNuoc(id);
        if (!deletedMatNuoc) {
            return res.status(404).json({ message: 'Không tìm thấy mặt nước để xóa' });
        }
        return res.status(200).json({
            message: 'Xóa mặt nước thành công',
            data: deletedMatNuoc });
    }
    catch (error) {
        console.error('Lỗi khi xóa mặt nước:', error);
        return res.status(500).json({ message: 'Lỗi khi xóa mặt nước: ' + error.message });
    }
};


module.exports = {
    getMatNuocPaginated,
    getMatNuocById,
    createMatNuoc,
    updateMatNuoc,
    deleteMatNuoc   
};