import express from "express";
import { createTeacher, getAllTeachers, teacherSignIn } from "../controllers/teacherController.js";
import middlewareAuth from "../middlewares/auth.js";

const teacherRouter = express.Router();

teacherRouter.post("/signup", createTeacher);
teacherRouter.post("/signin", teacherSignIn);
teacherRouter.get("/getAll", getAllTeachers)

export default teacherRouter;