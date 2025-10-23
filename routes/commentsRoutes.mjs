import express from "express";
import Comment from "../models/commentsSchema.mjs";

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

// GET comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comment = await Comment.find({vpostId: req.params.id });
    res.json(comments);
  } catch (err) {
    res.status(404).json({ error: "Failed to fetch comments" });
  }
});

// POST a new comment
router.post("/", async (req, res) => {
  try {
    const { postId, user, text } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({
      postId,
      user, 
      text
    });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err){
    res.status(500).json({ error: "Failed to add comment" });
  }

    // const savedComment = await newComment.save();
    // res.status(201).json(savedComment);
  // } catch (err) {
    // next(err);
 // }
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