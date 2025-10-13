import express from "express";
import Post from "../models/postSchema.mjs";

const router = express.Router();

// GET /api/post?author=someId&title=foo
router.get("/", async (req, res, next) => {
  try {
    const { author, title } = req.query;

    let query = {};

    if (author) query.author = author;
    if (title) query.title = new RegExp(title, "i");

    const posts = await Post.find(query); 
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET /api/post/:id
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id); // ✅ fixed
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST /api/post
router.post("/", async (req, res, next) => {
  try {
    const { author, title, content, tags } = req.body;
    if (!author || !title || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPost = new Post({ author, title, content, tags }); // ✅ match schema
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/post/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id); // ✅ fixed
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

export default router;
