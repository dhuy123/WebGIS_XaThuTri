const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');
const congTrinhGiaoDucController = require('../controllers/congTrinhGiaoDucController');

router.get('/', auth,
    //checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']), 
    congTrinhGiaoDucController.getCongTrinhGiaoDucPaginated);
router.get('/:id', auth,
    // checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
    congTrinhGiaoDucController.getCongTrinhGiaoDucById);
router.post('/', auth,
    //checkRole(['ADMIN', 'EMPLOYEE']),
    congTrinhGiaoDucController.createCongTrinhGiaoDuc);
router.put('/:id', auth,
    // checkRole(['ADMIN', 'EMPLOYEE']), 
    congTrinhGiaoDucController.updateCongTrinhGiaoDuc);
router.delete('/:id', auth,
    //checkRole(['ADMIN', 'EMPLOYEE']), 
    congTrinhGiaoDucController.deleteCongTrinhGiaoDuc);


/** * @swagger
 * tags:
 *  name: CongTrinhGiaoDuc
 *  description: Quản lý công trình giáo dục 
 */

/**
 * @swagger
 * /api/congTrinhGiaoDuc:
 *   get:
 *    summary: Lấy danh sách công trình giáo dục (phân trang)
 *    tags: [CongTrinhGiaoDuc]
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
 *        description: Lấy danh sách công trình giáo dục thành công
 */

/**
 * @swagger
 * /api/congTrinhGiaoDuc/{id}:
 *   get:
 *     summary: Lấy thông tin công trình giáo dục theo ID
 *     tags:
 *      - CongTrinhGiaoDuc
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: ID của công trình giáo dục
 *     responses:
 *       200:
 *         description: Lấy công trình giáo dục thành công
 */

/**
 * @swagger
 * /api/congTrinhGiaoDuc:
 *   post:
 *     summary: Thêm mới công trình giáo dục
 *     description: |
 *       Thêm mới một công trình giáo dục vào hệ thống.
 *       - Có thể **vẽ trên bản đồ** (truyền geom theo GeoJSON)
 *       - Hoặc **nhập tọa độ** (longitude, latitude)
 *       Dữ liệu hình học sử dụng hệ tọa độ EPSG:4326.
 *     tags: [CongTrinhGiaoDuc]
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
 *                 example: CE08
 *                 description: Mã định danh công trình
 *               ten:
 *                 type: string
 *                 example: Trường Tiểu học Tiên Phương
 *                 description: Tên công trình giáo dục
 *               loai_hien_trang:
 *                 type: string
 *                 example: HT02
 *               so_dien_thoai:
 *                 type: string
 *                 example: " "
 *               email:
 *                 type: string
 *                 example:
 *               url:
 *                 type: string
 *                 example: "http://truongtienphuong.edu.vn"
 *               so_lop:
 *                 type: integer
 *                 example: 450
 *               so_hoc_sinh:
 *                 type: integer
 *                 example: 1200
 *               so_giao_vien:
 *                 type: integer
 *                 example: 80
 *               nam_xay_dung:
 *                 type: integer
 *                 example: 1995
 *               dien_tich:
 *                 type: number
 *                 example: 1200.5
 *               dia_chi:
 *                 type: string
 *                 example: Xã Tiên Phương, Huyện Chương Mỹ, Hà Nội
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
 * /api/congTrinhGiaoDuc/{id}:
 *   put:
 *     summary: Cập nhật công trình giáo dục theo ID
 *     tags: [CongTrinhGiaoDuc]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của công trình giáo dục cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ma_doi_tuong:
 *                 type: string
 *                 example: CE08
 *               ten:
 *                 type: string
 *                 example: Trường Tiểu học Tiên Phương
 *               loai_hien_trang:
 *                 type: string
 *                 example: HT01
 *               so_dien_thoai:
 *                 type: string
 *                 example: "1980"
 *               email:
 *                 type: string
 *                 example: cong_trinh_giao_duc
 *               url:
 *                 type: string
 *                 example: "http://truongtienphuong.edu.vn"
 *               so_lop:
 *                 type: integer
 *                 example: 450
 *               so_hoc_sinh:
 *                 type: integer
 *                 example: 1200
 *               so_giao_vien:
 *                 type: integer
 *                 example: 80
 *               nam_xay_dung:
 *                 type: integer
 *                 example: 1995
 *               dien_tich:
 *                 type: number
 *                 example: 1200.5
 *               dia_chi:
 *                 type: string
 *                 example: Xã Tiên Phương, Huyện Chương Mỹ
 *
 *               # ===== CÁCH 1: VẼ (GeoJSON) =====
 *               geom:
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
 *         description: Cập nhật công trình giáo dục thành công
 */

/**
 * @swagger
 * /api/congTrinhGiaoDuc/{id}:
 *   delete:
 *    summary: Xóa công trình giáo dục theo ID
 *    tags: [CongTrinhGiaoDuc]
 *    security:
 *     - BearerAuth: []
 *    parameters:
 *     - in: path 
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID của công trình giáo dục
 *    responses:
 *     200:
 *      description: Xóa công trình giáo dục thành công
 */


module.exports = router;