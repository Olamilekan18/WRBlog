import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import Post from "../models/Post.js";


export const getAllUsers = async (req, res) => {
    try {
      // Find all users and exclude sensitive data like passwords
      const users = await User.find({}).select('-password -__v');
      
      res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };

// controllers/userController.js
export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.id); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ 
        message: "Error fetching user profile",
        error: error.message 
      });
    }
  };

export const getCurrentUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching user profile',
        error: error.message 
      });
    }
  };




// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.profilePicture = req.body.profilePicture || user.profilePicture;

        // Hash new password if provided
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();
        res.status(200).json({ 
            _id: updatedUser.id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            profilePicture: updatedUser.profilePicture 
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating user profile", error });
    }
};
//upload profile picture
// @desc    Upload profile picture
    // @route   PUT /api/users/profile/picture
    // @access  Private
export const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.profilePicture = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({ message: "Profile picture updated", profilePicture: user.profilePicture });
    } catch (error) {
        res.status(500).json({ message: "Server error updating profile picture", error });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
  
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { profilePicture: req.file.path },
        { new: true }
      ).select('-password');
  
      res.json({
        success: true,
        data: user,
        imagePath: req.file.path
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Profile picture update failed',
        error: error.message
      });
    }
  };

  export const getUserDashboard = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const posts = await Post.find({ author: userId }).lean(); // Add .lean() for better performance
  
      const totalPosts = posts.length;
      const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
      
      // NEW: Calculate unique viewers across all posts
      const uniqueViewers = new Set();
      posts.forEach(post => {
        post.viewers?.forEach(viewerId => uniqueViewers.add(viewerId.toString()));
      });
  
      const postStats = posts.map((post) => ({
        title: post.title,
        likes: post.likes?.length || 0,
        views: post.views || 0,
        // NEW: Add unique viewers per post
        uniqueViewers: post.viewers?.length || 0,
        createdAt: post.createdAt,
      }));
  
      res.status(200).json({
        totalPosts,
        totalLikes,
        totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
        // NEW: Add unique viewers count
        uniqueViewers: uniqueViewers.size,
        postStats,
      });
    } catch (error) {
      console.error("Error fetching user dashboard:", error);
      res.status(500).json({ message: "Error fetching user dashboard", error });
    }
  };

  export const postSavePost = async(req, res)=>{
    try {
      const postId = req.params.id;
      const user = await User.findById(req.user.id);
  
      if (!user.savedPosts.includes(postId)) {
        user.savedPosts.push(postId);
        await user.save();
      }
  
      res.status(200).json({ success: true, message: "Post saved" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const getSavedPosts = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('savedPosts');
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({sucess: true,  savedPosts: user.savedPosts });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };