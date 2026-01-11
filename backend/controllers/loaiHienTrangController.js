const loaiHienTrangModel = require('../models/loaiHienTrangModel');

const getLoaiHienTrangPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await loaiHienTrangModel.getLoaiHienTrangPaginated(page, limit);
        res.status(200).json({ message:"Lấy danh sách loại hiện trạng thành công", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLoaiHienTrangById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await loaiHienTrangModel.getLoaiHienTrangById(id);
        if (!data) {
            return res.status(404).json({ error: 'Loại hiện trạng không tồn tại' });
        }   
        res.status(200).json({ message:"Lấy loại hiện trạng thành công", data });
    }
    catch (error) {
     console.error('Lỗi khi lấy loại hiện trạng:', error);
     res.status(500).json({ message: 'Lỗi khi lấy loại hiện trạng: ' + error.message });
    }
};  

const createLoaiHienTrang = async (req, res) => {
    try {
        const result = await loaiHienTrangModel.createLoaiHienTrang(req.body);
        return res.status(201).json({ message: "Tạo loại hiện trạng thành công", data: result });
    } catch (error) {
        console.error('Lỗi khi tạo loại hiện trạng:', error);
        res.status(500).json({ message: 'Lỗi khi tạo loại hiện trạng: ' + error.message });
    }
};
const updateLoaiHienTrang = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await loaiHienTrangModel.updateLoaiHienTrang(id, req.body);
        return res.status(200).json({ message: "Cập nhật loại hiện trạng thành công", data: result });
    }
    catch (error) {
        console.error('Lỗi khi cập nhật loại hiện trạng:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật loại hiện trạng: ' + error.message });
    }
};

const deleteLoaiHienTrang = async (req, res) => {
    const { id } = req.params;
    console.log("Deleting Loai Hien Trang with ID:", id);
    try {
        const result = await loaiHienTrangModel.deleteLoaiHienTrang(id);
        if (!result) {
            return res.status(404).json({ error: 'Loại hiện trạng không tồn tại' });
        }
        res.status(200).json({ message: 'Xóa loại hiện trạng thành công', data: result });
    }
    catch (error) {
        console.error('Lỗi khi xóa loại hiện trạng:', error);
        res.status(500).json({ message: 'Lỗi khi xóa loại hiện trạng: ' + error.message });
    }
};

// const searchLoaiDoiTuong = async (req, res) => {
//     try {
//         const {nhom_doi_tuong,ma_doi_tuong, ten_doi_tuong} = req.query;
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         console.log("Searching Loai Doi Tuong with keyword:", req.query);
//         const result = await loaiDoiTuongModel.searchLoaiDoiTuong({nhom_doi_tuong, ma_doi_tuong, ten_doi_tuong}, page, limit);
//         res.status(200).json({ message: 'Tìm kiếm loại đối tượng thành công', data: result });  
//     } catch (error) {
//         throw error;
//     }
// };


module.exports = {
    getLoaiHienTrangPaginated,
    getLoaiHienTrangById,
    createLoaiHienTrang,
    updateLoaiHienTrang,
    deleteLoaiHienTrang,
    // searchLoaiHienTrang
}