import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    studentID: {
        type: Number,
        required: true,
        unique: true
    },
    grade: {
        type: Number,
        required: true
    },
});

export const Student = mongoose.model("Student", studentSchema);