import Post from "../models/Post.js";

// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.id; 

    if (!title || !content ) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = new Post({
      title,
      content,
      tags,
      author: userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email").select("title content tags author createdAt updatedAt").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts, please connect to the internet", error });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Safely get the like count, defaulting to 0 if likes is undefined
    const likeCount = post.likes ? post.likes.length : 0;

    // Return the post with the count of likes
    const postWithLikeCount = {
      ...post.toObject(),
      likes: likeCount // Use the safe like count
    };

    res.status(200).json(postWithLikeCount);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ message: "Error fetching post", error });
  }
};

export const getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const posts = await Post.find({ author: userId }) // Find posts by author ID
      .populate("author", "name email") 
      .select("title content tags author createdAt updatedAt") // Select specific fields to return
      .sort({ createdAt: -1 }); // Sort by creation date
if(!posts){
  res.status(200).json({message: "No posts found"})
}
    res.status(200).json(posts); // Return the posts
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching posts", error }); // Handle errors
  }
}

 
export const updatePost = async (req, res) => {
    // const { id } = req.params;
    const { title, content } = req.body;
  
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (post.author.toString() !== req.user.id) {
        return res.status(401).json({ message: "You are not authorized to update this post" });
      }
      post.title = title || post.title;
      post.content = content || post.content;
      
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Error updating post", error });
    }
  };

  
  
//delete post
export const deletePost = async (req,res) =>
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
    }
     catch (error) {
      res.status(500).json({ message: "Error deleting post", error });
    }}

    export const likePost = async (req, res) => {
      const { postId } = req.params;
      const userId = req.user?.id; // Optional chaining in case req.user is undefined
    
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
      }
    
      try {
        const post = await Post.findById(postId);
    
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        if (!post.likes) {
          post.likes = [];
        }
    
        
        post.likes = post.likes.filter(id => id && id.toString); 
    
        // Check if the user already liked the post
        const alreadyLiked = post.likes.some(id => id.toString() === userId.toString());
    
        // Toggle like status
        if (alreadyLiked) {
          post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        } else {
          post.likes.push(userId);
        }
    
        await post.save();
    
        res.status(200).json({ 
          success: true,
          liked: !alreadyLiked,
          likes: post.likes.length 
        });
    
      } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Error liking post", error: error.message }); // Send only error.message for security
      }
    };
  export const getPostStats = async (req, res) => {
    try {
      const stats = await Post.aggregate([
        {
          $group: {
            _id: "$author", // Group by author ObjectId
            totalPosts: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users", // Name of the collection
            localField: "_id",
            foreignField: "__id",
            as: "authorDetails",
          },
        },
        {
          $unwind: {
            path: "$authorDetails",
            preserveNullAndEmptyArrays: true, // Prevent crashing if user not found
          },
        },
        {
          $project: {
            _id: 0,
            author: "$authorDetails.name",
            email: "$authorDetails.email",
            totalPosts: 1,
          },
        },
      ]);
  
      res.status(200).json(stats);
    } catch (error) {
      console.error("Post stats error:", error);
      res.status(500).json({ message: "Error fetching post stats", error });
    }
  };
  
  export const postView = async (req, res) => { 
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      // Get viewer IP or user ID
      const viewerId = req.user?._id || req.ip; // Use IP if not logged in
      
      // Add view if not already viewed
      if (!post.viewers.includes(viewerId)) {
        post.viewers.push(viewerId);
        post.viewCount = post.viewers.length;
        await post.save();
      }
  
      res.json({ 
        success: true, 
        viewCount: post.viewCount 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
      
    }
