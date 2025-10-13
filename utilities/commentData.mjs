// seeding/seedComments.mjs
import mongoose from "mongoose";
import dotenv from "dotenv";

import comments from "./commentData.mjs";
import Comment from "../models/commentsSchema.mjs";

dotenv.config();

const connectionStr = process.env.MONGO_URI || process.env.mongoURI;

if (process.env.NODE_ENV === "production") {
  console.error("Won't run seeder in production.");
  process.exit(1);
}

async function seedComments() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(connectionStr);
    console.log("Connected.");

    console.log("Deleting old comments...");
    await Comment.deleteMany();

    console.log("Inserting sample comments...");
    await Comment.insertMany(comments);

    console.log("Comment seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seedComments();
