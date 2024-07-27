import express from "express";
import cors from "cors";
import path from 'path'; 
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from "./config/db.js";
import studentRouter from "./routes/studentroute.js";
import teacherRouter from "./routes/teacherRoute.js";
import assignmentRouter from "./routes/assignmentRoute.js";
import announcementRouter from "./routes/announcementRoute.js";
import classRouter from "./routes/classRoute.js";
import libraryRouter from "./routes/libraryRoute.js";
import eventsRouter from "./routes/eventsRoute.js";
import examRouter from "./routes/examRoute.js";
import attendanceRouter from "./routes/attendanceRoute.js";
import adminRouter from "./routes/adminRoute.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db();

app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/assignments", assignmentRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/class", classRouter);
app.use("/api/library", libraryRouter);
app.use("/api/events", eventsRouter);
app.use("/api/exam", examRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
