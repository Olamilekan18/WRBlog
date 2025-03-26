import express from "express";
import protect from "../middleware/authMiddleware.js"; // Import middleware
import { createPost, getPosts, updatePost, deletePost } from "../controllers/postController.js";
import Post from "../models/Post.js";

const router = express.Router();

// Only authenticated users can create posts
router.get('/', getPosts);
router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.post("/", protect, createPost);

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
