import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from 'validator';
import { Student } from "../models/studentSchema.js";

const handleValidationError = (res, message, statusCode = 400) => {
    res.status(statusCode).json({ success: false, message });
};

const JWT_SECRET = process.env.JWT_SECRET;
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

export const createStudent = async (req, res, next) => {
    const { firstName, lastName, email, password, dateofbirth, grade } = req.body;
    const generateNumericID = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const studentID = generateNumericID();

    try {
        const exists = await Student.findOne({ email });
        if (exists) {
            return handleValidationError(res, "Student already exists");
        }
        if (!validator.isEmail(email)) {
            return handleValidationError(res, "Please enter a valid email");
        }
        if (password.length < 8) {
            return handleValidationError(res, "Please enter a strong password");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newStudent = new Student({
            firstName,
            lastName,
            email,
            grade,
            dateofbirth,
            studentID,
            password: hashedPassword,
        });

        const savedStudent = await newStudent.save();
        const token = createToken(savedStudent._id);
        res.status(201).json({ success: true, token });
    } catch (err) {
        next(err);
    }
};

export const studentSignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingStudent = await Student.findOne({ email });

        if (!existingStudent) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, existingStudent.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const token = createToken(existingStudent._id);
        res.json({ success: true, token });
    } catch (err) {
        next(err);
    }
};


export const getAllStudents = async (req, res, next) => {
    try {
        console.log('Fetching total Students...');
        const count = await Student.countDocuments();
        res.status(200).json({
            success: true,
            totalStudents: count,
        });
    } catch (err) {
        next(err);
    }
}