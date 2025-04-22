import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js"; 
import Post from '../models/Post.js'; 
import { getUserProfile, updateUserProfile, getAllUsers, updateProfilePicture, uploadProfilePicture, getCurrentUserProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

dotenv.config();

const router = express.Router();

// User Registration (Signup)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ 
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token

     });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// User Login (Signin)

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ 
          id: user._id,
          name: user.name,
          email: user.email,
          token: token
         });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
        });

        //Get a single post by id
        router.get("/posts/:id", async (req, res) => {
            try {
              const post = await Post.findById(req.params.id);
          
              if (!post) {
                return res.status(404).json({ message: "Post not found" });
              }
          
              res.json(post);
            } catch (error) {
              res.status(500).json({ message: "Server error" });
            }
          });
          router.get('/', getAllUsers )
          
          router.get('/profile', protect, getCurrentUserProfile); 
          router.get('/:id', getUserProfile);
          router.put('/profile', protect, updateUserProfile);
          router.patch('/profile/upload', protect, upload.single("image"), updateProfilePicture);
          // router.post('/profile/upload', protect, upload.single("image"), updateProfilePicture)
export default router;