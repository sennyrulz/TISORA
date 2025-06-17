import jwt from "jsonwebtoken";

// const backendURL = process.env.VITE_BACKEND_URL;

export const authenticateToken = (req, res, next) => {
  // First try to get token from cookie
  const token = req.cookies.token;

  if (!token) {
    // If no token in cookie, try Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
    }
    token = authHeader.split(" ")[1];
  }

  jwt.verify(token, process.env.SECRETKEY || 'my-secret-key-goes-here', (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });

    req.user = user;
    next();
  });
};
