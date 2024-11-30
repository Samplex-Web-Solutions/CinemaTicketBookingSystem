const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateUser } = require('../middleware/auth');

router.post('/process', authenticateUser, paymentController.processPayment);
router.get('/verify/:paymentId', authenticateUser, paymentController.verifyPayment);




module.exports = router;