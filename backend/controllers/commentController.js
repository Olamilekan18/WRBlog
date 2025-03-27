import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import mongoose from 'mongoose';

// Create a new Comment
export const createComment = async (req, res) => {
    try {
        // Debugging: Log incoming request details
        console.log("Request params:", req.params);
        console.log("Request body:", req.body);
        console.log("Authenticated user ID:", req.user.id);

        const {  postId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        
        console.log("Validating postId:", postId); // Should now show the ID
        
        // Validate post ID format
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            console.log(`Invalid post ID received: ${postId}`);
            return res.status(400).json({ 
                success: false, 
                message: "Invalid post ID format",
                receivedId: postId // Echo back the received ID for debugging
            });
        }

        // Validate comment content
        if (!content || typeof content !== 'string' || content.trim().length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Comment content is required and cannot be empty" 
            });
        }

        // Verify post exists
        const postExists = await Post.findById(postId).select('_id');
        if (!postExists) {
            return res.status(404).json({ 
                success: false, 
                message: "Post not found",
                postId: postId
            });
        }

        // Create new comment
        const newComment = new Comment({
            content: content.trim(),
            user: userId,
            post: postId,
        });

        const savedComment = await newComment.save();
        const populatedComment = await Comment.populate(savedComment, {
            path: 'user',
            select: 'name email'
        });

        // Successful response
        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            comment: populatedComment
        });

    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while creating comment",
            error: process.env.NODE_ENV === 'development' ? {
                message: error.message,
                stack: error.stack
            } : undefined
        });
    }
};

// Get all comments for a post
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params; // Now using postId to match route parameter
        
        console.log("Received postId:", postId); // Debug log
        
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid post ID format" 
            });
        }

        const comments = await Comment.find({ post: postId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            comments
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get specific comment by ID
export const getCommentById = async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId) || 
            !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        const comment = await Comment.findOne({ 
            _id: commentId, 
            post: postId 
        }).populate("user", "name email");

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        res.status(200).json({ success: true, comment });

    } catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching comment",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user.id;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(postId) || 
            !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid ID format" 
            });
        }

        // Find comment that belongs to the specified post
        const comment = await Comment.findOne({ 
            _id: commentId, 
            post: postId 
        });

        if (!comment) {
            return res.status(404).json({ 
                success: false, 
                message: "Comment not found for this post" 
            });
        }

        // Check ownership (add admin check here if needed)
        if (comment.user.toString() !== userId) {
            return res.status(403).json({ 
                success: false, 
                message: "Unauthorized to delete this comment" 
            });
        }

        await comment.deleteOne();
        res.status(200).json({ 
            success: true, 
            message: "Comment deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting comment",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(postId) || 
            !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid ID format" 
            });
        }

        // Validate content
        if (!content || typeof content !== 'string' || content.trim().length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Comment content is required" 
            });
        }

        // Find comment that belongs to the specified post
        const comment = await Comment.findOne({ 
            _id: commentId, 
            post: postId 
        });

        if (!comment) {
            return res.status(404).json({ 
                success: false, 
                message: "Comment not found for this post" 
            });
        }

        // Check ownership
        if (comment.user.toString() !== userId) {
            return res.status(403).json({ 
                success: false, 
                message: "Unauthorized to update this comment" 
            });
        }

        // Update and save
        comment.content = content.trim();
        comment.updatedAt = Date.now();
        const updatedComment = await comment.save();
        
        // Populate user info
        const populatedComment = await Comment.populate(updatedComment, {
            path: 'user',
            select: 'name email'
        });

        res.status(200).json({ 
            success: true, 
            message: "Comment updated successfully",
            comment: populatedComment
        });

    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating comment",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};