import express from "express";
import { createAssignment, getAllAssignments } from "../controllers/assignmentController.js";
import middlewareAuth from "../middlewares/auth.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/create", middlewareAuth,createAssignment);
assignmentRouter.post("/", middlewareAuth, getAllAssignments)

export default assignmentRouter;