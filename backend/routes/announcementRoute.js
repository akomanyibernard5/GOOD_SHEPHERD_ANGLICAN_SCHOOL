import express from "express";
import { createAnnouncement, getAllAnnouncements } from "../controllers/announcementController.js";
import middlewareAuth from "../middlewares/auth.js";

const announcementRouter = express.Router();

announcementRouter.post("/create", createAnnouncement);
announcementRouter.get("/getAll", getAllAnnouncements)

export default announcementRouter;


