const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/checkRole');

router.get('/', auth, 
    //checkRole(['ADMIN']),
     userController.getAllUser);
router.get('/:id', auth, 
    //checkRole(['ADMIN']),
     userController.getUserById);
router.put('/:id', auth, 
    //checkRole(['ADMIN']),
     userController.updateUser);
router.delete('/:id', auth, 
    //checkRole(['ADMIN']),
     userController.deleteUser);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Quản lý người dùng 
 */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *         user_name:
//  *           type: string
//  *         email:
//  *           type: string
//  *         role:
//  *           type: string
//  */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *    summary: Lấy thông tin người dùng theo ID
 *    tags: [Users]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID của người dùng cần lấy
 *    responses:
 *      200:
 *       description: Lấy thông tin người dùng thành công
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *    summary: Cập nhật thông tin người dùng theo ID
 *    tags: [Users]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID của người dùng cần cập nhật
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_name:
 *                type: string
 *                description: Tên người dùng mới
 *            phone:
 *              type: string
 *              description: Số điện thoại mới
 *    responses:
 *      200:
 *        description: Cập nhật thông tin người dùng thành công
 */

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Xóa người dùng theo ID
 *    tags: [Users]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID của người dùng cần xóa
 *    responses:  
 *      200:
 *        description: Xóa người dùng thành công
 */
 


module.exports = router;