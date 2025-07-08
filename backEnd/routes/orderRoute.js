import express from "express"
import { authenticateToken } from '../middlewares/authMid.js'
import {getMyOrders} from "../controllers/orderController.js"

const route = express.Router();

// GET all orders
route.get("/", authenticateToken, getMyOrders);


export default route;