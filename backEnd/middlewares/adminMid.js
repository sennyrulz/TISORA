import jwt from "jsonwebtoken";

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer") && authHeader.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Please login to create product" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY || 'my-secret-key-goes-here');

    if (!decoded.admin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.admin = { _id: decoded._id || decoded.id };
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
