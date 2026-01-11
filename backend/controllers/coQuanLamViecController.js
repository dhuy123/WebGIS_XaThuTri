const coQuanLamViec = require('../models/coQuanLamViecModel');

const getCoQuanLamViecPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const coQuanLamViecData = await coQuanLamViec.getCoQuanLamViecPaginated(page, limit);
        return res.status(200).json({ 
            message: 'Lấy danh sách cơ quan làm việc thành công',
            data: coQuanLamViecData });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách cơ quan làm việc:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách cơ quan làm việc: ' + error.message });
    }   
};
 
const getCoQuanLamViecById = async (req, res) => {
    try {
        const id = req.params.id;
        const coQuanLamViecData = await coQuanLamViec.getCoQuanLamViecById(id);
        if (!coQuanLamViecData) {
            return res.status(404).json({ message: 'Không tìm thấy cơ quan làm việc' });
        }
        return res.status(200).json({ 
            message: 'Lấy cơ quan làm việc thành công',
            data: coQuanLamViecData });
    } catch (error) {
        console.error('Lỗi khi lấy cơ quan làm việc:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy cơ quan làm việc: ' + error.message });
    }
};

const createCoQuanLamViec = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body for debugging
        const coQuanLamViecData = await coQuanLamViec.createCoQuanLamViec(req.body);  
        return res.status(201).json({ 
            message: 'Tạo cơ quan làm việc thành công',
            data: coQuanLamViecData 
        });
    } catch (error) {
        console.error('Lỗi khi tạo cơ quan làm việc:', error);
        return res.status(500).json({ message: 'Lỗi khi tạo cơ quan làm việc: ' + error.message });
    }
};

const updateCoQuanLamViec = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedCoQuanLamViec = await coQuanLamViec.updateCoQuanLamViec(id, data);
        if (!updatedCoQuanLamViec) {
            return res.status(404).json({ message: 'Cơ quan làm việc không tồn tại' });
        }
        return res.status(200).json({ message: 'Cập nhật cơ quan làm việc thành công', data: updatedCoQuanLamViec });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật cơ quan làm việc: ' + error.message });
    }
};
const deleteCoQuanLamViec = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCoQuanLamViec = await coQuanLamViec.deleteCoQuanLamViec(id);
        if (!deletedCoQuanLamViec) {
            return res.status(404).json({ message: 'Cơ quan làm việc không tồn tại' });
        }
        return res.status(200).json({ message: 'Xóa cơ quan làm việc thành công', data: deletedCoQuanLamViec });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa cơ quan làm việc: ' + error.message });
    }   
};


module.exports = {
    getCoQuanLamViecPaginated,
    getCoQuanLamViecById,
    createCoQuanLamViec,
    updateCoQuanLamViec,
    deleteCoQuanLamViec
};