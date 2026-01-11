const express = require('express');
const router = express.Router();
const loaiTrangThaiMatController = require('../controllers/loaiTrangThaiMatController');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');

router.get('/', auth,
    //checkRole(['ADMIN', 'USER']),
    loaiTrangThaiMatController.getLoaiTrangThaiMatPaginated);
router.get('/:id', auth,
    //checkRole(['ADMIN', 'USER']),
    loaiTrangThaiMatController.getLoaiTrangThaiMatById);
router.post('/', auth,
    //checkRole(['ADMIN']),
    loaiTrangThaiMatController.createLoaiTrangThaiMat);
router.put('/:id', auth,
   //checkRole(['ADMIN']),
    loaiTrangThaiMatController.updateLoaiTrangThaiMat);
router.delete('/:id', auth,
   //checkRole(['ADMIN']),
    loaiTrangThaiMatController.deleteLoaiTrangThaiMat);


module.exports = router;

/**
 * @swagger
 * tags:
 *  name: LoaiTrangThaiMat
 *  description: Quản lý loại trạng thái mặt nước
 */

/**
 * @swagger
 * /api/loaiTrangThaiMat:
 *  get:
 *    summary: Lấy danh sách loại trạng thái mặt nước có phân trang
 *    tags: [LoaiTrangThaiMat]
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
 *       description: Lấy danh sách loại hiện trạng thành công
 */

/**
 * @swagger
 * /api/loaiTrangThaiMat/{id}:
 *  get:
 *    summary: Lấy loại trạng thái mặt nước theo ID
 *    tags: [LoaiTrangThaiMat]
 *    security:
 *     - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: ID của loại hiện trạng
 *    responses:
 *     200:
 *      description: Lấy loại hiện trạng thành công
 */

/**
 * @swagger
 * /api/loaiTrangThaiMat:
 *  post:
 *    summary: Tạo loại trạng thái mặt nước mới
 *    tags: [LoaiTrangThaiMat]
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - ten
 *            properties:
 *              ten:
 *                type: string
 *                example: "Trạng thái mặt nước 1"
 *              mo_ta:
 *                type: string
 *                example: "Mô tả về trạng thái mặt nước"
 *    responses:
 *      201:
 *        description: Tạo loại trạng thái mặt nước thành công
 */

/**
 * @swagger
 * /api/loaiTrangThaiMat/{id}:
 *  put:
 *    summary: Cập nhật thông tin loại trạng thái mặt nước theo ID
 *    tags: [LoaiTrangThaiMat]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *        description: ID của loại đối tượng cần cập nhật
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               ten:
 *                 type: string
 *                 example: "Trạng thái mặt nước tốt"
 *               mo_ta:
 *                 type: string
 *                 example: "Mô tả về trạng thái mặt nước"
 *    responses:
 *      200:
 *        description: Cập nhật loại trạng thái mặt nước thành công
 */

/**
 * @swagger
 * /api/loaiTrangThaiMat/{id}:
 *  delete:
 *    summary: Xóa loại trạng thái mặt nước theo ID
 *    tags: [LoaiTrangThaiMat]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *         description: ID của loại trạng thái mặt nước cần xóa
 *    responses:
 *      200:
 *        description: Xóa loại trạng thái mặt nước thành công
 */

