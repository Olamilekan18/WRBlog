import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; 
import postRoutes from "./routes/postRoutes.js";
import userRoutes from './routes/userRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import subscribeRoutes from './routes/subscribeRoutes.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config(); 
connectDB(); 


const app = express();
app.use(cors()); 
app.use(express.json());


app.use('/api/auth', authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/subscribe', subscribeRoutes)
app.use("/api", uploadRoutes);
// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));



app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
