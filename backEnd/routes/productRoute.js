import express from 'express';
import upload from '../middlewares/productUploadHandler.js'
// import { productUploadHandler } from '../middlewares/productUploadHandler.js';
// import { authenticateAdmin } from '../middlewares/adminMid.js'; 
import { authenticateToken } from '../middlewares/authMid.js'; 
import {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts } from "../controllers/productController.js";

const route = express.Router();

// GET all products
route.get("/admin/dashboard/products",
    authenticateToken,
    getProducts);

// CREATE new product
route.post("/admin/dashboard/products",
    authenticateToken,
    upload.array('images', 2), 
    createProducts);

// UPDATE a product
route.put("/:id", 
    authenticateToken, 
    updateProducts);

// DELETE a product
route.delete("/:id", 
    authenticateToken, 
    deleteProducts);

//admin product upload route
route.post("/admin/dashboard/products/upload", upload.array("images", 2), createProducts);

export default route;
