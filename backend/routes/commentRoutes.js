import express from 'express'; 
import protect from '../middleware/authMiddleware.js';
import { createComment, getComments, deleteComment, getCommentById, updateComment } from '../controllers/commentController.js';

const router = express.Router({mergeParams: true});

// router.post("/:postId", protect, createComment);
// In your routes file
router.post('/posts/:postId/comments', protect,   createComment);
// router.get("/:postId", getComments);
router.get("/posts/:id/comments", getComments);

router.get("/posts/:postId/comments/:commentId", getCommentById);

// In your commentRoutes.js
router.delete('/posts/:postId/comments/:commentId', protect, deleteComment);
router.put('/posts/:postId/comments/:commentId', protect, updateComment);

export default router;
