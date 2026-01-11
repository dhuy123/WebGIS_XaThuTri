const express = require('express');
const router = express.Router();
const congTrinhYTeController = require('../controllers/congTrinhYTeController');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');

router.get('/', auth,
    //checkRole(['ADMIN', 'USER']),
    congTrinhYTeController.getCongTrinhYTePaginated);
router.get('/:id', auth,
    //checkRole(['ADMIN', 'USER']),
    congTrinhYTeController.getCongTrinhYTeById);
router.post('/', auth,
    //checkRole(['ADMIN']),
    congTrinhYTeController.createCongTrinhYTe);
router.delete('/:id', auth,
    //checkRole(['ADMIN']),
    congTrinhYTeController.deleteCongTrinhYTe);



/**
 * @swagger
 * tags:
 *  name: CongTrinhYTe
 *  description: Quản lý công trình y tế
 */

/**
 * @swagger
 * /api/congTrinhYTe:
 *  get:
 *   summary: Lấy danh sách công trình y tế có phân trang
 *   tags: [CongTrinhYTe]
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *       description: Số trang (mặc định là 1)
 *     - in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 10
 *       description: Số mục trên mỗi trang (mặc định là 10)
 *   responses:
 *      200:
 *        description: Lấy danh sách công trình y tế thành công
 */

/**
 * @swagger
 * /api/congTrinhYTe/{id}:
 *  get:
 *   summary: Lấy thông tin công trình y tế theo ID
 *   tags: [CongTrinhYTe]
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID của công trình y tế
 *   responses:
 *     200:
 *        description: Lấy công trình y tế thành công
 *     404:
 *        description: Công trình y tế không tồn tại
 */

/**
 * @swagger
 * /api/congTrinhYTe:
 *   post:
 *     summary: Tạo mới công trình y tế
 *     tags: [CongTrinhYTe]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ma_doi_tuong
 *               - ten
 *               - loai_hien_trang
 *             properties:
 *               ma_doi_tuong:
 *                 type: string
 *                 example: "CP06"
 *               ten:
 *                 type: string
 *               loai_hien_trang:
 *                 type: string
 *                 example: "HT01"
 *               cap_y_te:
 *                 type: string
 *               so_giuong:
 *                 type: integer
 *               so_bac_sy:
 *                 type: integer
 *               so_y_ta:
 *                 type: integer
 *               so_dien_thoai:
 *                 type: string
 *               dien_tich:
 *                 type: number
 *               dia_chi:
 *                 type: string
 *               geom:
 *                 type: object
 *                 description: Dữ liệu hình học khi vẽ trên bản đồ (GeoJSON)
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: "Point"
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [105.81234, 21.03456]
 *               long:
 *                 type: number
 *                 description: Kinh độ (sử dụng nếu không có geom)
 *               lat:
 *                 type: number
 *                 description: Vĩ độ (sử dụng nếu không có geom)
 *     responses:
 *       201:
 *         description: Tạo công trình y tế thành công
*/

/**
 * @swagger
 * /api/congTrinhYTe/{id}:
 *  delete:
 *    summary: Xóa công trình y tế theo ID
 *    tags: [CongTrinhYTe]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID của công trình y tế
 *    responses:
 *      200:
 *        description: Xóa công trình y tế thành công
 */

module.exports = router;
