import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"; 
import postRoutes from './routes/postRoutes.js'

dotenv.config(); // Load environment variables
connectDB()

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("WRBlog API is running...");
});

app.use('/api/posts', postRoutes)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
