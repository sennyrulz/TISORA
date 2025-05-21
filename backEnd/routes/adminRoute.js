import express from 'express'
import jwt from "jsonwebtoken";
import {
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) return res.status(403).send("Forbidden");
    req.user = user;
    next();
  });
};

// Apply middleware to protected routes
router.get("/AuthPage", authenticateToken, getAdmin);
router.post("/AuthPage", authenticateToken, createAdmin);
router.put("/AuthPage", authenticateToken, updateAdmin);
router.delete("/AuthPage", authenticateToken, deleteAdmin);

export default router;
