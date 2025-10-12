import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from '../models/postSchema.mjs';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const posts = [
  {
    author: '652e2f3a4e7e6f5c12345678', // 👈 Use real User _id from your DB
    title: "It's October First Ya!!!",
    content: "Today is the first day of October! I have already started to unpack my decorations...",
    createdAt: new Date(),
  },
  {
    author: '652e2f3a4e7e6f5c12345678',
    title: "Heading out to see this new Halloween event in my city!",
    content: "We can come dressed up! I'm excited to wear my costume!",
    createdAt: new Date(),
  },
];

export default posts;


