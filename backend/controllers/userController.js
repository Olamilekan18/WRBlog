import User from "../models/userModel.js";

// import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public

export const getUserProfile = async (req, res) => {
    try{
        const id = req.params;
        const user = await User.findById(id).select("-password")
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user)
        
    }
    catch(error){
        res.status(500).json({message: "Error fetching user profile", error});
    }
}

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
