import express from 'express';
import { initiatePayment, getAllPayments, verifyPayment, paystackWebhook } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payments/initialize', initiatePayment);
router.get('/payments/verify/:reference', verifyPayment);
router.get("/payments/all", getAllPayments);
router.post("/payments/webhook", express.raw({ type: "application/json" }), paystackWebhook);

export default router;