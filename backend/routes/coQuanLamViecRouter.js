const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/checkRole');
const coQuanLamViec = require('../controllers/coQuanLamViecController');

router.get('/', auth, 
     //checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
      coQuanLamViec.getCoQuanLamViecPaginated);
router.get('/:id', auth, 
    //checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
    coQuanLamViec.getCoQuanLamViecById);
router.post('/', auth, 
    //checkRole(['ADMIN', 'EMPLOYEE']),
     coQuanLamViec.createCoQuanLamViec);
router.patch('/:id', auth, 
    //checkRole(['ADMIN', 'EMPLOYEE']), 
    coQuanLamViec.updateCoQuanLamViec);
router.delete('/:id', auth, 
    //checkRole(['ADMIN', 'EMPLOYEE']), 
coQuanLamViec.deleteCoQuanLamViec);

/** * @swagger
 * tags:
 *  name: CoQuanLamViec
 *  description: Quản lý cơ quan làm việc 
 */

/**
 * @swagger
 * /api/coQuanLamViec:
 *   get:
 *    summary: Lấy danh sách cơ quan làm việc (phân trang)
 *    tags: [CoQuanLamViec]
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
 *        description: Lấy danh sách cơ quan làm việc thành công
 */

/**
 * @swagger
 * /api/coQuanLamViec/{id}:
 *   get:
 *     summary: Lấy thông tin cơ quan làm việc theo ID
 *     tags:
 *      - CoQuanLamViec
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: ID của cơ quan làm việc
 *     responses:
 *       200:
 *         description: Lấy cơ quan làm việc thành công
 */

/**
 * @swagger
 * /api/coQuanLamViec:
 *   post:
 *     summary: Thêm mới cơ quan làm việc
 *     description: |
 *       Thêm mới một cơ quan làm việc vào hệ thống.
 *       - Có thể **vẽ trên bản đồ** (truyền geometry theo GeoJSON)
 *       - Hoặc **nhập tọa độ** (longitude, latitude)
 *       Dữ liệu hình học sử dụng hệ tọa độ EPSG:4326.
 *     tags: [CoQuanLamViec]
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
 *               - loai_hien_trang
 *             properties:
 *               ma_doi_tuong:
 *                 type: string
 *                 example: CV09
 *                 description: Mã định danh cơ quan làm việc
 *               ten:
 *                 type: string
 *                 example: Ủy ban nhân dân xã Tiên Phương
 *                 description: Tên cơ quan làm việc
 *               loai_hien_trang:
 *                 type: string
 *                 example: HT03
 *                 description: Mã loại hiện trạng
 *               dien_tich_m2:
 *                 type: number
 *                 
 *               # ===== CÁCH 1: VẼ (GeoJSON) =====
 *               geom:
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
 * /api/coQuanLamViec/{id}:
 *   delete:
 *    summary: Xóa cơ quan làm việc theo ID
 *    tags: [CoQuanLamViec]
 *    security:
 *     - BearerAuth: []
 *    parameters:
 *     - in: path 
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID của cơ quan làm việc
 *    responses:
 *     200:
 *      description: Xóa cơ quan làm việc thành công
 */


module.exports = router;