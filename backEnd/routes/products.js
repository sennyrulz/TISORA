import express from 'express';
import upload from '../middlewares/upload.js'; // Import the multer middleware
import { products } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', upload.array('pictures', 4), products);

export default router;
