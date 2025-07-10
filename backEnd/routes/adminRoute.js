import express from 'express'
import { authenticateAdmin } from "../middlewares/adminMid.js";
import { loginAdmin, getAdmin, createAdmin, verifyAdmin, getCurrentAdmin, updateAdmin,deleteAdmin} from "../controllers/adminController.js";

const route = express.Router();

//public url for admin
route.post("/signUp", createAdmin);
route.post("/login", loginAdmin);
route.get("/current-admin", authenticateAdmin, getCurrentAdmin)

// Protected routes
route.get("/verify", authenticateAdmin, verifyAdmin)
route.get("/adminDashboardLanding", authenticateAdmin, getAdmin);
route.put("/:id", authenticateAdmin, updateAdmin);
route.delete("/:id", authenticateAdmin, deleteAdmin);

export default route;
