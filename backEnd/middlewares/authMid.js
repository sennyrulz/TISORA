import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await userModel.findById(decoded.id || decoded._id)
    .select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      name: user.fullName,
      email: user.email,
      admin: user.admin || false,
    };

    next();
  } catch (err) {
    console.error("JWT Auth Error:", err.message);
    return res.status(403).json({ message: "Session expired. Please log in again" });
  }
};
