import express from "express";
import { createClass, getAllClasses } from "../controllers/classController.js";
import middlewareAuth from "../middlewares/auth.js";

const classRouter = express.Router();

classRouter.post("/create", middlewareAuth, createClass);
classRouter.get("/getAll", getAllClasses)

export default classRouter;