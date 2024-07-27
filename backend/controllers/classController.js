import { Class } from "../models/classSchema.js";

export const createClass = async (req, res, next) => {
  console.log(req.body);
  const { subject } = req.body;
  try {
    if (!subject) {
      handleValidationError("Please Fill Form!", 400);
    }
    await Class.create({ subject });
    res.status(200).json({
      success: true,
      message: "Class Created!",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllClasses = async (req, res, next) => {
  try {
    console.log('Fetching total Classes...');
    const count = await Class.countDocuments();
    res.status(200).json({
      success: true,
      totalClasses: count,
    });
  } catch (err) {
    next(err);
  }
}