import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: v => v !== null,
        message: "Like reference cannot be null"
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  viewers:[{
    type : String,
    required: true
  }],
  viewCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", postSchema);