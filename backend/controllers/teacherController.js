import { Teacher } from "../models/teacherSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const handleValidationError = (res, message, statusCode) => {
    res.status(statusCode).json({ success: false, message });
};

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

const createTeacher = async (req, res, next) => {
    const { firstName, lastName, email, subject, password } = req.body;
    try {
        if (!validator.isEmail(email)) {
            return handleValidationError(res, "Please enter a valid email", 400);
        }
        if (password.length < 8) {
            return handleValidationError(res, "Please enter a strong password", 400);
        }

        const exists = await Teacher.findOne({ email });
        if (exists) {
            return handleValidationError(res, "Teacher already exists", 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newTeacher = new Teacher({
            firstName,
            lastName,
            email,
            subject,
            password: hashedPassword,
        });

        const savedTeacher = await newTeacher.save();
        const token = createToken(savedTeacher._id);
        res.status(201).json({ success: true, token });
    } catch (err) {
        next(err);
    }
};

const getAllTeachers = async (req, res, next) => {
    try {
        console.log('Fetching total teachers...');
        const count = await Teacher.countDocuments();
        res.status(200).json({
            success: true,
            totalTeachers: count,
        });
    } catch (err) {
        next(err);
    }
}


const teacherSignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return handleValidationError(res, "Please provide email and password", 400);
        }
        const existingTeacher = await Teacher.findOne({ email });

        if (!existingTeacher) {
            return handleValidationError(res, "Invalid email or password", 401);
        }
        const isMatch = await bcrypt.compare(password, existingTeacher.password);

        if (!isMatch) {
            return handleValidationError(res, "Invalid email or password", 401);
        }
        const token = createToken(existingTeacher._id);
        res.status(200).json({ success: true, token });
    } catch (err) {
        next(err);
    }
};

export { createTeacher, getAllTeachers, teacherSignIn };
