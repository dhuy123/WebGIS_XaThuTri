const duongBoModel = require('../models/duongBoModel');

const getDuongBoPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const duongBo = await duongBoModel.getDuongBoPaginated(page, limit);
        return res.status(200).json({ 
            message: 'Lấy danh sách đường bộ thành công',
            data: duongBo });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đường bộ:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách đường bộ: ' + error.message });
    }
};

const getDuongBoById = async (req, res) => {
    try {
        const id = req.params.id;
        const duongBo = await duongBoModel.getDuongBoById(id);
        if (!duongBo) {
            return res.status(404).json({ message: 'Không tìm thấy đường bộ' });
        }
        return res.status(200).json({ 
            message: 'Lấy đường bộ thành công',
            data: duongBo });
    } catch (error) {
        console.error('Lỗi khi lấy đường bộ:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy đường bộ: ' + error.message });
    }
};

const createDuongBo = async (req, res) => {
    try {
        const data = req.body;
        const newDuongBo = await duongBoModel.createDuongBo(data);
        return res.status(201).json({ 
            message: 'Tạo đường bộ thành công',
            data: newDuongBo });
    }
    catch (error) {
        console.error('Lỗi khi tạo đường bộ:', error);
        return res.status(500).json({ message: 'Lỗi khi tạo đường bộ: ' + error.message });
    }
};

module.exports = {
    getDuongBoPaginated,
    getDuongBoById,
    createDuongBo
};