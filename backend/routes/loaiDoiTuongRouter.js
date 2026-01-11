const express = require('express');
const router = express.Router();
const loaiDoiTuongController = require('../controllers/loaiDoiTuongController');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');

router.get('/', auth,
    //checkRole(['ADMIN', 'USER']),
    loaiDoiTuongController.getLoaiDoiTuongPaginated);
router.get('/search', auth,
    //checkRole(['ADMIN', 'USER']),
    loaiDoiTuongController.searchLoaiDoiTuong);
router.get('/:id', auth,
    //checkRole(['ADMIN', 'USER']),
    loaiDoiTuongController.getLoaiDoiTuongById);

router.post('/', auth,
    //checkRole(['ADMIN']),
    loaiDoiTuongController.createLoaiDoiTuong);
router.put('/:id', auth,
   //checkRole(['ADMIN']),
    loaiDoiTuongController.updateLoaiDoiTuong);
router.delete('/:id', auth,
   //checkRole(['ADMIN']),
    loaiDoiTuongController.deleteLoaiDoiTuong);


module.exports = router;

/**
 * @swagger
 * tags:
 *  name: LoaiDoiTuong
 *  description: Quản lý loại đối tượng
 */

/**
 * @swagger
 * /api/loaiDoiTuong:
 *  get:
 *    summary: Lấy danh sách loại đối tượng có phân trang
 *    tags: [LoaiDoiTuong]
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
 *        description: Lấy danh sách loại đối tượng thành công
 */
 
/**
 * @swagger
 * /api/loaiDoiTuong/{id}:
 *  get:
 *   summary: Lấy thông tin loại đối tượng theo ID
 *   tags: [LoaiDoiTuong]
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID của loại đối tượng
 *   responses:
 *     200:
 *       description: Lấy loại đối tượng thành công
 */

/**
 * @swagger
 * /api/loaiDoiTuong:
 *  post:
 *    summary: Tạo loại đối tượng mới
 *    tags: [LoaiDoiTuong]
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - ma_doi_tuong
 *              - nhom_doi_tuong
 *              - ten_doi_tuong
 *            properties:
 *              ma_doi_tuong:
 *                type: string
 *                example: "LDT001"
 *              nhom_doi_tuong:
 *                type: string
 *                example: "Nhom 1"
 *              ten_doi_tuong:
 *                type: string
 *                example: "Đối tượng ưu tiên 1"
 *    responses:
 *      201:
 *        description: Tạo loại đối tượng thành công
 */

/**
 * @swagger
 * /api/loaiDoiTuong/{id}:
 *  put:
 *    summary: Cập nhật thông tin loại đối tượng theo ID
 *    tags: [LoaiDoiTuong]
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
 *               ma_doi_tuong:
 *                 type: string
 *                 example: "LDT001"
 *               nhom_doi_tuong:
 *                 type: string
 *                 example: "Nhom 1"
 *               ten_doi_tuong:
 *                 type: string
 *                 example: "Đối tượng ưu tiên 1"
 *    responses:
 *      200:
 *        description: Cập nhật loại đối tượng thành công
 */

/**
 * @swagger
 * /api/loaiDoiTuong/{id}:
 *  delete:
 *    summary: Xóa loại đối tượng theo ID
 *    tags: [LoaiDoiTuong]
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

/**
 * @swagger
 * /api/loaiDoiTuong/search:
 *  get:
 *   summary: Tìm kiếm loại đối tượng theo từ khóa
 *   tags: [LoaiDoiTuong]
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *     - in: query
 *       name: nhom_doi_tuong
 *       schema:
 *         type: string
 *         example: "duong_bo"
 *         description: Nhóm đối tượng cần tìm kiếm
 *     - in: query
 *       name: ma_doi_tuong
 *       schema:
 *         type: string
 *         example: "GK06"
 *         description: Mã đối tượng cần tìm kiếm
 *     - in: query
 *       name: ten_doi_tuong
 *       schema:
 *         type: string
 *         example: "Đường xã"
 *         description: Tên đối tượng cần tìm kiếm
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *         description: Số trang (mặc định là 1)
 *     - in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 10
 *         description: Số mục trên mỗi trang (mặc định là 10)
 *   responses:
 *     200:
 *       description: Tìm kiếm loại đối tượng thành công
 */
  

