import express from 'express'
import { authenticateAdmin } from "../middlewares/adminMid.js";
import {
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

//public url
router.post("/AdminAuth", createAdmin);
router.post("/AdminAuth", getAdmin);

// Apply middleware to protected routes
router.get("/", authenticateAdmin, getAdmin);
router.put("/:id", authenticateAdmin, updateAdmin);
router.delete("/:id", authenticateAdmin, deleteAdmin);

export default router;
