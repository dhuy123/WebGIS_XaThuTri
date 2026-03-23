const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/checkRole');
const diaPhanHanhChinhController = require('../controllers/diaPhanHanhChinhController');

router.get('/:id',  
    // auth,
    // checkRole (['ADMIN', 'EMPLOYEE', 'VIEWER']),
    diaPhanHanhChinhController.getDiaPhanHanhChinhById);

module.exports = router;
