import express from 'express';
// import { authenticateToken } from "../middlewares/authMid.js"
import {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";


const route = express.Router();

// Public routes for User
route.post("/signUp", createUser); 
route.post("/login", loginUser);

// Protected routes
// route.get("/Profile", getUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

export default route;