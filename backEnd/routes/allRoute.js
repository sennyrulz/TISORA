import express from 'express';
import { authenticateAdmin } from "../middlewares/adminMid"
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const route = express.Router();

// User routes with middleware
route.post("/AuthPage", authenticateAdmin, createUser);
route.get("/AuthPage", authenticateAdmin, getUser);
route.put("/AuthPage", authenticateAdmin, updateUser);
route.delete("/AuthPage", authenticateAdmin, deleteUser);

// Export the route properly
export default route;
