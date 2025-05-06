import express from "express";
import protect from "../middleware/authMiddleware.js"; // Import middleware
import { createPost, getPosts, getPostsByUserId, getPostStats, updatePost, deletePost } from "../controllers/postController.js";
import Post from "../models/Post.js";
import { createComment, getComments, updateComment, getCommentById, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

// Post routes
router.get("/", getPosts); // Get all posts
router.post("/", protect, createPost); // Create a new post
router.get("/user/:userId", getPostsByUserId)
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
    
    // Delete a post

    router.get("/s", getPostStats)
// Comment routes
router.get("/:postId/comments", getComments); // Get all comments for a post
router.post("/:postId/comments", protect, createComment); // Add a new comment to a post
router.get("/:postId/comments/:commentId", getCommentById); // Get a single comment by ID
router.put("/:postId/comments/:commentId", protect, updateComment); // Update a comment on a post
router.delete("/:postId/comments/:commentId", protect, deleteComment); // Delete a comment from a post

export default router;