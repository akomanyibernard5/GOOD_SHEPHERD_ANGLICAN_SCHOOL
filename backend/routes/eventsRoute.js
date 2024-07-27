import express from "express";
import { createEvents, getAllEvents, deleteEvent} from "../controllers/eventsController.js";
import middlewareAuth from "../middlewares/auth.js";

const eventRouter = express.Router();

eventRouter.post("/create",createEvents);
eventRouter.get("/getAll", getAllEvents);
eventRouter.delete("/delete/:id", deleteEvent);

export default eventRouter;
