import express from "express";
import multer from 'multer';
import path from 'path';
import { addExam, getAllExams, removeFromExam } from "../controllers/examController.js";
import middlewareAuth from "../middlewares/auth.js";
const examRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

examRouter.post("/add", middlewareAuth, upload.single('syllabusFile'), addExam);
examRouter.post("/getAll", middlewareAuth, getAllExams);
examRouter.delete("/remove/:id", middlewareAuth, removeFromExam);

export default examRouter;
