import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send('unauthorized');

        jwt.verify(token, process.env.SECRETKEY, (err, user) => {
            if (err) return res.status(403).send('forbidden');
            req.user = user;
            next();
        })
}