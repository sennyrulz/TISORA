import express from 'express';
import { initiatePayment} from '../controllers/paymentController.js';
// import { verifyPayment } from '../controllers/paymentController.js'; // add the verify payment logic in your payment controller


const router = express.Router();

router.post("/cart/Checkout", initiatePayment);
// router.post('/verify', verifyPayment);

// Uncomment this when you implement verify payment logic
// router.post('/checkout/verify-payment', verifyPayment);

export default router;