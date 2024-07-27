import adminModel from "../models/adminSchema.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

export const registerAdmin = async (req, res) => {
    const { firstName, lastName, password, email, dateOfBirth } = req.body;
    try {
        const exists = await adminModel.findOne({ email });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth,
        });

        const admin = await newAdmin.save();
        const token = createToken(admin._id);

        res.status(201).json({
            success: true,
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const adminSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(admin._id);
        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.error('Sign-in error:', error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


