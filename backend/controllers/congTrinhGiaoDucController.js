const congTrinhGiaoDucModel = require('../models/congTrinhGiaoDucModel');

const getCongTrinhGiaoDucPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const congTrinhGiaoDuc = await congTrinhGiaoDucModel.getCongTrinhGiaoDucPaginated(page, limit);
        return res.status(200).json({ 
            message: 'Lấy danh sách công trình giáo dục thành công',
            data: congTrinhGiaoDuc });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách công trình giáo dục:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách công trình giáo dục: ' + error.message });
    }   
};
 
const getCongTrinhGiaoDucById = async (req, res) => {
    try {
        const id = req.params.id;
        const congTrinhGiaoDuc = await congTrinhGiaoDucModel.getCongTrinhGiaoDucById(id);
        if (!congTrinhGiaoDuc) {
            return res.status(404).json({ message: 'Không tìm thấy công trình giáo dục' });
        }
        return res.status(200).json({ 
            message: 'Lấy công trình giáo dục thành công',
            data: congTrinhGiaoDuc });
    } catch (error) {
        console.error('Lỗi khi lấy công trình giáo dục:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy công trình giáo dục: ' + error.message });
    }
};

const createCongTrinhGiaoDuc = async (req, res) => {
    try {
       // console.log('Request body:', req.body); // Log the request body for debugging
        const congTrinhGiaoDuc = await congTrinhGiaoDucModel.createCongTrinhGiaoDuc(req.body);  
        return res.status(201).json({ 
            message: 'Tạo công trình giáo dục thành công',
            data: congTrinhGiaoDuc 
        });
    } catch (error) {
        console.error('Lỗi khi tạo công trình giáo dục:', error);
        return res.status(500).json({ message: 'Lỗi khi tạo công trình giáo dục: ' + error.message });
    }
};

const updateCongTrinhGiaoDuc = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log("Updating Cong Trinh Giao Duc with ID:", id, "Data:", data);
    try {
        const updatedCongTrinhGiaoDuc = await congTrinhGiaoDucModel.updateCongTrinhGiaoDuc(id, data);
        if (!updatedCongTrinhGiaoDuc) {
            return res.status(404).json({ message: 'Công trình giáo dục không tồn tại' });
        }
        return res.status(200).json({ message: 'Cập nhật công trình giáo dục thành công', data: updatedCongTrinhGiaoDuc });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật công trình giáo dục: ' + error.message });
    }
};
const deleteCongTrinhGiaoDuc = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCongTrinhGiaoDuc = await congTrinhGiaoDucModel.deleteCongTrinhGiaoDuc(id);
        if (!deletedCongTrinhGiaoDuc) {
            return res.status(404).json({ message: 'Công trình giáo dục không tồn tại' });
        }
        return res.status(200).json({ message: 'Xóa công trình giáo dục thành công', data: deletedCongTrinhGiaoDuc });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa công trình giáo dục: ' + error.message });
    }   
};


module.exports = {
    getCongTrinhGiaoDucPaginated,
     getCongTrinhGiaoDucById,
     createCongTrinhGiaoDuc,
    updateCongTrinhGiaoDuc,
    deleteCongTrinhGiaoDuc
};