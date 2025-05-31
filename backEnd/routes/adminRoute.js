import express from 'express'
// import { authenticateAdmin } from "../middlewares/adminMid.js";
import {
  loginAdmin,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin} from "../controllers/adminController.js";

const route = express.Router();

//public url
route.post("/admin/signUp", createAdmin);
route.post("/admin/login", loginAdmin);

// Apply middleware to protected routes
route.get("/admin/dashboard", getAdmin);
route.put("/admin/:id", updateAdmin);
route.delete("/admin/:id",  deleteAdmin);

export default route;
