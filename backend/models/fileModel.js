const { db } = require('../config/database');
const minioClient = require('../config/minio');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFile = async (file, file_name) => {
    try {
        const bucketName = process.env.BUCKET_NAME;
        // tạo tên file duy nhất
        const ext = path.extname(file.originalname);   // Lấy phần mở rộng của tệp tin (.png)
        const file_path = `upload/${uuidv4()}_${ext}`; // Tạo tên tệp tin mới với phần mở rộng ban đầu
        const objectName = file_path;
        const file_type = file.mimetype;

        //    console.log (('file_path:',file_path));
        //    console.log (('file_type:',file_type));
        //    console.log (('bucketName:',bucketName));
        //    console.log (('objectName:',objectName));
        //    console.log (('file.size:',file.size));
        //    console.log (('file.mimetype:',file.mimetype));
        //    console.log (('file.originalname:',file.originalname));
        //    console.log (('file.buffer:',file.buffer.length));
        //    console.log (('ext:',ext));


        // Lưu tệp tin vào MinIO
        await minioClient.putObject(bucketName, objectName, file.buffer, file.size, {
            'Content-Type': file.mimetype
        });

        // Lưu thông tin tệp tin vào cơ sở dữ liệu
        if (file_name == null || file_name === '' || file_name === 'string') {
            file_name = file.originalname;
        }

        if (file_name.length > 255) {
            throw new Error('Tên file quá dài');
        }
        const result = await db.query('INSERT INTO files (file_name,file_path, file_type ) VALUES ($1, $2, $3) RETURNING *',
            [file_name, file_path, file_type]);
        //const fileUrl = `${process.env.END_POINT}:${process.env.PORT_POINT}/${bucketName}/${objectName}`;
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi khi upload file');
    }
};

const getAllFiles = async () => {
    try {
        const result = await db.query('SELECT * FROM files ORDER BY created_at DESC');
        return result.rows;
    }
    catch (error) {
        throw new Error('Lỗi khi lấy danh sách tệp tin: ' + error.message);
    }
}

const getFileById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM files WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Tệp tin không tồn tại');
        }
        return result.rows[0];

    } catch (error) {
        throw new Error('Lỗi khi lấy tệp tin: ' + error.message);
    }
};

const downloadFile = async (id) => {
    try {
        const result = await db.query('SELECT * FROM files WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Tệp tin không tồn tại');
        }
        const fileRecord = result.rows[0];
        const bucketName = process.env.BUCKET_NAME;
        const objectName = fileRecord.file_path;
        const fileStream = await minioClient.getObject(bucketName, objectName);
        return { fileStream, fileRecord };
    } catch (error) {
        throw new Error('Lỗi khi tải tệp tin: ' + error.message);
    }
};

const uploadFileModel = async (id, data) => {
    try {
        const file = await getFileById(id);
        if(!file){
            throw new Error('Tệp tin không tồn tại');
        }

        if (data.file_name == null || data.file_name === '' || data.file_name === 'string') {
            data.file_name = file.file_name;
        }
        const result = await db.query('UPDATE files SET file_name = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [data.file_name, id]);
        return result.rows[0];
       
    }
    catch (error) {
        throw new Error('Lỗi khi cập nhật tệp tin: ' + error.message);
    }
};

const deleteFileModel = async (id) => {
    try {
        const result = await db.query('DELETE FROM files WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
    catch (error) {
        throw new Error('Lỗi khi xóa tệp tin: ' + error.message);
    }
};


module.exports = {
    uploadFile,
    getAllFiles,
    getFileById,
    downloadFile,
    uploadFileModel,
    deleteFileModel
};
