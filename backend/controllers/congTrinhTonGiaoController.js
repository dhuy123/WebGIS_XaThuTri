const congTrinhTonGiaoModel = require('../models/congTrinhTonGiaoModel');

const getCongTrinhTonGiaoPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const congTrinhTonGiao = await congTrinhTonGiaoModel.getCongTrinhTonGiaoPaginated(page, limit);
        return res.status(200).json({ 
            message: 'Lấy danh sách công trình tôn giáo thành công',
            data: congTrinhTonGiao });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách công trình tôn giáo:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách công trình tôn giáo: ' + error.message });
    }   
};
 
const getCongTrinhTonGiaoById = async (req, res) => {
    try {
        const id = req.params.id;
        const congTrinhTonGiao = await congTrinhTonGiaoModel.getCongTrinhTonGiaoById(id);
        if (!congTrinhTonGiao) {
            return res.status(404).json({ message: 'Không tìm thấy công trình tôn giáo' });
        }
        return res.status(200).json({ 
            message: 'Lấy công trình tôn giáo thành công',
            data: congTrinhTonGiao });
    } catch (error) {
        console.error('Lỗi khi lấy công trình tôn giáo:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy công trình tôn giáo: ' + error.message });
    }
};

const createCongTrinhTonGiao = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body for debugging
        const congTrinhTonGiao = await congTrinhTonGiaoModel.createCongTrinhTonGiao(req.body);  
        return res.status(201).json({ 
            message: 'Tạo công trình tôn giáo thành công',
            data: congTrinhTonGiao 
        });
    } catch (error) {
        console.error('Lỗi khi tạo công trình tôn giáo:', error);
        return res.status(500).json({ message: 'Lỗi khi tạo công trình tôn giáo: ' + error.message });
    }
};

const updateCongTrinhTonGiao = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedCongTrinhTonGiao = await congTrinhTonGiaoModel.updateCongTrinhTonGiao(id, data);
        if (!updatedCongTrinhTonGiao) {
            return res.status(404).json({ message: 'Công trình tôn giáo không tồn tại' });
        }
        return res.status(200).json({ message: 'Cập nhật công trình tôn giáo thành công', data: updatedCongTrinhTonGiao });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật công trình tôn giáo: ' + error.message });
    }
};
const deleteCongTrinhTonGiao = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCongTrinhTonGiao = await congTrinhTonGiaoModel.deleteCongTrinhTonGiao(id);
        if (!deletedCongTrinhTonGiao) {
            return res.status(404).json({ message: 'Công trình tôn giáo không tồn tại' });
        }
        return res.status(200).json({ message: 'Xóa công trình tôn giáo thành công', data: deletedCongTrinhTonGiao });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa công trình tôn giáo: ' + error.message });
    }   
};


module.exports = {
    getCongTrinhTonGiaoPaginated,
    getCongTrinhTonGiaoById,
    createCongTrinhTonGiao,
    updateCongTrinhTonGiao,
    deleteCongTrinhTonGiao
};