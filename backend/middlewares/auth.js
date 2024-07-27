import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Error verifying token", error);
        const message = error.name === 'TokenExpiredError' ? "Token expired" : "Invalid token";
        
        res.status(401).json({ success: false, message });
    }
};

export default authMiddleware;
