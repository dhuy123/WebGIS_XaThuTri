const xepHangDiTichModel = require('../models/xepHangDiTichModel');

const getXepHangDiTichPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await xepHangDiTichModel.getXepHangDiTichPaginated(page, limit);
        res.status(200).json({ message:"Lấy danh sách loại xếp hạng di tích thành công", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getXepHangDiTichById = async (req, res) => {
    const { ma_xep_hang } = req.params;
    try {
        const data = await xepHangDiTichModel.getXepHangDiTichById(ma_xep_hang);
        if (!data) {
            return res.status(404).json({ error: 'Xếp hạng di tích không tồn tại' });
        }   
        res.status(200).json({ message:"Lấy loại xếp hạng di tích thành công", data });
    }
    catch (error) {
     console.error('Lỗi khi lấy loại xếp hạng di tích:', error);
     res.status(500).json({ message: 'Lỗi khi lấy loại xếp hạng di tích: ' + error.message });
    }
};  

const createXepHangDiTich = async (req, res) => {
    try {
        const result = await xepHangDiTichModel.createXepHangDiTich(req.body);
        return res.status(201).json({ message: "Tạo loại xếp hạng di tích thành công", data: result });
    } catch (error) {
        console.error('Lỗi khi tạo loại xếp hạng di tích:', error);
        res.status(500).json({ message: 'Lỗi khi tạo loại xếp hạng di tích: ' + error.message });
    }
};
const updateXepHangDiTich = async (req, res) => {
    const { ma_xep_hang } = req.params;
    try {
        const result = await xepHangDiTichModel.updateXepHangDiTich(ma_xep_hang, req.body);
        return res.status(200).json({ message: "Cập nhật loại xếp hạng di tích thành công", data: result });
    }
    catch (error) {
        console.error('Lỗi khi cập nhật loại xếp hạng di tích:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật loại xếp hạng di tích: ' + error.message });
    }
};

const deleteXepHangDiTich = async (req, res) => {
    const { ma_xep_hang } = req.params;
    console.log("Deleting Xep Hang Di Tich with ID:", ma_xep_hang);
    try {
        const result = await xepHangDiTichModel.deleteXepHangDiTich(ma_xep_hang);
        if (!result) {
            return res.status(404).json({ error: 'Xếp hạng di tích không tồn tại' });
        }
        res.status(200).json({ message: 'Xóa xếp hạng di tích thành công', data: result });
    }
    catch (error) {
        console.error('Lỗi khi xóa loại xếp hạng di tích:', error);
        res.status(500).json({ message: 'Lỗi khi xóa loại xếp hạng di tích: ' + error.message });
    }
};


module.exports = {
    getXepHangDiTichPaginated,
    getXepHangDiTichById,
    createXepHangDiTich,
    updateXepHangDiTich,
    deleteXepHangDiTich
   
}