import express from "express";
import { markAttendance, getAllAttendance } from "../controllers/attendanceController.js";
import middlewareAuth from "../middlewares/auth.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/mark",middlewareAuth, markAttendance);
attendanceRouter.post("/", middlewareAuth, getAllAttendance)

export default attendanceRouter;