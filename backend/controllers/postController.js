import Post from "../models/Post.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // From authMiddleware

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = new Post({
      title,
      content,
      author: userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      // Authorization check
      if (post.author.toString() !== req.user.id) {
        return res.status(401).json({ message: "You are not authorized to update this post" });
      }
  
      // Update post
      post.title = title || post.title;
      post.content = content || post.content;
      
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Error updating post", error });
    }
  };
  
//delete post
export const deletePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      // Authorization check
      if (post.author.toString() !== req.user.id) {
        return res.status(401).json({ message: "You are not authorized to delete this post" });
      }
  
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post", error });
    }
  };
  