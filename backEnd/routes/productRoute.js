import express from 'express';
import upload from '../middlewares/upload.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js'; // Make sure these are defined
import {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
} from "../controllers/productController.js";

const route = express.Router();

// GET all products
route.get("/admin/getProducts", 
    authenticateToken, 
    authorizeAdmin, 
    getProducts);

// CREATE new product
route.post("/admin/createProducts", 
    authenticateToken, 
    authorizeAdmin, 
    createProducts);

// UPDATE a product
route.put("/admin/updateProducts", 
    authenticateToken, 
    authorizeAdmin, 
    updateProducts);

// DELETE a product
route.delete("/admin/Products", 
    authenticateToken, 
    authorizeAdmin, 
    deleteProducts);

export default route;
