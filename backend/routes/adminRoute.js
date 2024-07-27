import express from "express";
import { registerAdmin, adminSignIn } from "../controllers/adminController.js";
import adminMiddleware from "../middlewares/admin.js";
import authMiddleware from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/register", authMiddleware, registerAdmin);
adminRouter.post("/signin", adminSignIn);

export default adminRouter;
