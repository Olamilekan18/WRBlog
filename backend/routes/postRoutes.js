import express from "express";
import protect from "../middleware/authMiddleware.js"; // Import middleware
import { createPost } from "../controllers/postController.js";

const router = express.Router();

// Only authenticated users can create posts
router.post("/", protect, createPost);

export default router;
