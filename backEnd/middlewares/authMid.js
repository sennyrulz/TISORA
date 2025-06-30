import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization?.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
  }

  jwt.verify(token, process.env.SECRETKEY || 'my-secret-key-goes-here', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = {
      _id: user._id || user.id, // handles both _id and id
      admin: user.admin || false
    };
    
    next(); // ✅ Only called if token is valid
  });
};
