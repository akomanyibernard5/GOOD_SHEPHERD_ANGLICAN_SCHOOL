import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export const Events = mongoose.model('Events', eventsSchema);
