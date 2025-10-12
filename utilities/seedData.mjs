// Imports
import mongoose from "mongoose";
import dotenv from "dotenv";

import posts from "./postData.mjs";
import Post from "../models/postSchema.mjs";

dotenv.config();

const connectionStr = process.env.MONGO_URI || process.env.mongoURI || "";

if (process.env.NODE_ENV === "production") {
  console.error("Seeding script should not be run in production.");
  process.exit(1);
}

async function seedPosts() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(connectionStr);
    console.log("Connected.");

    console.log("Clearing existing posts...");
    await Post.deleteMany();

    console.log("Inserting new posts...");
    await Post.insertMany(posts);

    console.log("Post data seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to seed posts:", err.message);
    process.exit(1);
  }
}

seedPosts();
