const nhaModel = require('../models/nhaModel');

const getNhaById = async (req, res) => {
    try {
        const { id } = req.params;
        const nha = await nhaModel.getNhaById(id);
        if (!nha) {
            return res.status(404).json({ error: 'Nha not found' });
        }
          return res.status(200).json({ 
            message: 'Lấy nha thành công',
            data: nha });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getNhaById
};