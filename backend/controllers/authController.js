import User from "../models/User.js";
import jwt from "jsonwebtoken";
// const crypto = require("crypto");
import crypto from "crypto";
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create user
    user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const forgotPassword = async (req, res) => {
  try {
      const { email } = req.body;
      
      // 1. Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // 2. Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const passwordResetToken = crypto
          .createHash('sha256')
          .update(resetToken)
          .digest('hex');

      // 3. Set token expiry (1 hour)
      const passwordResetExpires = Date.now() + 3600000; // 1 hour from now

      // 4. Save to database
      user.passwordResetToken = passwordResetToken;
      user.passwordResetExpires = passwordResetExpires;
      await user.save(); 
      // 5. Create reset URL
      const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

      // 6. Send email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
          }
      });

      const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_FROM,
          subject: 'Password Reset',
          text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending password reset email' });
  }
};

export const resetPassword = async (req, res) => {
  try {
      // Decode URI component in case token was encoded
      const token = decodeURIComponent(req.params.token);
      const { password, confirmPassword } = req.body;

      console.log("Reset Password Request:", { 
        token: token, 
        passwordLength: password?.length 
      });

      // Validation
      if (!password || !confirmPassword) {
          return res.status(400).json({ message: "All fields are required" });
      }

      if (password !== confirmPassword) {
          return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash token
      const hashedToken = crypto.createHash('sha256')
          .update(token)
          .digest('hex');

      // Find user with valid token
      const user = await User.findOne({
          passwordResetToken: hashedToken,
          passwordResetExpires: { $gt: Date.now() }
      }).select('+passwordResetToken +passwordResetExpires');

      if (!user) {
          // Check if token exists but expired
          const expiredUser = await User.findOne({
              passwordResetToken: hashedToken
          });
          
          return res.status(400).json({
              message: expiredUser 
                  ? "Token has expired. Please request a new reset link."
                  : "Invalid token. Please check your link."
          });
      }

      // Update password
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      // Optional: Send confirmation email
      sendPasswordChangedEmail(user.email);

      return res.status(200).json({ 
          message: "Password updated successfully",
          success: true
      });

  } catch (error) {
      console.error("Password Reset Error:", error);
      return res.status(500).json({ 
          message: "An error occurred while resetting password",
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
};