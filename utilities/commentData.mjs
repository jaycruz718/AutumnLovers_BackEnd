import { text } from "express";

const commentsSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userName: {
      type: String,
      default: "Anonymous",
    },
    context: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

/* export default [
  {
    postId: 1,
    user: "ButtMan",
    text: "First comment",
    createdAt: "2025-10-30",
  },
  {
    postId: 2,
    user: "TimeHasNoLimit",
    text: "Second comment",
    createdAt: "2025-10-30",
  },
];*/

const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;
