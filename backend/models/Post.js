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
    // comments: [{ type: ObjectId, ref: "Comment" }],
    // likes: [{ type: ObjectId, ref: "User" }],
    // dislikes: [{ type: ObjectId, ref: "User" }],
    tags: [{ type: String }],
    // views: { type: Number, default: 0 },
  },
  { timestamps: true } // Auto-adds createdAt & updatedAt
);

const Post = mongoose.model("Post", postSchema);
export default Post;
