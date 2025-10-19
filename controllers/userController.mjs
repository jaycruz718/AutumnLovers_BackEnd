import User from "../models/userSchema.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { userName, email, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(400).json({ errors: [{ msg: "Passwords do not match" }] });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user._id,
        isAdmin: user.isAdmin || false,
      },
    };

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

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Get User Info Error:", err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      
    const payload = { user: { id: user._id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

export { registerUser, getUserInfo, loginUser };
