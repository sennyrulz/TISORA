import express from 'express';
import { initializePayment, verifyPayment, handleWebhook } from '../controllers/orderController';

const router = express.Router();

router.post('/initialize', initializePayment);
router.get('/verify/:reference', verifyPayment);
router.post('/webhook', handleWebhook);

export default router;