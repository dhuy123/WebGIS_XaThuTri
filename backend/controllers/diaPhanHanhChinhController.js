const diaPhanHanhChinhModel = require('../models/DiaPhanHanhChinhModel');

const getDiaPhanHanhChinhById = async (req, res) => {
    try {
        const id = req.params.id;
        const diaPhanHanhChinh = await diaPhanHanhChinhModel.getDiaPhanHanhChinhById(id);
        if (!diaPhanHanhChinh) {
            return res.status(404).json({ message: 'Không tìm thấy địa phận hành chính' });
        }
        console.log('Lấy địa phận hành chính thành công:', diaPhanHanhChinh);
        return res.status(200).json({ 
            message: 'Lấy địa phận hành chính thành công',
            data: diaPhanHanhChinh });
    } catch (error) {
        console.error('Lỗi khi lấy địa phận hành chính:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy địa phận hành chính: ' + error.message });
    }   
};

module.exports = {
    getDiaPhanHanhChinhById
};