import express from 'express'
import { authenticateAdmin } from "../middlewares/adminMid.js";
import {
  loginAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const route = express.Router();

//public url
route.post("/signUp", createAdmin);
route.post("/login", loginAdmin);

// Apply middleware to protected routes
// route.get("/", getAdmin);
route.put("/:id", updateAdmin);
route.delete("/:id", deleteAdmin);

export default route;
