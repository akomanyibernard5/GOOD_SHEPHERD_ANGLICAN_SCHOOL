import express from "express";
import { createBook, getAllBooks } from "../controllers/libraryController.js";
import middlewareAuth from "../middlewares/auth.js";

const libraryRouter = express.Router();

libraryRouter.post("/create", middlewareAuth, createBook);
libraryRouter.post("/", middlewareAuth, getAllBooks)

export default libraryRouter;