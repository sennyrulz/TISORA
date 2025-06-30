import express from 'express'
import { authenticateAdmin } from "../middlewares/adminMid.js";
import { loginAdmin, getAdmin, createAdmin, updateAdmin,deleteAdmin} from "../controllers/adminController.js";

const route = express.Router();

//public url for admin
route.post("/admin/signUp", createAdmin);
route.post("/admin/login", authenticateAdmin, loginAdmin);

// Protected routes
route.get("/dashboard", getAdmin);
route.put("/:id", updateAdmin);
route.delete("/:id",  deleteAdmin);

export default route;
