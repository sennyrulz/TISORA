import express from 'express'
import { authenticateAdmin } from "../middlewares/adminMid.js";
import { loginAdmin, getAdmin, createAdmin, verifyAdmin, getCurrentAdmin, updateAdmin,deleteAdmin} from "../controllers/adminController.js";

const route = express.Router();

//public url for admin
route.post("/admin/signUp", createAdmin);
route.post("/admin/login", loginAdmin);
route.get("/admin/current-admin", authenticateAdmin, getCurrentAdmin)

// Protected routes
route.get("/verify", authenticateAdmin, verifyAdmin)
route.get("/adminDashboardLanding", authenticateAdmin, getAdmin);
route.put("/:id", authenticateAdmin, updateAdmin);
route.delete("/:id", authenticateAdmin, deleteAdmin);

export default route;
