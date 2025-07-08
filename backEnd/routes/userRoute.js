import express from 'express';
import { authenticateToken } from '../middlewares/authMid.js'
import { loginUser, getUser, createUser, updateUser, deleteUser, verifyUser, getCurrentUser } from "../controllers/userController.js";

const route = express.Router();

// Public routes for User
route.post("/user/signup", createUser); 
route.post("/user/login",  loginUser);
route.get("/user/current-user", authenticateToken, getCurrentUser)


// Protected routes
route.get("/:id/verify/:token", verifyUser)
route.get("/DashboardLanding", authenticateToken, getUser);
route.put("/:id", authenticateToken, updateUser);
route.delete("/:id", authenticateToken, deleteUser);

export default route;