const express = require('express');
const router = express.Router();
const nhaController = require('../controllers/nhaController');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/checkRole');

router.get('/:id', 
    // auth, 
    // checkRole(['ADMIN', 'EMPLOYEE']),
     nhaController.getNhaById);

module.exports = router;

