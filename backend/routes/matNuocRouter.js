const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/checkRole');
const matNuocController = require('../controllers/matNuocController');

router.get('/', auth,
    checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
    matNuocController.getMatNuocPaginated);
router.get('/:id', auth,
        checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
    matNuocController.getMatNuocById);
router.post('/', auth,
    //checkFunctionPermission('MAT_NUOC_CREATE'),
    matNuocController.createMatNuoc);
router.patch('/:id', auth,
    //checkFunctionPermission('MAT_NUOC_EDIT'),
    matNuocController.updateMatNuoc);
router.delete('/:id', auth,
    checkRole(['ADMIN', 'EMPLOYEE', 'VIEWER']),
    matNuocController.deleteMatNuoc);

/**
* @swagger
* tags:
*   name: MatNuoc
*   description: Quản lý mặt nước
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     MatNuoc:
 *       type: object
 *       required:
 *         - ma_doi_tuong
 *         - nhom_doi_tuong
 *         - loai_trang_thai
 *         - geom
 *       properties:
 *         ma_doi_tuong:
 *           type: string
 *           example: KL02
 *           description: Mã định danh đối tượng
 *         nhom_doi_tuong:
 *           type: string
 *           example: mat_nuoc
 *           description: Nhóm đối tượng
 *         loai_trang_thai:
 *           type: string
 *           example: 1
 *           description: Loại trạng thái
 *         geom:
 *           type: object
 *           description: Dữ liệu hình học ở định dạng GeoJSON
 *           required:
 *             - type
 *             - coordinates
 *           properties:
 *             type:
 *               type: string
 *               example: Polygon
 *             coordinates:
 *               type: array
 *               description: Mảng 3 chiều cho Polygon (đóng vòng lặp)
 *               example:
 *                 - - [105.84182739257812, 21.02876114895156]
 *                   - [105.84228515625, 21.02876114895156]
 *                   - [105.84228515625, 21.02923583984375]
 *                   - [105.84182739257812, 21.02923583984375]
 *                   - [105.84182739257812, 21.02876114895156]
 */

/**
 * @swagger
 * /api/matNuoc:
 *   get:
 *     summary: Lấy danh sách mặt nước có phân trang
 *     tags: [MatNuoc]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Số trang (mặc định là 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Số mục trên mỗi trang (mặc định là 10)
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /api/matNuoc/{id}:
 *  get:
 *    summary: Lấy thông tin mặt nước theo ID
 *    tags: [MatNuoc]
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
 *        description: Thành công
 */

/**
 * @swagger
 * /api/matNuoc:
 *   post:
 *     summary: Tạo mới mặt nước
 *     tags: [MatNuoc]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatNuoc'
 *     responses:
 *       201:
 *         description: Tạo mặt nước thành công
 */

/**
 * @swagger
 * /api/matNuoc/{id}:
 *  patch:
 *    summary: Cập nhật mặt nước theo ID
 *    tags: [MatNuoc]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MatNuoc'
 *    responses:
 *      200:
 *        description: Cập nhật mặt nước thành công
 */
 



module.exports = router;