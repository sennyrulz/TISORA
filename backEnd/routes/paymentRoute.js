import express from 'express';
import { initiatePayment} from '../controllers/paymentController.js';
// import { verifyPayment } from '../controllers/paymentController.js'; // add the verify payment logic in your payment controller


const router = express.Router();

router.post("/checkout/initiate-payment", initiatePayment);
// router.post('/verify', verifyPayment);

export default router;