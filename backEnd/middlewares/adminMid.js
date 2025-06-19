 import jwt from "jsonwebtoken";
    
  export const authenticateAdmin  = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ message: "Please login to create product" });
    }
    
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (error, payload) => {
      if (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
    
      req.admin = { _id: payload.id, admin: payload.admin };
      next();
    });
  };