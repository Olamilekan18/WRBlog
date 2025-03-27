import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Import your database connection function
import postRoutes from "./routes/postRoutes.js";
import userRoutes from './routes/userRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/comments', commentRoutes)



// Middleware
app.use(cors()); // Enables CORS for frontend-backend communication

// Routes



//changed this


// Basic Route to Check Server Status
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
