const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/checkRole');
const duongBoController = require('../controllers/duongBoController');

router.get('/', auth, 
    checkRole (['ADMIN', 'EMPLOYEE', 'VIEWER']),
    duongBoController.getDuongBoPaginated);
router.get('/:id', auth, 
     checkRole (['ADMIN', 'EMPLOYEE', 'VIEWER']),
    duongBoController.getDuongBoById);
router.post('/', auth, 
    checkRole(['ADMIN', 'EMPLOYEE']), 
    duongBoController.createDuongBo);

/**
* @swagger
* tags:
*   name: DuongBo
*   description: Quản lý đường bộ
*/

/**
 * @swagger
 * /api/duongBo:
 *   get:
 *     summary: Lấy danh sách đường bộ có phân trang
 *     tags: [DuongBo]
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          example: 1
 *          description: Số trang (mặc định là 1)
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          example: 10
 *          description: Số mục trên mỗi trang (mặc định là 10)
 *     responses:
 *      200:
 *       description: Thành công
 */

/**
 * @swagger
 * /api/duongBo/{id}:
 *   get:
 *    summary: Lấy thông tin đường bộ theo ID
 *    tags: [DuongBo]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *    responses:
 *      200:
 *       description: Thành công
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DuongBo:
 *       type: object
 *       required:
 *         - ma_doi_tuong
 *         - nhom_doi_tuong
 *         - loai_hien_trang
 *         - loai_duong_bo
 *         - cap_ky_thuat
 *         - loai_chat_lieu
 *         - chieu_xe_chay
 *         - vi_tri
 *         - so_lan_duong
 *         - chieu_rong
 *         - geom
 *       properties:
 *         ma_doi_tuong:
 *           type: string
 *           example: Gk06
 *           description: Mã định danh của đường bộ
 *         nhom_doi_tuong:
 *           type: string
 *           example: duong_bo
 *           description: Nhóm đối tượng
 *         loai_hien_trang:
 *           type: string
 *           example: HT01
 *           description: Loại hiện trạng
 *         loai_duong_bo:
 *           type: string
 *           example: LDB01
 *           description: Loại đường bộ
 *         cap_ky_thuat:
 *           type: string
 *           example: CKT02
 *           description: Cấp kỹ thuật
 *         loai_chat_lieu:
 *           type: string
 *           example: LC01
 *           description: Loại chất liệu
 *         chieu_xe_chay:
 *           type: integer
 *           example: 2
 *           description: Chiều xe chạy
 *         vi_tri:
 *           type: string
 *           example: "Hà Nội - Chương Mỹ"
 *           description: Vị trí đường
 *         so_lan_duong:
 *           type: integer
 *           example: 1
 *           description: Số làn đường
 *         chieu_rong:
 *           type: number
 *           example: 12.5
 *           description: Chiều rộng (m)
 *         lien_ket_giao_thong:
 *           type: string
 *           example: "QL6"
 *           description: Liên kết giao thông
 *         ten_tuyen_quoc_gia:
 *           type: string
 *           example: string
 *           description: Tên tuyến quốc gia
 *         ten_quoc_lo:
 *           type: string
 *           example: string
 *           description: Tên quốc lộ
 *         ten_duong_tinh:
 *           type: string
 *           example: string
 *           description: Tên đường tỉnh
 *         ten_duong_xa:
 *           type: string
 *           example: string
 *           description: Tên đường xã
 *         ten_duong_do_thi:
 *           type: string
 *           example: string
 *           description: Tên đường đô thị
 *         geom:
 *           type: object
 *           required:
 *             - type
 *             - coordinates
 *           properties:
 *             type:
 *               type: string
 *               example: LineString
 *               description: Kiểu hình học (Point, LineString, Polygon)
 *             coordinates:
 *               type: array
 *               example: [[105.81234, 21.03456], [105.81300, 21.03500]]
 *               description: Tọa độ (longitude, latitude)
 *         chieu_dai_m:
 *           type: number
 *           example: string 
 *           description: Chiều dài đường (m)
 */

/**
 * @swagger
 * /api/duongBo:
 *   post:
 *     summary: Tạo mới đường bộ
 *     tags: [DuongBo]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DuongBo'
 *     responses:
 *       201:
 *         description: Đường bộ được tạo thành công
 */


module.exports = router;