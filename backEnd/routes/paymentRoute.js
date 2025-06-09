import express from 'express';
import { initializePayment, getAllPayment, verifyPayment, handlePaystackWebhook } from '../controllers/orderController.js';

const router = express.Router();

router.post('/payments/initialize', initializePayment);
router.get('/payments/verify/:ref', verifyPayment);
router.get("/payments/all", getAllPayment);
router.post("/payments/webhook", express.raw({ type: "application/json" }), handlePaystackWebhook);

export default router;