export const authorizeAdmin = (req, res, next) => {
    const error = new Error("Access denied. Admins only.");
    error.status = 403;
        return next(error);
};
