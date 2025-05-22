import express from 'express'
import {
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const route = express.Router();

//public url
route.post("/", createAdmin);

// Apply middleware to protected routes
route.get("/", authenticateToken, getAdmin);
route.put("/:id", authenticateToken, updateAdmin);
route.delete("/:id", authenticateToken, deleteAdmin);

export default route;
