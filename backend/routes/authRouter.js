const router = require('express').Router();
const authController = require('../controllers/authController');

// router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/register', authController.resgisterUser);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Quản lý xác thực người dùng
 */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     registerUser:
//  *       type: object
//  *       required:
//  *         - username
//  *         - password
//  *         - email
//  *       properties:
//  *         username:
//  *           type: string
//  *           example: admin
//  *         password:
//  *           type: string
//  *           example: 123456
//  *         email:
//  *           type: string
//  *           example: admin@gmail.com
//  */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - pass_word
 *               - user_name
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               pass_word:
 *                 type: string
 *                 example: 123456
 *               user_name:
 *                 type: string
 *                 example: username
 *               
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đã tồn tại
 */


/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Đăng nhập người dùng
 *    tags: [Auth]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - email
 *         - pass_word
 *        properties:
 *          email:
 *            type: string
 *            example: admin@gmail.com
 *          pass_word:
 *            type: string
 *            example: 123456
 *    responses:
 *     200:
 *      description: Đăng nhập thành công
 *     401:
 *      description: Tên đăng nhập hoặc mật khẩu không đúng
 */

module.exports = router;
