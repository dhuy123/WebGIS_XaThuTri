const minioClient = require('../config/minio');
const fileModel = require('../models/fileModel');

const uploadFileController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Không có tệp tin để tải lên' });
        }
        const file = req.file;
        const file_name = req.body.file_name || file.originalname;
        console.log('file_name:', file_name);
        const data = await fileModel.uploadFile(file, file_name);
        return res.status(201).json({ message: 'Tải lên tệp tin thành công', data });
    } catch (error) {
        console.error('Lỗi khi tải lên tệp tin:', error);
        return res.status(500).json({ message: 'Lỗi khi tải lên tệp tin: ' + error.message });
    }
};

const downloadFileController = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileStream, fileRecord } = await fileModel.downloadFile(id);
        res.setHeader('Content-Type', fileRecord.file_type);
        const encodeRFC5987ValueChars = (str) =>
            encodeURIComponent(str)
                .replace(/['()]/g, '')
                .replace(/\*/g, '%2A');

        const filename = encodeRFC5987ValueChars(fileRecord.file_name);

        res.setHeader(
            'Content-Disposition',
            `attachment; filename*=UTF-8''${filename}`
        );
        fileStream.pipe(res);
    } catch (error) {
        console.error('Lỗi khi tải xuống tệp tin:', error);
        return res.status(500).json({ message: 'Lỗi khi tải xuống tệp tin: ' + error.message });
    }
};


const getAllFiles = async (req, res) => {
    try {
        const files = await fileModel.getAllFiles();
        return res.status(200).json({ message: 'Lấy danh sách tệp tin thành công', files });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách tệp tin:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách tệp tin: ' + error.message });
    }   
};

const getFileById = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await fileModel.getFileById(id);
        return res.status(200).json({ message: 'Lấy tệp tin thành công', file });

        const fileStream = await minioClient.getObject(bucketName, objectName);
        res.setHeader('Content-Type', file.mimetype);
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${file.file_name}"`
        );
        fileStream.pipe(res);
    } catch (error) {
        console.error('Lỗi khi lấy tệp tin:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy tệp tin: ' + error.message });
    }
};

const updateFileController = async (req, res) => {
    try {
        const { id } = req.params;
        const { file_name } = req.body;
        const updatedFile = await fileModel.uploadFileModel(id, { file_name });
        return res.status(200).json({ message: 'Cập nhật tệp tin thành công', updatedFile });
    } catch (error) {
        console.error('Lỗi khi cập nhật tệp tin:', error);
        return res.status(500).json({ message: 'Lỗi khi cập nhật tệp tin: ' + error.message });
    }
};

const deleteFileController = async (req, res) => {
    try {
        const { id } = req.params;
        await fileModel.deleteFileModel(id);
        return res.status(200).json({ message: 'Xóa tệp tin thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa tệp tin:', error);
        return res.status(500).json({ message: 'Lỗi khi xóa tệp tin: ' + error.message });
    }
};


module.exports = {
    uploadFileController,
    getAllFiles,
    getFileById,
    downloadFileController,
    updateFileController,
    deleteFileController
};