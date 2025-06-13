import express from 'express';
import upload from '../middlewares/multer.js' 
import { getProducts,createProducts, updateProducts, deleteProducts } from "../controllers/productController.js";

const route = express.Router();

// GET all products
route.get("/admin/products/get-all-products", getProducts);

// CREATE new product
route.post("/admin/products", upload.array("images", 2), createProducts);


// UPDATE a product
route.put("/admin/products", updateProducts);

// DELETE a product
route.delete("/admin/products", deleteProducts);

//admin product upload route

export default route;
