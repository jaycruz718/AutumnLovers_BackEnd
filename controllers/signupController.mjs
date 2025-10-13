import signUp from "../models/signupSchema.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();

// POST /api/signup
export const signupUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password, password2 } = req.body;

  // Password confirmation check
  if (password !== password2) {
    return res.status(400).json({ errors: [{ msg: "Passwords do not match" }] });
  }

  try {
    // Check if email already exists
    let existingUser = await signUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Create new user instance
    const user = new signUp({
      userName,
      email,
      password,
      password2,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.password2 = undefined; // You may omit saving password2

    await user.save();

    // JWT Payload
    const payload = {
      user: {
        id: user._id,
        isAdmin: user.isAdmin || false,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "6h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
