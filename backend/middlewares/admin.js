import jwt from 'jsonwebtoken';
import adminModel from "../models/adminSchema.js";

const adminMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const Admin = await adminModel.findById(decoded.id); 
        if (!Admin || !Admin.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.Admin = Admin;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default adminMiddleware;
