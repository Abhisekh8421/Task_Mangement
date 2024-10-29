import express from "express";
import cookieParser from "cookie-parser";
import { connectDb } from "./database/task_db.js";
import cors from "cors";
import UserRouter from "./routes/user_route.js";
import TaskRouter from "./routes/task_route.js";

const app = express();

connectDb();

// CORS middleware should be included before routes
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

// Test route
app.get("/", (req, res) => {
  res.send("working perfectly");
});

// Start server
app.listen(3000, () => {
  console.log("⚡ server is started at port : 3000");
});
