import express from 'express';
import upload from '../middlewares/upload.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMid.js'; // Make sure these are defined
import {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
} from "../controllers/productController.js";

const route = express.Router();

// GET all products
route.get("/", 
    authenticateToken, 
    authorizeAdmin, 
    getProducts);

// CREATE new product
route.post("/", 
    authenticateToken, 
    authorizeAdmin, 
    createProducts);
    
route.post("/upload", upload.single("image"), productUploadHandler);

// UPDATE a product
route.put("/:id", 
    authenticateToken, 
    authorizeAdmin, 
    updateProducts);

// DELETE a product
route.delete("/:id", 
    authenticateToken, 
    authorizeAdmin, 
    deleteProducts);

export default route;
