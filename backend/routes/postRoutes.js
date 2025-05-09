import express from "express";
import protect from "../middleware/authMiddleware.js"; // Import middleware
import { createPost, getPosts, getPostById, getPostsByUserId, getPostStats, updatePost, deletePost, likePost } from "../controllers/postController.js";
import { createComment, getComments, updateComment, getCommentById, deleteComment } from "../controllers/commentController.js";
const router = express.Router();

// Post routes
router.get("/", getPosts); // Get all posts
router.post("/", protect, createPost); // Create a new post
router.get("/user/:userId", getPostsByUserId)
router.put("/:postId", protect, updatePost); // Update a post
router.delete("/:postId", protect, deletePost); // Delete a post


//LIKE ROUTE
router.post("/:postId/like", protect, likePost); // Like a post

    router.get("/s", getPostStats)
    router.get("/:postId", getPostById); // Route to get a post by ID
// Comment routes
router.get("/:postId/comments", getComments); // Get all comments for a post
router.post("/:postId/comments", protect, createComment); // Add a new comment to a post
router.get("/:postId/comments/:commentId", getCommentById); // Get a single comment by ID
router.put("/:postId/comments/:commentId", protect, updateComment); // Update a comment on a post
router.delete("/:postId/comments/:commentId", protect, deleteComment); // Delete a comment from a post

export default router;