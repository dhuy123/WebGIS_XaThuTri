const loaiTrangThaiMatModel = require('../models/loaiTrangThaiMatModel');

const getLoaiTrangThaiMatPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await loaiTrangThaiMatModel.getLoaiTrangThaiMatPaginated(page, limit);
        res.status(200).json({ message:"Lấy danh sách loại trạng thái mặt nước thành công", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLoaiTrangThaiMatById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await loaiTrangThaiMatModel.getLoaiTrangThaiMatById(id);
        if (!data) {
            return res.status(404).json({ error: 'Loại trạng thái mặt nước không tồn tại' });
        }   
        res.status(200).json({ message:"Lấy loại trạng thái mặt nước thành công", data });
    }
    catch (error) {
     console.error('Lỗi khi lấy loại trạng thái mặt nước:', error);
     res.status(500).json({ message: 'Lỗi khi lấy loại trạng thái mặt nước: ' + error.message });
    }
};  

const createLoaiTrangThaiMat = async (req, res) => {
    try {
        const result = await loaiTrangThaiMatModel.createLoaiTrangThaiMat(req.body);
        return res.status(201).json({ message: "Tạo loại trạng thái mặt nước thành công", data: result });
    } catch (error) {
        console.error('Lỗi khi tạo loại trạng thái mặt nước:', error);
        res.status(500).json({ message: 'Lỗi khi tạo loại trạng thái mặt nước: ' + error.message });
    }
};
const updateLoaiTrangThaiMat = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await loaiTrangThaiMatModel.updateLoaiTrangThaiMat(id, req.body);
        return res.status(200).json({ message: "Cập nhật loại trạng thái mặt nước thành công", data: result });
    }
    catch (error) {
        console.error('Lỗi khi cập nhật loại trạng thái mặt nước:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật loại trạng thái mặt nước: ' + error.message });
    }
};

const deleteLoaiTrangThaiMat = async (req, res) => {
    const { id } = req.params;
    console.log("Deleting Loai Trang Thai Mat with ID:", id);
    try {
        const result = await loaiTrangThaiMatModel.deleteLoaiTrangThaiMat(id);
        if (!result) {
            return res.status(404).json({ error: 'Loại trạng thái mặt nước không tồn tại' });
        }
        res.status(200).json({ message: 'Xóa loại trạng thái mặt nước thành công', data: result });
    }
    catch (error) {
        console.error('Lỗi khi xóa loại trạng thái mặt nước:', error);
        res.status(500).json({ message: 'Lỗi khi xóa loại trạng thái mặt nước: ' + error.message });
    }
};


module.exports = {
    getLoaiTrangThaiMatPaginated,
    getLoaiTrangThaiMatById,
    createLoaiTrangThaiMat,
    updateLoaiTrangThaiMat,
    deleteLoaiTrangThaiMat
   
}