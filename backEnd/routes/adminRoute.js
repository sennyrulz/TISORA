import express from 'express'
import { authenticateAdmin } from "../middlewares/adminMid.js";
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
route.get("/", authenticateAdmin, getAdmin);
route.put("/:id", authenticateAdmin, updateAdmin);
route.delete("/:id", authenticateAdmin, deleteAdmin);

export default route;
