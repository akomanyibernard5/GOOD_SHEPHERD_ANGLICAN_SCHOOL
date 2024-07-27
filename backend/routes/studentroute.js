import express from "express";
import { createStudent, studentSignIn, getAllStudents } from "../controllers/studentController.js";
import middlewareAuth from "../middlewares/auth.js"

const studentRouter = express.Router();

studentRouter.post("/signup", createStudent);
studentRouter.post("/signin", studentSignIn);
studentRouter.get("/getAll", getAllStudents)

export default studentRouter;