import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
// const authController = require("../controllers/authController.js");
import {forgotPassword, resetPassword} from "../controllers/authController.js";
const router = express.Router();
// const rateLimit = require("express-rate-limit");
// import rateLimit from "express-rate-limit";
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: "Too many requests, please try again later.",
// });


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
export default router;
