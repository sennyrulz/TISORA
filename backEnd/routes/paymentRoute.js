import express from 'express';
import { 
  initiatePayment, 
  verifyTransaction, 
  verifyWebhook, 
  getAllPayments,
  paystackWebhook 
} from '../controllers/paymentController.js';
import { authentication } from '../middlewares/authMid.js';

const router = express.Router();

// Protected routes - require authentication
router.post('/initialize', authentication, initiatePayment);
router.get('/verify/:reference', authentication, verifyTransaction);
router.get("/all", authentication, getAllPayments);

// Webhook route - no authentication needed as it's called by Paystack
router.post("/webhook", express.raw({ type: "application/json" }), paystackWebhook);

export default router;