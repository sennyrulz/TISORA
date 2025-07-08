import express from 'express';
import { initializePayment, verifyTransaction, verifyWebhook, getAllPayments, paystackWebhook } from '../controllers/paymentController.js';
import { authenticateToken } from '../middlewares/authMid.js';

const router = express.Router();

// Protected routes - require authentication
router.post('/initialize',  authenticateToken , initializePayment);
router.get('/verify/:reference',  verifyTransaction);
router.get("/all",  authenticateToken, getAllPayments);

// Webhook route - no authentication needed as it's called by Paystack
router.post("/webhook", express.raw({ type: "application/json" }), paystackWebhook);

export default router;