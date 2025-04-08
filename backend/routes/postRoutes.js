import express from "express";
import protect from "../middleware/authMiddleware.js"; // Import middleware
import { createPost, getPosts, updatePost, deletePost } from "../controllers/postController.js";
import Post from "../models/Post.js";
import { createComment, getComments, updateComment, getCommentById, deleteComment } from "../controllers/commentController.js";
import mongoose from "mongoose";
const router = express.Router();

// Post routes
router.get("/", getPosts); // Get all posts
router.post("/", protect, createPost); // Create a new post
router.get("/:postId", async (req, res) => { // Get a single post by ID
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/:postId", protect, updatePost); // Update a post
router.delete("/:postId", protect, async (req,res) =>
  // {const { id } = req.params;
  {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      // Authorization check
      if (post.author.toString() !== req.user.id) {
        return res.status(401).json({ message: "You are not authorized to delete this post" });
      }
  
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post", error });
    }});

    // routes/posts.js
router.get('/user/:userId', async (req, res) => {
  try {
    // Validate the userId parameter
    if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
console.log(req.params)
    // Find posts by author ID and populate author details
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'name email') // Include author name and email
      .sort({ createdAt: -1 }); // Sort by newest first

    res.json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
});
    
    // Delete a post

// Comment routes
router.get("/:postId/comments", getComments); // Get all comments for a post
router.post("/:postId/comments", protect, createComment); // Add a new comment to a post
router.get("/:postId/comments/:commentId", getCommentById); // Get a single comment by ID
router.put("/:postId/comments/:commentId", protect, updateComment); // Update a comment on a post
router.delete("/:postId/comments/:commentId", protect, deleteComment); // Delete a comment from a post

export default router;