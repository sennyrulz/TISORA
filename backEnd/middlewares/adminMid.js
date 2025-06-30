import jwt from "jsonwebtoken";

export const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization?.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Please login to create product" });
  }

  jwt.verify(token, process.env.SECRETKEY || 'my-secret-key-goes-here', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    // Check if user is admin
    if (!user.admin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.user = { _id: user._id || user.id, admin: true };
    next(); // ✅ Only called if token is valid and user is admin
  });
};
