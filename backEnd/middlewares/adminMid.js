 import jwt from "jsonwebtoken";
 
export const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
      }
    
      const token = authHeader.split(" ")[1];
    
      jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });
    
         // Check if user has admin privileges (assuming token contains a role field)
        if (decoded.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded;
        next();
      });
    };