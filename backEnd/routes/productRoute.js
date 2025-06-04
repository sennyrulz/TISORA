import express from 'express';
import upload from '../middlewares/productUploadHandler.js' 
import {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts } from "../controllers/productController.js";

const route = express.Router();

// GET all products
route.get("/admin/dashboard/products",
    getProducts);

// CREATE new product
route.post("/admin/dashboard/products/upload", 
    upload.array("images", 2), 
    createProducts);


// UPDATE a product
route.put("/:id", 
    updateProducts);

// DELETE a product
route.delete("/:id", 
    deleteProducts);

//admin product upload route

export default route;
