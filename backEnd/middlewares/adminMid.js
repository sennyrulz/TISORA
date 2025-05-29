 import jwt from "jsonwebtoken";
 
export const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
      }
    
      const token = authHeader.split(" ")[1];
    
      jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        return res.status(403).json({ message: "Forbidden: Invalid token" });

        req.user = decoded;
        next();
      });
    };