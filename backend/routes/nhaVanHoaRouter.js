const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');
const nhaVanHoaController = require('../controllers/nhaVanHoaController');

router.get('/', auth,
    //checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']), 
    nhaVanHoaController.getNhaVanHoaPaginated);
router.get('/:id', auth,
    // checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
    nhaVanHoaController.getNhaVanHoaById);
router.post('/', auth,
    //checkRole(['ADMIN', 'EMPLOYEE']),
    nhaVanHoaController.createNhaVanHoa);
router.put('/:id', auth,
    // checkRole(['ADMIN', 'EMPLOYEE']), 
    nhaVanHoaController.updateNhaVanHoa);
router.delete('/:id', auth,
    //checkRole(['ADMIN', 'EMPLOYEE']), 
    nhaVanHoaController.deleteNhaVanHoa);


/** * @swagger
 * tags:
 *  name: NhaVanHoa
 *  description: Quản lý nhà văn hóa 
 */

/**
 * @swagger
 * /api/nhaVanHoa:
 *   get:
 *    summary: Lấy danh sách nhà văn hóa (phân trang)
 *    tags: [NhaVanHoa]
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
 *        description: Lấy danh sách nhà văn hóa thành công
 */

/**
 * @swagger
 * /api/nhaVanHoa/{id}:
 *   get:
 *     summary: Lấy thông tin nhà văn hóa theo ID
 *     tags:
 *      - NhaVanHoa
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: ID của nhà văn hóa
 *     responses:
 *       200:
 *         description: Lấy nhà văn hóa thành công
 */

/**
 * @swagger
 * /api/nhaVanHoa:
 *   post:
 *     summary: Thêm mới nhà văn hóa
 *     description: |
 *       Thêm mới một nhà văn hóa vào hệ thống.
 *       - Có thể **vẽ trên bản đồ** (truyền geom theo GeoJSON)
 *       - Hoặc **nhập tọa độ** (longitude, latitude)
 *       Dữ liệu hình học sử dụng hệ tọa độ EPSG:4326.
 *     tags: [NhaVanHoa]
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
 *                 example: DA0218
 *                 description: Mã định danh nhà văn hóa
 *               danh_tu_chung:
 *                 type: string
 *                 example: "thôn"
 *                 description: Danh từ chung của nhà văn hóa
 *               ten:
 *                 type: string
 *                 example: Nhà văn hóa Tiên Phương
 *                 description: Tên nhà văn hóa
 *               loai_hien_trang:
 *                 type: string
 *                 example: HT02
 *                 description: Loại hiện trạng nhà văn hóa
 *               dia_chi:
 *                 type: string
 *                 example: 
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
 *         description: Thêm nhà văn hóa thành công
 */

/**
 * @swagger
 * /api/nhaVanHoa/{id}:
 *   put:
 *     summary: Cập nhật nhà văn hóa theo ID
 *     tags: [NhaVanHoa]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của nhà văn hóa cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ma_doi_tuong:
 *                 type: string
 *                 example: DA0218
 *               danh_tu_chung:
 *                 type: string
 *                 example: "thôn"
 *               ten:
 *                 type: string
 *                 example: Nhà văn hóa Tiên Phương
 *               loai_hien_trang:
 *                 type: string
 *                 example: HT01
 *                 description: Loại hiện trạng nhà văn hóa
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
 *         description: Cập nhật nhà văn hóa thành công
 */

/**
 * @swagger
 * /api/nhaVanHoa/{id}:
 *   delete:
 *    summary: Xóa nhà văn hóa theo ID
 *    tags: [NhaVanHoa]
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