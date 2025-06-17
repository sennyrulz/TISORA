import express from 'express';
import { 
  initiatePayment, 
  verifyTransaction, 
  verifyWebhook, 
  getAllPayments,
  paystackWebhook 
} from '../controllers/paymentController.js';
// import { authenticateToken } from '../middlewares/authMid.js'; // Temporarily comment out

const router = express.Router();

// Temporarily remove authentication
router.post('/initialize', initiatePayment);
router.get('/verify/:reference', verifyTransaction);
router.get("/all", getAllPayments);

// Webhook route - no authentication needed as it's called by Paystack
router.post("/webhook", express.raw({ type: "application/json" }), paystackWebhook);

export default router;