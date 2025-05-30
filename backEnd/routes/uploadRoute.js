import express from express;
import upload from '../middlewares/upload.js';
import { createProducts } from '../controllers/productController.js';
import { authenticateToken } from '../middlewares/authMid.js'

const route =express.Router();

route.post(
    "/", 
    authenticateToken, 
    upload.array("image", 2), 
    createProducts
);

export default route;

