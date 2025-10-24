// seeding/seedUsers.mjs
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userSchema.mjs";

dotenv.config();

await mongoose.connect(process.env.MONGOURI);

console.log("Connected to DB");

// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash("admin123", salt);

const adminUser = new User({
  userName: "admin",
  email: "admin@example.com",
  password: hashedPassword,
  isAdmin: true,
});

await User.deleteMany({}); 
await adminUser.save();

console.log("Admin user seeded!");
process.exit();
