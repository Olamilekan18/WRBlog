import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    // _id: id,
    // status : "published" | "draft",
    comments: [{ type: String, ref: "Comment" }],
    likes: { type: Number, ref: "User" },
    // dislikes: [{ type: ObjectId, ref: "User" }],
    tags: { type: String },
    views: { type: Number, default: 0 },
  },
  { timestamps: true } 
);

const Post = mongoose.model("Post", postSchema);
export default Post;
