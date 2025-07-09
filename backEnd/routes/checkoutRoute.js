import express from "express";
import { authenticateToken } from '../middlewares/authMid.js'
import {processCheckout} from "../controllers/checkoutController.js"

const route = express.Router();

// GET all orders
route.post("/", authenticateToken, processCheckout);


export default route;