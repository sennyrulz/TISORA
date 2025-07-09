import express from 'express';
import { getProducts,createProducts, updateProducts, deleteProducts } from "../controllers/productController.js";
import upload from '../middlewares/multer.js' 
import { authenticateToken } from "../middlewares/authMid.js"

const route = express.Router();

// GET all products
route.get("/all", authenticateToken, getProducts);

// CREATE new product
route.post("/uploads", upload.array("images", 2), authenticateToken, createProducts);

// UPDATE a product
route.put("/edit", authenticateToken, updateProducts);

// DELETE a product
route.delete("/", authenticateToken, deleteProducts);

//admin product upload route

export default route;
