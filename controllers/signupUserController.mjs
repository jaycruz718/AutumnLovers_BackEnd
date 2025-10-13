import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import signUp from "../models/signupSchema.mjs";

dotenv.config();

export const signupUser = async (req, res) => {
  // Check validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password, password2 } = req.body;

  // Check if passwords match
  if (password !== password2) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Passwords do not match" }] });
  }

  try {
    // Check if user already exists by email
    let existingUser = await signUp.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists" }] });
    }

    // Create new user instance
    const newUser = new signUp({
      userName,
      email,
      password,
      password2, // optional – usually you wouldn't store this
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    await newUser.save();

    // Create JWT payload
    const payload = {
      user: {
        id: newUser._id,
        isAdmin: newUser.isAdmin || false,
      },
    };

    // Sign and return token
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
    console.error("Signup error:", err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
