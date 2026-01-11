const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/checkRole');
const congTrinhTonGiaoController = require('../controllers/congTrinhTonGiaoController');

router.get('/', auth, 
     checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']), congTrinhTonGiaoController.getCongTrinhTonGiaoPaginated);
router.get('/:id', auth, 
    checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
    congTrinhTonGiaoController.getCongTrinhTonGiaoById);
router.post('/', auth, 
    //checkRole(['ADMIN', 'EMPLOYEE']),
     congTrinhTonGiaoController.createCongTrinhTonGiao);
router.patch('/:id', auth, checkRole(['ADMIN', 'EMPLOYEE']), congTrinhTonGiaoController.updateCongTrinhTonGiao);
router.delete('/:id', auth, checkRole(['ADMIN', 'EMPLOYEE']), congTrinhTonGiaoController.deleteCongTrinhTonGiao);


/** * @swagger
 * tags:
 *  name: CongTrinhTonGiao
 *  description: Quản lý công trình tôn giáo 
 */

/**
 * @swagger
 * /api/congTrinhTonGiao:
 *   get:
 *    summary: Lấy danh sách công trình tôn giáo (phân trang)
 *    tags: [CongTrinhTonGiao]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *         type: integer
 *         example: 1
 *         description: Trang hiện tại
 *      - in: query
 *        name: limit
 *        schema:
 *         type: integer
 *         example: 10
 *         description: Số bản ghi mỗi trang
 *    responses:
 *      200:
 *        description: Lấy danh sách công trình tôn giáo thành công
 */

/**
 * @swagger
 * /api/congTrinhTonGiao/{id}:
 *   get:
 *     summary: Lấy thông tin công trình tôn giáo theo ID
 *     tags:
 *      - CongTrinhTonGiao
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: ID của công trình tôn giáo
 *     responses:
 *       200:
 *         description: Lấy công trình tôn giáo thành công
 */

/**
 * @swagger
 * /api/congTrinhTonGiao:
 *   post:
 *     summary: Thêm mới công trình tôn giáo
 *     description: |
 *       Thêm mới một công trình tôn giáo vào hệ thống.
 *       - Có thể **vẽ trên bản đồ** (truyền geometry theo GeoJSON)
 *       - Hoặc **nhập tọa độ** (longitude, latitude)
 *       Dữ liệu hình học sử dụng hệ tọa độ EPSG:4326.
 *     tags: [CongTrinhTonGiao]
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
 *             properties:
 *               ma_doi_tuong:
 *                 type: string
 *                 example: CM01
 *                 description: Mã định danh công trình
 *               ten:
 *                 type: string
 *                 example: Chùa Trăm Gian
 *                 description: Tên công trình tôn giáo
 *               xep_hang_di_tich:
 *                 type: integer
 *                 example: 1
 *               nam_xep_hang:
 *                 type: integer
 *                 example: 1980
 *               nhom_doi_tuong:
 *                 type: string
 *                 example: cong_trinh_ton_giao
 *               loai_hien_trang:
 *                 type: string
 *                 example: HT01
 *               dien_tich:
 *                 type: number
 *                 example: 1200.5
 *               dia_chi:
 *                 type: string
 *                 example: Xã Tiên Phương, Huyện Chương Mỹ, Hà Nội
 *
 *               # ===== CÁCH 1: VẼ (GeoJSON) =====
 *               geometry:
 *                 type: object
 *                 description: Dữ liệu hình học khi vẽ trên bản đồ (GeoJSON)
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     example: [105.81234, 21.03456]
 *
 *               # ===== CÁCH 2: NHẬP TỌA ĐỘ =====
 *               longitude:
 *                 type: number
 *                 example: 105.81234
 *                 description: Kinh độ (EPSG:4326)
 *               latitude:
 *                 type: number
 *                 example: 21.03456
 *                 description: Vĩ độ (EPSG:4326)
 *
 *     responses:
 *       201:
 *         description: Thêm công trình tôn giáo thành công
 */

/**
 * @swagger
 * /api/congTrinhTonGiao/{id}:
 *   patch:
 *     summary: Cập nhật công trình tôn giáo theo ID
 *     tags: [CongTrinhTonGiao]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của công trình tôn giáo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ma_doi_tuong:
 *                 type: string
 *                 example: CM01
 *               ten:
 *                 type: string
 *                 example: Chùa Trăm Gian
 *               xep_hang_di_tich:
 *                 type: integer
 *                 example: 1
 *               nam_xep_hang:
 *                 type: integer
 *                 example: 1980
 *               nhom_doi_tuong:
 *                 type: string
 *                 example: cong_trinh_ton_giao
 *               loai_hien_trang:
 *                 type: integer
 *                 example: HT01
 *               dien_tich:
 *                 type: number
 *                 example: 1200.5
 *               dia_chi:
 *                 type: string
 *                 example: Xã Tiên Phương, Huyện Chương Mỹ
 *
 *               # ===== CÁCH 1: VẼ (GeoJSON) =====
 *               geometry:
 *                 type: object
 *                 description: Dữ liệu hình học GeoJSON khi vẽ trên bản đồ
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [105.81234, 21.03456]
 *
 *               # ===== CÁCH 2: NHẬP TỌA ĐỘ =====
 *               longitude:
 *                 type: number
 *                 example: 105.81234
 *               latitude:
 *                 type: number
 *                 example: 21.03456
 *     responses:
 *       200:
 *         description: Cập nhật công trình tôn giáo thành công
 */

/**
 * @swagger
 * /api/congTrinhTonGiao/{id}:
 *   delete:
 *    summary: Xóa công trình tôn giáo theo ID
 *    tags: [CongTrinhTonGiao]
 *    security:
 *     - BearerAuth: []
 *    parameters:
 *     - in: path 
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID của công trình tôn giáo
 *    responses:
 *     200:
 *      description: Xóa công trình tôn giáo thành công
 */


module.exports = router;