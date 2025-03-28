import User from "../models/userModel.js";

// import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin (you might want to protect this route)

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
      const user = await User.findById(req.params.id); // Note: using req.params.id
      
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

  // controllers/userController.js
export const getCurrentUserProfile = async (req, res) => {
    try {
      // req.user is set by your protect middleware
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