const express = require('express');
const router = express.Router();
const loaiHienTrangController = require('../controllers/loaiHienTrangController');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');

router.get('/', auth,
    //checkRole(['ADMIN', 'USER']),
    loaiHienTrangController.getLoaiHienTrangPaginated);
router.get('/:id', auth,
    //checkRole(['ADMIN', 'USER']),
    loaiHienTrangController.getLoaiHienTrangById);
router.post('/', auth,
    //checkRole(['ADMIN']),
    loaiHienTrangController.createLoaiHienTrang);
router.put('/:id', auth,
   //checkRole(['ADMIN']),
    loaiHienTrangController.updateLoaiHienTrang);
router.delete('/:id', auth,
   //checkRole(['ADMIN']),
    loaiHienTrangController.deleteLoaiHienTrang);


module.exports = router;

/**
 * @swagger
 * tags:
 *  name: LoaiHienTrang
 *  description: Quản lý loại hiện trạng
 */

/**
 * @swagger
 * /api/loaiHienTrang:
 *  get:
 *    summary: Lấy danh sách loại hiện trạng có phân trang
 *    tags: [LoaiHienTrang]
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
 * /api/loaiHienTrang/{id}:
 *  get:
 *    summary: Lấy loại hiện trạng theo ID
 *    tags: [LoaiHienTrang]
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
 * /api/loaiHienTrang:
 *  post:
 *    summary: Tạo loại hiện trạng mới
 *    tags: [LoaiHienTrang]
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - ma_hien_trang
 *            properties:
 *              ma_hien_trang:
 *                type: string
 *                example: "LHT001"
 *              ten_hien_trang:
 *                type: string
 *                example: "Hiện trạng tốt"
 *              mo_ta:
 *                type: string
 *                example: "Mô tả về hiện trạng"
 *    responses:
 *      201:
 *        description: Tạo loại hiện trạng thành công
 */

/**
 * @swagger
 * /api/loaiHienTrang/{id}:
 *  put:
 *    summary: Cập nhật thông tin loại hiện trạng theo ID
 *    tags: [LoaiHienTrang]
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
 *               ma_hien_trang:
 *                 type: string
 *                 example: "LHT001"
 *               ten_hien_trang:
 *                 type: string
 *                 example: "Hiện trạng tốt"
 *               mo_ta:
 *                 type: string
 *                 example: "Mô tả về hiện trạng"
 *    responses:
 *      200:
 *        description: Cập nhật loại hiện trạng thành công
 */

/**
 * @swagger
 * /api/loaiHienTrang/{id}:
 *  delete:
 *    summary: Xóa loại hiện trạng theo ID
 *    tags: [LoaiHienTrang]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *         description: ID của loại đối tượng cần xóa
 *    responses:
 *      200:
 *        description: Xóa loại đối tượng thành công
 */

