const nhaVanHoaModel = require('../models/nhaVanHoaModel');

const getNhaVanHoaPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const nhaVanHoa = await nhaVanHoaModel.getNhaVanHoaPaginated(page, limit);
        return res.status(200).json({
            message: 'Lấy danh sách nhà văn hóa thành công',
            data: nhaVanHoa
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà văn hóa:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách nhà văn hóa: ' + error.message });
    }
};

const getNhaVanHoaById = async (req, res) => {
    try {
        const id = req.params.id;
        const nhaVanHoa = await nhaVanHoaModel.getNhaVanHoaById(id);
        if (!nhaVanHoa) {
            return res.status(404).json({ message: 'Không tìm thấy nhà văn hóa' });
        }
        return res.status(200).json({
            message: 'Lấy nhà văn hóa thành công',
            data: nhaVanHoa
        });
    } catch (error) {
        console.error('Lỗi khi lấy nhà văn hóa:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy nhà văn hóa: ' + error.message });
    }
};

const createNhaVanHoa = async (req, res) => {
    try {
        // console.log('Request body:', req.body); // Log the request body for debugging
        const nhaVanHoa = await nhaVanHoaModel.createNhaVanHoa(req.body);
        return res.status(201).json({
            message: 'Tạo nhà văn hóa thành công',
            data: nhaVanHoa
        });
    } catch (error) {
        console.error('Lỗi khi tạo nhà văn hóa:', error);
        return res.status(500).json({ message: 'Lỗi khi tạo nhà văn hóa: ' + error.message });
    }
};

const updateNhaVanHoa = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log("Updating Nha Van Hoa with ID:", id, "Data:", data);
    try {
        const updatedNhaVanHoa = await nhaVanHoaModel.updateNhaVanHoa(id, data);
        if (!updatedNhaVanHoa) {
            return res.status(404).json({ message: 'Nhà văn hóa không tồn tại' });
        }
        return res.status(200).json({ message: 'Cập nhật nhà văn hóa thành công', data: updatedNhaVanHoa });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật nhà văn hóa: ' + error.message });
    }
};
const deleteNhaVanHoa = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedNhaVanHoa = await nhaVanHoaModel.deleteNhaVanHoa(id);
        if (!deletedNhaVanHoa) {
            return res.status(404).json({ message: 'Nhà văn hóa không tồn tại' });
        }
        return res.status(200).json({ message: 'Xóa nhà văn hóa thành công', data: deletedNhaVanHoa });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa nhà văn hóa: ' + error.message });
    }
};


module.exports = {
    getNhaVanHoaPaginated,
    getNhaVanHoaById,
    createNhaVanHoa,
    updateNhaVanHoa,
    deleteNhaVanHoa
};