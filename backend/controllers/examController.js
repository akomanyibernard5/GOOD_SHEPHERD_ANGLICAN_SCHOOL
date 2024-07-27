import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Exam } from '../models/examSchema.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

export const addExam = async (req, res) => {
  try {
    const { date, subject, grade, instruction } = req.body;
    const syllabusFile = req.file ? req.file.path : '';

    if (!date || !subject || !grade || !syllabusFile) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newExam = new Exam({ date, subject, grade, syllabusFile, instruction });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error adding exam:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromExam = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (deletedExam.syllabus) {
      fs.unlink(path.join(__dirname, '..', deletedExam.syllabus), (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ message: error.message });
  }
};