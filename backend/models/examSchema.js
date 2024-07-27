import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  syllabusFile: {
    type: String,
    required: true
  },
  instruction: {
    type: String,
    required: false
  }
});

export const Exam = mongoose.model('Exam', examSchema);
