import express from "express";
const router = express.Router()

import { registerUser, login } from "../controllers/authController.js";
import { products } from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/authMid.js";
// import { authorizeVendor } from '../middlewares/vendorMid.js';
import { authorizeAdmin } from '../middlewares/adminMid.js';

// User routes
router.post("/login", login);
router.post("/register", registerUser);
// router.get("/register/:id", getRegisterUser);

// Product routes
router.post("/product", authenticateToken, authorizeVendor, products);
router.get("/product", authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        // Logic to retrieve products (you can implement this in your controller)
        const allProducts = await Goods.find(); // Assuming you have a Product model
        res.status(200).json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
