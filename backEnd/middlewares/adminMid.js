 import jwt from "jsonwebtoken";
  
  export const authenticateAdmin  = (req, res, next) => {

     if (!token) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: "Please login to create product" });
    }
    token = authHeader.split(" ")[1];
  }

   jwt.verify(token, process.env.SECRETKEY || 'my-secret-key-goes-here', (err, user) => {
     if (err) {
       return res.status(403).json({ message: "Forbidden: Invalid token" })
     }
 
    req.user = {_id: admin.id, admin: user.admin || false};
   })
     next();
 };