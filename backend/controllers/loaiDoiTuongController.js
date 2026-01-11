const loaiDoiTuongModel = require('../models/loaiDoiTuongModel');

const getLoaiDoiTuongPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await loaiDoiTuongModel.getLoaiDoiTuongPaginated(page, limit);
        res.status(200).json({ message:"Lấy danh sách loại đối tượng thành công", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLoaiDoiTuongById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await loaiDoiTuongModel.getLoaiDoiTuongById(id);
        if (!data) {
            return res.status(404).json({ error: 'Loại đối tượng không tồn tại' });
        }   
        res.status(200).json({ message:"Lấy loại đối tượng thành công", data });
    }
    catch (error) {
     console.error('Lỗi khi lấy loại đối tượng:', error);
     res.status(500).json({ message: 'Lỗi khi lấy loại đối tượng: ' + error.message });
    }
};  

const createLoaiDoiTuong = async (req, res) => {
    try {
        const result = await loaiDoiTuongModel.createLoaiDoiTuong(req.body);
        return res.status(201).json({ message: "Tạo loại đối tượng thành công", data: result });
    } catch (error) {
        console.error('Lỗi khi tạo loại đối tượng:', error);
        res.status(500).json({ message: 'Lỗi khi tạo loại đối tượng: ' + error.message });
    }
};
const updateLoaiDoiTuong = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await loaiDoiTuongModel.updateLoaiDoiTuong(id, req.body);
        return res.status(200).json({ message: "Cập nhật loại đối tượng thành công", data: result });
    }
    catch (error) {
        console.error('Lỗi khi cập nhật loại đối tượng:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật loại đối tượng: ' + error.message });
    }
};

const deleteLoaiDoiTuong = async (req, res) => {
    const { id } = req.params;
    console.log("Deleting Loai Doi Tuong with ID:", id);
    try {
        const result = await loaiDoiTuongModel.deleteLoaiDoiTuong(id);
        if (!result) {
            return res.status(404).json({ error: 'Loại đối tượng không tồn tại' });
        }
        res.status(200).json({ message: 'Xóa loại đối tượng thành công', data: result });
    }
    catch (error) {
        console.error('Lỗi khi xóa loại đối tượng:', error);
        res.status(500).json({ message: 'Lỗi khi xóa loại đối tượng: ' + error.message });
    }
};

const searchLoaiDoiTuong = async (req, res) => {
    try {
        const {nhom_doi_tuong,ma_doi_tuong, ten_doi_tuong} = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log("Searching Loai Doi Tuong with keyword:", req.query);
        const result = await loaiDoiTuongModel.searchLoaiDoiTuong({nhom_doi_tuong, ma_doi_tuong, ten_doi_tuong}, page, limit);
        res.status(200).json({ message: 'Tìm kiếm loại đối tượng thành công', search: {nhom_doi_tuong, ma_doi_tuong, ten_doi_tuong}, data: result });  
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getLoaiDoiTuongPaginated,
    getLoaiDoiTuongById,
    createLoaiDoiTuong,
    updateLoaiDoiTuong,
    deleteLoaiDoiTuong,
    searchLoaiDoiTuong
}