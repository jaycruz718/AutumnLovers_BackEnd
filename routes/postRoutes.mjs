import express from "express";
//import { posts } from "../dataSource/posts.mjs";

const router = express.Router();

router
.get("/", (req, res) => {
    res.json(post);
});

router
.get("/", (req, res) => {
    const { userId, title } = req.query;
    
    let filteredPosts = posts;

    if (userId) {
        filteredPosts = filteredPosts.filter(
            (post) => post.userId === parseInt(userId)
        );
    }

    if (title) {
        const keyword = title.toLowerCase();
        filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(keyword)
    );
    }

    res.json(filteredPosts);
});

router
.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    res.json(post);
})


.post("/", (req, res) => {
  console.log("POST /api/posts called");
  console.log("Request body:", req.body);

  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }

  const { userId, title, body, } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newPost = {
    id: posts.length + 1,
    userId,
    title,
    body,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);
  console.log("New post added:", newPost);
  res.status(201).json(newPost);

}) 

.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(posts => posts.id === id);

    if (index === -1) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    const deletedPost = posts.splice(index, 1);
    res.json(deletedPost[0]);
});


export default router;