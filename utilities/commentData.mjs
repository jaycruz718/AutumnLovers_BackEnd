import { text } from "express";

const commentsSchema = new mongoose.Schema({
  postId: { type: Number, required: true },
  user: { type: String, required: true},
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default [
  {
    postId: 1,
    user: "ButtMan",
    text: "First comment",
    createAt: "2025-10-30",
  },
  {
    postId: 2,
    user: "TimeHasNoLimit",
    text: "Second comment",
    createdAt: "2025-10-30",
  },
];
