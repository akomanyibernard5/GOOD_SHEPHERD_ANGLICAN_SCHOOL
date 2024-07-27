import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
});


export const Class = mongoose.model('Classes', classSchema);




