const duongDiaGioiHanhChinhModel = require('../models/duongDiaGioiHanhChinhModel');

const getDuongDiaGioiHanhChinhById = async (req, res) => {
    try {
        const id = req.params.id;
        const duongDiaGioiHanhChinh = await duongDiaGioiHanhChinhModel.getDuongDiaGioiHanhChinhById(id);
        if (!duongDiaGioiHanhChinh) {
            return res.status(404).json({ message: 'Không tìm thấy đường địa giới hành chính' });
        }
        console.log('Lấy đường địa giới hành chính thành công:', duongDiaGioiHanhChinh);
        return res.status(200).json({ 
            message: 'Lấy đường địa giới hành chính thành công',
            data: duongDiaGioiHanhChinh });
    } catch (error) {
        console.error('Lỗi khi lấy đường địa giới hành chính:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy đường địa giới hành chính: ' + error.message });
    }   
};

module.exports = {
    getDuongDiaGioiHanhChinhById
};