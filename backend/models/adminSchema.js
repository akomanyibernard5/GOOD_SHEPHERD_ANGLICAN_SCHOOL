import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true }
});

const adminModel = mongoose.modelNames().includes('Admin')
  ? mongoose.model('Admin')
  : mongoose.model('Admin', adminSchema);

export default adminModel;

