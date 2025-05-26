import express from 'express';
import { authenticateToken } from "../middlewares/authMid.js"
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";


const router = express.Router();

// Public routes for User
router.post("signUp", createUser); 
router.post("/login", getUser);

// Protected routes
router.get("/Profile", authenticateToken, getUser);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;