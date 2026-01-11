const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');

router.post('/upload', auth,
    checkRole(['ADMIN']),
    upload.single('file'),
    fileController.uploadFileController);

router.get('/download/:id', auth,
    checkRole(['ADMIN', 'EMPLOYEE']),
    fileController.downloadFileController);

router.get('/', auth,
    //checkRole(['ADMIN']),
    fileController.getAllFiles);
 
router.get('/:id', auth,
    // checkRole(['ADMIN']),
    fileController.getFileById);

router.put('/:id', auth,
     checkRole(['ADMIN']),
    fileController.updateFileController);
router.delete('/:id', auth,
     checkRole(['ADMIN']),
    fileController.deleteFileController);

/**
 * @swagger
 * tags:
 *   - name: Files
 *     description: Quản lý tệp tin
 */

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Tải lên tệp tin
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               file_name:
 *                 type: string
 *                 description: Tên tệp tin tùy chọn
 *     responses:
 *       201:
 *         description: Tải lên tệp tin thành công
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền
 */

/**
 * @swagger
 * /api/files/download/{id}:
 *   get:
 *     summary: Tải xuống tệp tin theo ID
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của tệp tin cần tải xuống
 *     responses:
 *       200:
 *         description: Tải xuống tệp tin thành công
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền
 */

/**
 * @swagger
 * /api/files:
 *   get:
 *    summary: Lấy danh sách tệp tin
 *    tags: [Files]
 *    security:
 *      - BearerAuth: []    
 *    responses:
 *     200:
 *      description: Lấy danh sách tệp tin thành công
 */

/**
 * @swagger
 * /api/files/{id}:
 *   get:
 *    summary: Lấy danh sách tệp tin
 *    tags: [Files]
 *    security:
 *      - BearerAuth: []    
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID của tệp tin cần lấy
 *    responses:
 *     200:
 *      description: Lấy tệp tin thành công
 */

/**
 * @swagger
 * /api/files/{id}:
 *   put:
 *    summary: Cập nhật tệp tin theo ID
 *    tags: [Files]
 *    security:
 *      - BearerAuth: []    
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID của tệp tin cần cập nhật
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              file_name:
 *                type: string
 *                description: Tên tệp tin mới
 *    responses:
 *     200:
 *      description: Cập nhật tệp tin thành công
 *     401:
 *      description: Chưa đăng nhập
 *     403:
 *      description: Không có quyền
 */

/**
 * @swagger
 * /api/files/{id}:
 *   delete:
 *    summary: Xóa tệp tin theo ID
 *    tags: [Files]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID của tệp tin cần xóa
 *    responses:
 *      200:
 *        description: Xóa tệp tin thành công
 */


module.exports = router;

