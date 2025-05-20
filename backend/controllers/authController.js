import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendPasswordChangedEmail } from "../emailSender.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.json({ message: "Error registering user", error });
  }
};

// @desc    Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token, userId: user._id, name: user.name });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const forgotPassword = async (req, res) => {
  try {
      const { email } = req.body;
      

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const passwordResetToken = crypto
          .createHash('sha256')
          .update(resetToken)
          .digest('hex');

      const passwordResetExpires = Date.now() + 3600000; 

      user.passwordResetToken = passwordResetToken;
      user.passwordResetExpires = passwordResetExpires;
      await user.save(); 
      console.log(process.env.FRONTEND_URL)
const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

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

      const token = req.params.token; 
      const { password, confirmPassword } = req.body;

      if (!password || !confirmPassword) {
          console.log("Missing fields detected:", { 
              hasPassword: !!password,
              hasConfirmPassword: !!confirmPassword
          });
          return res.status(400).json({ message: "All fields are required" });
      }

      const hashedToken = crypto.createHash('sha256')
          .update(token)
          .digest('hex');

      const user = await User.findOne({
          passwordResetToken: hashedToken,
          passwordResetExpires: { $gt: Date.now() }
      }).select('+passwordResetToken +passwordResetExpires');

      if (!user) {
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