const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/checkRole');
const duongDiaGioiHanhChinhController = require('../controllers/duongDiaGioiHanhChinhController');

router.get('/:id',  
    // auth,
    // checkRole (['ADMIN', 'EMPLOYEE', 'VIEWER']),
    duongDiaGioiHanhChinhController.getDuongDiaGioiHanhChinhById);

module.exports = router;
