import mongoose from "mongoose";
import dotenv from "dotenv";

import comments from "./commentData.mjs";
import Comment from "../models/commentsSchema.mjs";

dotenv.config();

// Check that a connection string exists
const connectionStr = process.env.MONGO_URI || process.env.mongoURI;

if (!connectionStr) {
  console.error("Missing MONGO_URI in .env file.");
  process.exit(1);
}

// Prevent running in production
if (process.env.NODE_ENV === "production") {
  console.error("Won't run seeder in production.");
  process.exit(1);
}

async function seedComments() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    console.log("Deleting old comments...");
    await Comment.deleteMany();

    console.log("Inserting sample comments...");
    const inserted = await Comment.insertMany(comments);
    console.log(`Inserted ${inserted.length} comments.`);

    console.log("Comment seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedComments();
