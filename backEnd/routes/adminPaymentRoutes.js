import express from 'express';
import { getAllTransactions } from '../controllers/adminPaymentController.js';
import { authenticateAdmin } from '../middlewares/adminMid.js';

const router = express.Router();

// Admin-only route to view all transactions
router.get('/admin/transactions', authenticateAdmin, getAllTransactions);

export default router;
