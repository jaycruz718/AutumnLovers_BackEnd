import mongoose from "mongoose";
import dotenv from "dotenv";

const posts = [
  {
    userId: 1,
    title: "It's October First Ya!!!",
    body: "Today is the first day of October! I have already started to unpack my decorations so I can set them up outside and inside my house.",
    createdAt: new Date(),
  },
  {
    userId: 2,
    title: "Heading out to see this new Halloween event in my city!",
    body: "Heading out to this new Halloween event in my city! WE can come dressed up! I'm excited to wear my costume!",
    createdAt: new Date(),
  },
  {
    userId: 3,
    title: "10 Tips for Decorating Your House for Halloween",
    body: "Today I want to share 10 tips for Decorating without breaking your wallet.",
    createdAt: new Date(),
  },
  {
    userId: 4,
    title: "Excited for Halloween",
    body: "Got my pumpkin spice hot cocoa, my pumpkin donut, and heading out to party!!!!",
    createdAt: new Date(),
  },
];

export default posts;