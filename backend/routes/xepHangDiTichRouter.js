const express = require('express');
const router = express.Router();
const xepHangDiTichController = require('../controllers/xepHangDiTichController');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');

router.get('/', auth,
    //checkRole(['ADMIN', 'USER']),
    xepHangDiTichController.getXepHangDiTichPaginated);
router.get('/:ma_xep_hang', auth,
    //checkRole(['ADMIN', 'USER']),
    xepHangDiTichController.getXepHangDiTichById);
router.post('/', auth,
    //checkRole(['ADMIN']),
    xepHangDiTichController.createXepHangDiTich);
router.put('/:ma_xep_hang', auth,
   //checkRole(['ADMIN']),
    xepHangDiTichController.updateXepHangDiTich);
router.delete('/:ma_xep_hang', auth,
   //checkRole(['ADMIN']),
    xepHangDiTichController.deleteXepHangDiTich);


module.exports = router;

/**
 * @swagger
 * tags:
 *  name: XepHangDiTich
 *  description: Quản lý loại xếp hạng di tích
 */

/**
 * @swagger
 * /api/xepHangDiTich:
 *  get:
 *    summary: Lấy danh sách loại xếp hạng di tích có phân trang
 *    tags: [XepHangDiTich]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *          description: Số trang (mặc định là 1)
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *          description: Số mục trên mỗi trang (mặc định là 10)
 *    responses:
 *      200:
 *       description: Lấy danh sách loại xếp hạng di tích thành công
 */

/**
 * @swagger
 * /api/xepHangDiTich/{ma_xep_hang}:
 *  get:
 *    summary: Lấy loại xếp hạng di tích theo ID
 *    tags: [XepHangDiTich]
 *    security:
 *     - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: ma_xep_hang
 *        required: true
 *        schema:
 *          type: integer
 *          description: ID của loại xếp hạng di tích
 *    responses:
 *     200:
 *      description: Lấy loại xếp hạng di tích thành công
 */

/**
 * @swagger
 * /api/xepHangDiTich:
 *  post:
 *    summary: Tạo loại xếp hạng di tích mới
 *    tags: [XepHangDiTich]
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - ten_xep_hang
 *            properties:
 *              ten_xep_hang:
 *                type: string
 *                example: "Xếp hạng di tích 1"
 *              mo_ta:
 *                type: string
 *                example: "Mô tả về xếp hạng di tích"
 *    responses:
 *      201:
 *        description: Tạo loại xếp hạng di tích thành công
 */

/**
 * @swagger
 * /api/xepHangDiTich/{ma_xep_hang}:
 *  put:
 *    summary: Cập nhật thông tin loại xếp hạng di tích theo ID
 *    tags: [XepHangDiTich]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *        description: ID của loại xếp hạng di tích cần cập nhật
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               ten_xep_hang:
 *                 type: string
 *                 example: "Xếp hạng di tích tốt"
 *               mo_ta:
 *                 type: string
 *                 example: "Mô tả về xếp hạng di tích cập nhật"
 *    responses:
 *      200:
 *        description: Cập nhật loại xếp hạng di tích thành công
 */

/**
 * @swagger
 * /api/xepHangDiTich/{ma_xep_hang}:
 *  delete:
 *    summary: Xóa loại xếp hạng di tích theo ID
 *    tags: [XepHangDiTich]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: ma_xep_hang
 *        required: true
 *        schema:
 *         type: integer
 *         description: ID của loại xếp hạng di tích cần xóa
 *    responses:
 *      200:
 *        description: Xóa loại xếp hạng di tích thành công
 */

