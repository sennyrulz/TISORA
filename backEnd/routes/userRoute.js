import express from 'express';
// import { authenticateToken } from "../middlewares/authMid.js"
import {
  loginUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";


const route = express.Router();

// Public routes for User
route.post("/user/signup", createUser); 
route.post("/user/login", loginUser);

// Protected routes
route.get("/dashboard", getUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

export default route;