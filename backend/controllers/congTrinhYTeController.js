const congTrinhYTeModel = require('../models/congTrinhYTeModel');

const getCongTrinhYTePaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await congTrinhYTeModel.getCongTrinhYTePaginated(page, limit);
        res.status(200).json({ message:"Lấy danh sách công trình y tế thành công", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCongTrinhYTeById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await congTrinhYTeModel.getCongTrinhYTeById(id);
        if (!data) {
            return res.status(404).json({ error: 'Công trình y tế không tồn tại' });
        }
        res.status(200).json({ message:"Lấy công trình y tế thành công", data });
    }
    catch (error) {
     console.error('Lỗi khi lấy công trình y tế:', error);
     res.status(500).json({ message: 'Lỗi khi lấy công trình y tế: ' + error.message });
    } 
};  

const createCongTrinhYTe = async (req, res) => {
    try {
        const result = await congTrinhYTeModel.createCongTrinhYTe(req.body);
        return res.status(201).json({ message: "Tạo công trình y tế thành công", data: result });
    } catch (error) {
        console.error('Lỗi khi tạo công trình y tế:', error);
        res.status(500).json({ message: 'Lỗi khi tạo công trình y tế: ' + error.message });
    }
};

const deleteCongTrinhYTe = async (req, res) => {
    const id = req.params.id;
    console.log("Deleting Cong Trinh Y Te with ID:", id);
    try {
        const result = await congTrinhYTeModel.deleteCongTrinhYTe(id);
        if (!result) {
            return res.status(404).json({ error: 'Công trình y tế không tồn tại' });
        }
        res.status(200).json({ message: 'Xóa công trình y tế thành công', data: result });
    } catch (error) {
        console.error('Lỗi khi xóa công trình y tế:', error);
        res.status(500).json({ message: 'Lỗi khi xóa công trình y tế: ' + error.message });
    }
};

module.exports = {
    getCongTrinhYTePaginated,
    getCongTrinhYTeById,
    createCongTrinhYTe,
    deleteCongTrinhYTe
}