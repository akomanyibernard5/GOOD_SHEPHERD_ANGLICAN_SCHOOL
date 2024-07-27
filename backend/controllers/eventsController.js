import { Events } from "../models/eventsSchema.js";

export const createEvents = async (req, res, next) => {
  console.log(req.body);
  const { eventName, date, description } = req.body;
  try {
    if (!eventName || !date || !description) {
      return res.status(400).json({ message: "Please fill the form!" });
    }
    const newEvent = await Events.create({ eventName, date, description });
    res.status(200).json({
      success: true,
      message: "Event is created!",
      event: newEvent,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Events.find();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Events.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' }); 
    }

    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: error.message });
  }
};

