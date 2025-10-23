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
    const comment = await Comment.find({ postId: req.params.id });
    res.json(comment);
  } catch (err) {
    res.status(404).json({ error: "Failed to fetch comments" });
  }
});

// POST a new comment
router.post("/", async (req, res) => {
  try {
    const { postId, userName, context } = req.body;

    if (!postId || !userName || !context) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //const newComment = await CommentModel.create({ postId, context, userName });
    res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Servor Error' });
    }
});

    /*const newComment = new Comment({
      postId,
      userName,
      context,
      createdAt,
    });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err){
    res.status(500).json({ error: "Failed to add comment" });*/
  

    // const savedComment = await newComment.save();
    // res.status(201).json(savedComment);
  // } catch (err) {
    // next(err);
 // }


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