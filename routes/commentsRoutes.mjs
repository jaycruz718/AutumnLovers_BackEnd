import express from "express";
import Comment from "../models/commentSchema.mjs";
// import { comments } from "../dataSource/comments.mjs";

const router = express.Router();

// GET /api/comments
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// GET /api/comments/:id
router.get("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// POST /api/comments
router.post("/", async (req, res, next) => {
  try {
    const { userId, title, content } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({
      userId,
      title,
      content,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/comments/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

export default router;