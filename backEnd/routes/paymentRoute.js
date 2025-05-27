import express from 'express';

const router = express.Router();
const { initiatePayment, verifyPayment } = require('../controllers/paymentController');

router.post("/checkout/initiate-payment", initiatePayment);
router.post('/verify', verifyPayment);

module.exports = router;