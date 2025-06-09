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
route.get("/dashboard", getAdmin);
route.put("/:id", updateAdmin);
route.delete("/:id",  deleteAdmin);

export default route;
