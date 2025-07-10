import express from 'express';
import { authenticateToken } from '../middlewares/authMid.js'
import { loginUser, getUser, createUser, updateUser, deleteUser, verifyUser, getCurrentUser, getAllUser } from "../controllers/userController.js";

const route = express.Router();

// Public routes for User
route.post("/signup", createUser); 
route.post("/login",  loginUser);
route.get("/current-user", authenticateToken, getCurrentUser);
route.get("/all", authenticateToken, getAllUser)



// Protected routes
route.get("/:id/verify/:token", verifyUser)
route.get("/DashboardLanding", authenticateToken, getUser);
route.put("/:id", authenticateToken, updateUser);
route.delete("/:id", authenticateToken, deleteUser);

export default route;